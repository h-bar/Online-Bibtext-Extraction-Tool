export const demofiConfig = {
  actions: [
  ],
  // defaultAction:
  inputPlaceHolder: "Thai, D., yang Xu, Z., Monath, N., Veytsman, B., and McCallum, A. (2020). Using bibtex to automatically gen-erate labeled data for citation field extraction. ArXiv,abs/2006.05563.\nDung Thai, Sree Harsha Ramesh, Shikhar Murty, Luke Vilnis, and Andrew McCallum. Embedded-state latent conditional random fields for sequence labeling. In Computational Natural Language Learning, 2018.",
  availableLabels: ['abstract', 'address', 'advisor', 'annote', 'B-author', 'I-author', 'bookeditor', 'bookpages', 'booktitle', 'category', 'chapter', 'city', 'collaboration', 'comment', 'date', 'day', 'edition', 'editor', 'eprint', 'foreword', 'howpublished', 'institution', 'issue', 'journal', 'key', 'keyword', 'location', 'meeting', 'month', 'note', 'number', 'numpages', 'O', 'organization', 'pages', 'paper', 'price', 'primaryclass', 'private', 'publisher', 'school', 'series', 'size', 'title', 'translator', 'type', 'url', 'urldate', 'version', 'volume', 'year'],
}


// Transform function returns the string that will be downloaded
export const demofiDownloads = [
  {
    className: "btn btn-outline-info mb-5 mx-2",
    label: "BIBTEX",
    transform: (data) => {
      var output = "";
      var i = 0;
      for (i = 0; i < data.length; i++) {
         var one_out = "@misc{key"+i.toString(10)+",\n";
         var label_token = {};
         var j; 
         for (j = 0; j < data[i]["labels"].length; j++) 
         {
           var one_label = data[i]["labels"][j]
           if (one_label.includes("author")){
             if ("author" in label_token){
              if (one_label[0] == "B"){
                label_token[one_label.slice(2)] += " and "+data[i]["tokens"][j];
               }else{
                label_token[one_label.slice(2)] += " "+data[i]["tokens"][j];
               }
             }else{
              label_token[one_label.slice(2)] = data[i]["tokens"][j];
             }
           }else{
            if (one_label in label_token){
              label_token[one_label] += " "+data[i]["tokens"][j];
            }else{
              label_token[one_label] = data[i]["tokens"][j];
            }

           }
        }
        var label;
        for (label in label_token) {
          if (label !== "O") {
            one_out += label + " = {"+label_token[label] + "}, \n";  
          }
        }
        one_out += "}";
        one_out += "\n\n"
      output += one_out;
      }
      return output
    } 
  },
  {
    className: "btn btn-outline-danger mb-5 mx-2",
    label: "RIS",
    transform: (data) => {
      var bib2ris = {"author": "AU",
                     "title": "TI",
                     "booktitle": "T1",
                     "year" : "PY",
                     "journal": "T2",
                     "volume": "VL"
                    }
      var output = "";
      var i = 0;
      for (i = 0; i < data.length; i++) {
         var one_out = "TY  - JOUR\n";
         var label_token = {};
         var j; 
         for (j = 0; j < data[i]["labels"].length; j++) 
         {
           var one_label = data[i]["labels"][j]
           if (one_label.includes("author")){
             if ("author" in label_token){
              if (one_label[0] == "B"){
                label_token[one_label.slice(2)] += " and "+data[i]["tokens"][j];
               }else{
                label_token[one_label.slice(2)] += " "+data[i]["tokens"][j];
               }
             }else{
              label_token[one_label.slice(2)] = data[i]["tokens"][j];
             }
           }else{
            if (one_label in label_token){
              label_token[one_label] += " "+data[i]["tokens"][j];
            }else{
              label_token[one_label] = data[i]["tokens"][j];
            }

           }
        }
        var label;
        for (label in label_token) {
          if (label !== "O") {
            if (label in bib2ris){
              one_out += bib2ris[label] + "  - "+label_token[label] + "\n";
            }else{
              one_out += label + "  - "+label_token[label] + "\n";
            }  
          }
        }
        one_out += "ER  - ";
        one_out += "\n\n"
      output += one_out;
      }
     return output
    } 
  },
  {
    className: "btn btn-outline-primary mb-5 mx-2",
    label: "JSON",
    transform: (data) => {
      return JSON.stringify(data)
    } 
  }
]