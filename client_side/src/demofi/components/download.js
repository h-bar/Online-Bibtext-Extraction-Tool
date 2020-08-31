import React from "react";
import { useSelector } from "react-redux";
import { selectResults } from "../slice";
import { demofiDownloads } from "../../config";
import { MDBIcon} from "mdbreact";

const DownloadBtn = props => (
  <a href={"data:text/json;charset=utf-8," + props.downloadString} download={props.label + ".json"} className={props.className}>
    <MDBIcon icon="cloud-download-alt" /> {props.label}
  </a>
)

export const Download = props => {
  const results = useSelector(selectResults)
  let downloadBtns = []
  for (let d of demofiDownloads) {
    downloadBtns.push(<DownloadBtn key={d.label} label={d.label} className={d.className} downloadString={d.transform(results)}/>)
  }

  return (
    <div className="w-100 text-center">
      { downloadBtns }
    </div>
  )
}

