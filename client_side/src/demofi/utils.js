import React, { useState } from "react";
import ReactModal from 'react-modal';


export const TextInput = props => (
  <div class="form-group">
    <textarea class="form-control" id="exampleFormControlTextarea4" rows="6" style={{fontSize:"15px"}}
      // className="col-12"
      value={props.placeholder}
      onChange={e => props.onChange(e.target.value)}
    ></textarea>
  </div>
);

export const OptionBtnInput = props => {
  const btns = props.options.map(option => {
    let btnCls = "btn-info";
    if (option === props.selected) {
      btnCls = "btn-secondary";
    }
    return (
      <button
        style={{ boxSizing: "content-box" }}
        className={"btn col-lg-2 col-sm-3 col-6 mx-1 my-1 " + btnCls}
        key={option}
        onClick={() => props.onSelect(option)}
      >
        {option}
      </button>
    );
  });
  return (
    <div
      style={{ maxHeight: "400px" }}
      className="row align-content-start overflow-auto"
    >
      {btns}
    </div>
  );
};

export const ClassificationDisplay = props => {
  const [selectedIdx, setSelectedIdx] = useState(null);

  if (props.result === null) return null
  let result = props.result
  let byLabel = {}
  console.log(result.tokens)
  console.log(result.labels)
  for (let i in result.tokens) {
    let t = result.tokens[i]
    let l = result.labels[i]
    if(l!=="O"){
      if (l[1]=="-"){
        l = l.slice(2)
      }
    }
    if (byLabel[l] === undefined) byLabel[l] = []
    if (l === 'author') 
    {
      if (i>0){
        let curr_l = result.labels[i]
        console.log("begin")
        console.log(i)
        console.log(curr_l)
        console.log(result.tokens[i])
        if (result.labels[i]==="B-author"){
          byLabel[l].push(<a key={i+'-'+t+'and'} className="text-dark" >{"and"} </a>)
        }
      }
    }
    byLabel[l].push(<a key={i+'-'+t} className="text-dark" onClick={() => setSelectedIdx(i)}>{t} </a>)
  }
  console.log(byLabel["author"])

  const ordered_label = ['abstract', 'address', 'advisor', 'annote', 'author', 'bookeditor', 'bookpages', 'booktitle', 'category', 'chapter', 'city', 'collaboration', 'comment', 'date', 'day', 'edition', 'editor', 'eprint', 'foreword', 'howpublished', 'institution', 'issue', 'journal', 'key', 'keyword', 'location', 'meeting', 'month', 'note', 'number', 'numpages', 'O', 'organization', 'pages', 'paper', 'price', 'primaryclass', 'private', 'publisher', 'school', 'series', 'size', 'title', 'translator', 'type', 'url', 'urldate', 'version', 'volume', 'year']
  let labelRows = []

  for (let i in ordered_label) {
    let l = ordered_label[i]
    if (l!=="O")
    {
      if (byLabel[l] !== undefined){
        labelRows.push(<div key={l}>{ l + ' = {' } {byLabel[l]} {'}'} </div>)
      }
    }
  }
  if (byLabel["O"] !== undefined){
    labelRows.push(<div key={"O"}>{ 'unlabeled = {' } {byLabel["O"]} {'}'} </div>)
  }


  return (
    <div className='col-sm-12 col-md-6 col-lg-3'>
      <div className='mb-3' style={{fontSize:"10pt"}}>
          {labelRows}
      </div>
      
      <ReactModal 
        isOpen={selectedIdx !== null} 
        style={{
          coverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)'
          },          
          content: {
            top: '200px',
            bottom: 'auto',
            border: '0px',
            backgroundColor: 'unset',
            outline: 'none',
          }}} 
        contentLabel={"Choose a label for" + result.labels[selectedIdx]}
        onRequestClose={() => setSelectedIdx(null)}
      >
        <OptionBtnInput options={props.labels} selected={result.labels[selectedIdx]} onSelect={(value) => { setSelectedIdx(null); props.onEdit(selectedIdx, value)}}></OptionBtnInput>
      </ReactModal>
    </div>
  )
};


// IP address of the server
const server_addr = "http://54.157.168.51:5000"
// "http://vinci8:5000"
// vinci8:5000
export async function postReq(endPoint, data) {
  let url = server_addr + endPoint
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return response.json()
}

export async function getReq(endPoint, data) {
  let url = server_addr + endPoint
  const response = await fetch(url)
  return response.json()
}
