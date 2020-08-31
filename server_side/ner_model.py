# coding=utf-8
# Copyright 2018 The Google AI Language Team Authors and The HuggingFace Inc. team.
# Copyright (c) 2018, NVIDIA CORPORATION.  All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
""" Fine-tuning the library models for named entity recognition on CoNLL-2003 (Bert or Roberta). """
from __future__ import absolute_import, division, print_function

import json
from demofi.model import abstractModel


import argparse
import glob
import logging
import os
import random
from collections import OrderedDict

import numpy as np
import torch
from seqeval.metrics import precision_score, recall_score, f1_score
from tensorboardX import SummaryWriter
from torch.nn import CrossEntropyLoss
from torch.utils.data import DataLoader, RandomSampler, SequentialSampler, TensorDataset
from torch.utils.data.distributed import DistributedSampler
from tqdm import tqdm, trange
from utils_ner import convert_examples_to_features, get_labels

from transformers import RobertaConfig, RobertaForTokenClassification, RobertaTokenizer

from nltk.tokenize import word_tokenize


MODEL_CLASSES = {
    "roberta": (RobertaConfig, RobertaForTokenClassification, RobertaTokenizer),
}

############################## Helper class #############################

class InputExample(object):
    """A single training/test example for token classification."""

    def __init__(self, guid, words, labels):
        """Constructs a InputExample.

        Args:
            guid: Unique id for the example.
            words: list. The words of the sequence.
            labels: (Optional) list. The labels for each word of the sequence. This should be
            specified for train and dev examples, but not for test examples.
        """
        self.guid = guid
        self.words = words
        self.labels = labels

############################### Model Class ###########################


class my_model(abstractModel):
  def init_model(self):
    print("***** Loading the model *****")
    #param
    self.model_type = 'roberta'
    label_parh = 'model/labels.txt'
    model_name_or_path = 'model'
    self.per_gpu_eval_batch_size = 8
    self.max_seq_length=512
    self.local_rank=-1
    seed=42

    # Setup CUDA, GPU & distributed training
    if self.local_rank == -1:
        self.device = torch.device("cpu")
        self.n_gpu=0
    else:  # Initializes the distributed backend which will take care of sychronizing nodes/GPUs
        torch.cuda.set_device(self.local_rank)
        self.device = torch.device("cuda", self.local_rank)
        torch.distributed.init_process_group(backend="nccl")
        self.n_gpu = 1

    #set random seed
    self.set_seed(seed,self.n_gpu)

    # Prepare CONLL-2003 task
    self.labels = get_labels(label_parh)
    num_labels = len(self.labels)
    print("  The number of labels in this model is : %d", num_labels)
    # Use cross entropy ignore index as padding label id so that only real label ids contribute to the loss later
    
    config_class, model_class, tokenizer_class = MODEL_CLASSES[self.model_type]
    config = config_class.from_pretrained(model_name_or_path,
                                          num_labels=num_labels,
                                          cache_dir=None)
    self.tokenizer = tokenizer_class.from_pretrained(model_name_or_path,
                                                do_lower_case=True,
                                                cache_dir=None)
    self.model = model_class.from_pretrained(model_name_or_path,
                                        from_tf=bool(".ckpt" in model_name_or_path),
                                        config=config,
                                        cache_dir=None)
    self.pad_token_label_id = CrossEntropyLoss().ignore_index
    print("***** Building model *****")
    print("  This is a :%s NER model for citation strings", self.model_type)
    print("  Modle is load from : %s", model_name_or_path)
    self.model.to(self.device)
    print("  Finish preparing the model !")

  def run_model(self, data: {}, param: {}) -> {}:
    pad_token_label_id  = self.pad_token_label_id 
    #process the uploaded data
    cit_strings = data['content']
    cit_strings = cit_strings.strip().split('\n')
    output = ''
    for cit in cit_strings:
        cit = cit.strip()
        cit = word_tokenize(cit)
        output += '\n'.join(cit) + '\n\n'
    output = output.strip()
    #print(output)
    labeled_cit = ''
    example_id = 0
    f = output.split('\n')
    # f = []
    # for i in temp:
    #     if i == '':
    #         f+=['\n']
    #     else:
    #         f+=[i]
    #print(f)
    if self.local_rank in [-1, 0]:
        predictions = self.evaluate(f, self.model, self.tokenizer, self.labels, pad_token_label_id, mode="test")
        for line in f:
          if line.startswith("-DOCSTART-") or line == "" or line == "\n":
            if line == "":
                labeled_cit+="\n"
            labeled_cit+=line
            if not predictions[example_id]:
              example_id += 1
          elif predictions[example_id]:
            output_line = line.split()[0] + " " + predictions[example_id].pop(0) + "\n"
            labeled_cit+=output_line
          else:
            print("Maximum sequence length exceeded: No prediction for '%s'.", line.split()[0])
    #print(labeled_cit)
    result = self.web_json(labeled_cit)
    #print(result)
    return result

    # text = nltk.word_tokenize(data['content'])
    # tagged = nltk.pos_tag(text)
    # result = {
    #   'tokens': [],
    #   'labels': []
    # }
    # for t in tagged:
    #   result['tokens'].append(t[0])
    #   result['labels'].append(t[1])
    # return result

  def destroy_model(self):
    pass


  ################# Helper Functions ############################## 
  def set_seed(self,seed,n_gpu):
        random.seed(seed)
        np.random.seed(seed)
        torch.manual_seed(seed)
        if n_gpu > 0:
            torch.cuda.manual_seed_all(seed)

  def read_examples(self,cit_strings,mode):
      guid_index = 1
      examples = []
      words = []
      labels = []
      for line in cit_strings:
          if line.startswith("-DOCSTART-") or line == "" or line == "\n":
              if words:
                  examples.append(InputExample(guid="{}-{}".format(mode, guid_index),
                                                words=words,
                                                labels=labels))
                  guid_index += 1
                  words = []
                  labels = []
          else:
              splits = line.split(" ")
              words.append(splits[0])
              if len(splits) > 1:
                  labels.append(splits[-1].replace("\n", ""))
              else:
                  # Examples could have no label for mode = "test"
                  labels.append("O")
      if words:
          examples.append(InputExample(guid="%s-%d".format(mode, guid_index),
                                        words=words,
                                        labels=labels))
      return examples



  def load_and_cache_examples(self, cit_strings, tokenizer, labels, pad_token_label_id, mode):
      examples = self.read_examples(cit_strings,mode)
      features = convert_examples_to_features(examples, labels, self.max_seq_length, tokenizer,
                                              cls_token_at_end=bool(self.model_type in ["xlnet"]),
                                              # xlnet has a cls token at the end
                                              cls_token=tokenizer.cls_token,
                                              cls_token_segment_id=2 if self.model_type in ["xlnet"] else 0,
                                              sep_token=tokenizer.sep_token,
                                              sep_token_extra=bool(self.model_type in ["roberta"]),
                                              # roberta uses an extra separator b/w pairs of sentences, cf. github.com/pytorch/fairseq/commit/1684e166e3da03f5b600dbb7855cb98ddfcd0805
                                              pad_on_left=bool(self.model_type in ["xlnet"]),
                                              # pad on the left for xlnet
                                              pad_token=tokenizer.convert_tokens_to_ids([tokenizer.pad_token])[0],
                                              pad_token_segment_id=4 if self.model_type in ["xlnet"] else 0,
                                              pad_token_label_id=pad_token_label_id
                                              )
      # Convert to Tensors and build dataset
      all_input_ids = torch.tensor([f.input_ids for f in features], dtype=torch.long)
      all_input_mask = torch.tensor([f.input_mask for f in features], dtype=torch.long)
      all_segment_ids = torch.tensor([f.segment_ids for f in features], dtype=torch.long)
      all_label_ids = torch.tensor([f.label_ids for f in features], dtype=torch.long)
      print('#'*10,'Finish Preparing Dataset','#'*10)
      print('The shape of the input dataset: ',all_input_ids.shape)
      dataset = TensorDataset(all_input_ids, all_input_mask, all_segment_ids, all_label_ids)
      return dataset


  def evaluate(self, cit_strings, model, tokenizer, labels, pad_token_label_id, mode='test', prefix=""):
    eval_dataset = self.load_and_cache_examples(cit_strings, tokenizer, labels, pad_token_label_id, mode=mode)
    eval_batch_size = self.per_gpu_eval_batch_size * max(1, self.n_gpu)
    # Note that DistributedSampler samples randomly
    eval_sampler = SequentialSampler(eval_dataset) if self.local_rank == -1 else DistributedSampler(eval_dataset)
    eval_dataloader = DataLoader(eval_dataset, sampler=eval_sampler, batch_size=eval_batch_size)

    # multi-gpu evaluate
    if self.n_gpu > 1:
        model = torch.nn.DataParallel(model)

    # Eval!
    print("***** Running prediction %s *****", prefix)
    print("  Num examples = %d", len(eval_dataset))
    print("  Batch size = %d", eval_batch_size)
    eval_loss = 0.0
    nb_eval_steps = 0
    preds = None
    out_label_ids = None
    model.eval()
    for batch in tqdm(eval_dataloader, desc="Evaluating"):
        batch = tuple(t.to(self.device) for t in batch)

        with torch.no_grad():
            inputs = {"input_ids": batch[0],
                    "attention_mask": batch[1],
                    "labels": batch[3]}
            if self.model_type != "distilbert":
                inputs["token_type_ids"] = batch[2] if self.model_type in ["bert", "xlnet"] else None  # XLM and RoBERTa don"t use segment_ids
            outputs = model(**inputs)
            tmp_eval_loss, logits = outputs[:2]

            if self.n_gpu > 1:
                tmp_eval_loss = tmp_eval_loss.mean()  # mean() to average on multi-gpu parallel evaluating

            eval_loss += tmp_eval_loss.item()
        nb_eval_steps += 1
        if preds is None:
            preds = logits.detach().cpu().numpy()
            out_label_ids = inputs["labels"].detach().cpu().numpy()
        else:
            preds = np.append(preds, logits.detach().cpu().numpy(), axis=0)
            out_label_ids = np.append(out_label_ids, inputs["labels"].detach().cpu().numpy(), axis=0)

    # eval_loss = eval_loss / nb_eval_steps
    preds = np.argmax(preds, axis=2)

    label_map = {i: label for i, label in enumerate(labels)}

    out_label_list = [[] for _ in range(out_label_ids.shape[0])]
    preds_list = [[] for _ in range(out_label_ids.shape[0])]

    for i in range(out_label_ids.shape[0]):
        for j in range(out_label_ids.shape[1]):
            if out_label_ids[i, j] != pad_token_label_id:
                out_label_list[i].append(label_map[out_label_ids[i][j]])
                preds_list[i].append(label_map[preds[i][j]])

    # results = {
    #     "loss": eval_loss,
    #     "precision": precision_score(out_label_list, preds_list),
    #     "recall": recall_score(out_label_list, preds_list),
    #     "f1": f1_score(out_label_list, preds_list)
    # }

    # print("***** Eval results %s *****", prefix)
    # for key in sorted(results.keys()):
    #     print("  %s = %s", key, str(results[key]))

    return  preds_list

  def web_json(self, labeled_cit):
    labeled_cit = labeled_cit.split('\n\n')
    labeled_field_l = []
    for cit in labeled_cit:
      labeled_field = {
      'tokens': [],
      'labels': []
      }
      cit = cit.strip().split('\n')
      for line in cit:
        line = line.split(' ')
        if len(line)==2:
            item, label = line
            item = item.strip()
            label = label.strip()
            # if not label == 'O':
            #     labeled_field[item] = label[2:]
            if 'author' in label or label == 'O':
                labeled_field['tokens'].append(item)
                labeled_field['labels'].append(label)
            else:
                labeled_field['tokens'].append(item)
                labeled_field['labels'].append(label[2:])
      labeled_field_l.append(labeled_field)
    return labeled_field_l
