import React, { useReducer } from "react";
import DigitBtn from "./DigitBtn";
import OperationBtn from "./OperationBtn";

export const ACTIONS = {
  ADD_DIGITS: "add-digits",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  EVALUATE: "evaluate",
  DELETE_DIGITS: "delete-digits",
};

function reducer(state, { type, data }) {
  switch (type) {
    case ACTIONS.ADD_DIGITS:
      if (state.overwrite) {
        return {
          ...state,
          curOp: data.digit,
          overwrite: false,
        };
      }
      if (data.digit === "." && state.curOp === "") return {};
      if (data.digit === "0" && state.curOp === "0") return state;
      if (data.digit === "." && state.curOp?.includes(".")) return state;

      return {
        ...state,
        curOp: `${state.curOp || ""}${data.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.curOp == null && state.prevOp == null) {
        return state;
      }

      if (state.curOp == null) {
        return {
          ...state,
          operation: data.operation,
        };
      }

      if (state.prevOp == null) {
        return {
          ...state,
          operation: data.operation,
          prevOp: state.curOp,
          curOp: null,
        };
      }

      return {
        ...state,
        prevOp: evaluate(state),
        operation: data.operation,
        curOp: null,
      };
    case ACTIONS.EVALUATE:
      if (
        state.prevOp == null ||
        state.curOp == null ||
        state.operation == null
      )
        return state;
      return {
        ...state,
        overwrite: true,
        prevOp: null,
        operation: null,
        curOp: evaluate(state),
      };
    case ACTIONS.DELETE_DIGITS:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          curOp: null,
        };
      }
      if (state.curOp == null) {
        return state;
      }
      if (state.curOp.length === 1) {
        return { ...state, curOp: null };
      }
      return {
        ...state,
        curOp: state.curOp.slice(0, -1),
      };
    case ACTIONS.CLEAR:
      return {};
    default:
      return state;
  }
}
function evaluate({ curOp, prevOp, operation }) {
  // tham so truyen vao phai giong voi cac tham so trong state
  const prev = parseFloat(prevOp);
  const current = parseFloat(curOp);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      if (current === 0 || current === "0") {
        computation = "0";
        break;
      }
      computation = prev / current;
      break;
  }

  return computation.toString();
}
const Calculator = () => {
  const [{ curOp, prevOp, operation }, dispatch] = useReducer(reducer, {});
  return (
    <>
      <h1>Calculator</h1>
      <div className="calculator">
        <div className="output">
          <div className="previous_input">
            {prevOp} {operation}
          </div>
          <div className="current_input">{curOp}</div>
        </div>
        <button
          className="span2"
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        >
          AC
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGITS })}>
          DEL
        </button>
        <OperationBtn dispatch={dispatch} operation="/"></OperationBtn>
        <DigitBtn dispatch={dispatch} digit="1"></DigitBtn>
        <DigitBtn dispatch={dispatch} digit="2"></DigitBtn>
        <DigitBtn dispatch={dispatch} digit="3"></DigitBtn>
        <OperationBtn dispatch={dispatch} operation="*"></OperationBtn>
        <DigitBtn dispatch={dispatch} digit="4"></DigitBtn>
        <DigitBtn dispatch={dispatch} digit="5"></DigitBtn>
        <DigitBtn dispatch={dispatch} digit="6"></DigitBtn>
        <OperationBtn dispatch={dispatch} operation="+"></OperationBtn>
        <DigitBtn dispatch={dispatch} digit="7"></DigitBtn>
        <DigitBtn dispatch={dispatch} digit="8"></DigitBtn>
        <DigitBtn dispatch={dispatch} digit="9"></DigitBtn>
        <OperationBtn dispatch={dispatch} operation="-"></OperationBtn>
        <DigitBtn dispatch={dispatch} digit="."></DigitBtn>
        <DigitBtn dispatch={dispatch} digit="0"></DigitBtn>
        <button
          className="span2"
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        >
          =
        </button>
      </div>
    </>
  );
};

export default Calculator;
