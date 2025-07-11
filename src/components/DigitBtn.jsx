import { ACTIONS } from "./calculator";

const DigitBtn = ({ dispatch, digit }) => {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGITS, data: { digit } })}
    >
      {digit}
    </button>
  );
};

export default DigitBtn;
