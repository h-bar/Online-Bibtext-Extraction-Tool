import React, { Fragment }from "react";
import { MDBBtn, MDBIcon} from "mdbreact";
import { useSelector, useDispatch } from "react-redux";
import { selectData, selectParam, runModel, reset, selectAppState } from "../slice";



export const Submit = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const para = useSelector(selectParam);
  const state = useSelector(selectAppState);
  const handleSubmit = () => {
    const temp = data.trim()
    if (temp.length >0){
      dispatch(reset());
        const payload = {
          data: {
            content: data
          },
          param: {
            action: para
          }
        }
        dispatch(runModel(payload))
    }
  }
  if (state === "loading"){
    return (
      <div className="row justify-content-center mb-4">
        <MDBBtn id="mddbbtn" gradient="peach" rounded="true" ><MDBIcon icon="cloud-upload-alt" /> processing ...</MDBBtn>
        {/* <button className="btn btn-lg btn-warning mb-5 mx-2" onClick={() => dispatch(reset())}>Reset</button> */}
      </div>
    );

  }
    return (
      <div className="row justify-content-center mb-4">
        <MDBBtn id="mddbbtn" gradient="aqua" rounded="true" onClick={handleSubmit}><MDBIcon icon="magic" className="mr-1" /> Get Tagging</MDBBtn>
        {/* <button className="btn btn-lg btn-warning mb-5 mx-2" onClick={() => dispatch(reset())}>Reset</button> */}
      </div>
    );
  
}
