import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateData, updateParam, selectParam, selectData } from "../slice";
import { TextInput, OptionBtnInput } from "../utils";
import { demofiConfig } from "../../config"

export const UserInputs = () => {
  const data = useSelector(selectData);
  const param = useSelector(selectParam);
  const dispatch = useDispatch();

  return (
    <div>
      <div  className="mb-2 px-4">
        <TextInput
          onChange={value => dispatch(updateData(value))}
          placeholder={data}
        />
      </div>
      <div className="mb-2">
        <OptionBtnInput
          onSelect={value => dispatch(updateParam(value))}
          options={demofiConfig.actions}
          selected={param}
        />
      </div>
    </div>
  );
};
