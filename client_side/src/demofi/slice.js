import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { postReq } from "./utils";
import { demofiConfig } from "../config"

export const runModel = createAsyncThunk('runModel', async (payload) => {
  return postReq("/api/run", payload);
})

const demofiSlice = createSlice({
  name: "demofi",
  initialState: {
    data: demofiConfig.inputPlaceHolder,
    param: demofiConfig.defaultAction,
    resp: [],
    appState: "ready" 
  },
  reducers: {
    updateData: (state, action) => {
      state.data = action.payload;
    },
    updateParam: (state, action) => {
      state.param = action.payload;
    },
    updateResult: (state, action) => {
      state.resp[action.payload.resIdx].labels = state.resp[action.payload.resIdx].labels.map((label, idx) => {
        if(idx === parseInt(action.payload.labelIdx)) { return action.payload.label }
        else { return label}
      })
    },
    reset: (state) => {
      state.appState = 'ready';
      state.resp = [];
    }
  },
  extraReducers: {
    [runModel.pending]: (state, action) => {
      state.appState = 'loading'
    },
    [runModel.fulfilled]: (state, action) => {
      state.appState = 'succeeded'
      state.resp = action.payload.result
    },
    [runModel.rejected]: (state, action) => {
      state.appStatet = 'failed'
      state.error = action.error.message
    }
  }
});

export const selectData = state => state.demofi.data;
export const selectParam = state => state.demofi.param;
export const selectResults = state => state.demofi.resp;
export const selectAppState = state => state.demofi.appState;
export const {
  updateData,
  updateParam,
  updateResult,
  reset
} = demofiSlice.actions;
export const demofiReducer = demofiSlice.reducer;


