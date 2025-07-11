import { ACTIONS } from "./calculator";

const OperationBtn = ({ dispatch, operation }) => {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, data: { operation } })
      }
    >
      {operation}
    </button>
  );
};

export default OperationBtn;
