import React, { useReducer, useState } from "react";
import Form from "./Form";
import "./form.css";
import { STRAND, RANGE, GE_DEFs, FORM_ACTIONS } from "./definitions";
import DrawTrace from "./drawTrace";
import Table from "../table";

const initForm = {
  leftEndPosition: 0,
  rightEndPosition: 0,
  strand: STRAND.both,
  covered: false,
  objectType: [...GE_DEFs],
  draw: false,
};

function reducer(state, action) {
  switch (action.type) {
    case FORM_ACTIONS.setLeftPosition:
      return (state = { ...state, leftEndPosition: action.value });
    case FORM_ACTIONS.setRightPosition:
      return (state = { ...state, rightEndPosition: action.value });
    case FORM_ACTIONS.setStrand:
      return (state = { ...state, strand: action.value });
    case FORM_ACTIONS.setCovered:
      return (state = { ...state, covered: action.value });
    case FORM_ACTIONS.setGeneticsElements:
      return (state = { ...state, objectType: action.value });
    case FORM_ACTIONS.draw:
      return (state = { ...state, draw: true });
    case FORM_ACTIONS.clean:
        return {
            leftEndPosition: 0,
            rightEndPosition: 0,
            strand: STRAND.both,
            covered: false,
            objectType: [...GE_DEFs],
            draw: false,
          };
    case FORM_ACTIONS.demo:
      let posL = 1;
      let posR = 0;
      while (!(posL < posR && posR - posL > 1000 && posR - posL < 15000)) {
        posL = Math.floor(Math.random() * RANGE.max);
        posR = Math.floor(Math.random() * RANGE.max);
      }
      return {
        leftEndPosition: posL,
        rightEndPosition: posR,
        strand: STRAND.both,
        covered: false,
        objectType: [...GE_DEFs],
        draw: true,
      };
    default:
      return state;
  }
}

export default function RDBdata({ dataForm }) {
  const [state, dispatch] = useReducer(reducer, initForm);
  
  console.log(state);
  return (
    <div>
      <Form state={state} dispatch={dispatch} initForm={initForm} />
      {state.draw && (
        <DrawTrace state={state}  />
      )}
      
    </div>
  );
}
