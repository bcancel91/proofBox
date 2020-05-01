import React, { useReducer } from "react";
import ReceiptInput from "../Components/ReceiptInput";
import "./Home.css";
import axios from "axios";

const initialState = {
  category: "",
  total: "",
  subtotal: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CATEGORY_CHANGED":
      return {
        ...state,
        category: action.payload,
      };
    case "TOTAL_CHANGED":
      return {
        ...state,
        total: action.payload,
      };
    case "SUBTOTAL_CHANGED":
      return {
        ...state,
        subtotal: action.payload,
      };
    default:
      return state;
  }
};

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleSubmit(e) {
    e.preventDefault();
    axios.post("/api/create", state).then(function (res) {
      console.log(res);
    });
  }

  return (
    <div>
      <ReceiptInput />

      <div>
        <div>
          <form onSubmit={handleSubmit} className="receipt-form">
            <input
              onChange={(e) =>
                dispatch({ type: "CATEGORY_CHANGED", payload: e.target.value })
              }
              value={state.category}
              placeholder="category"
            ></input>
            <input
              onChange={(e) =>
                dispatch({ type: "TOTAL_CHANGED", payload: e.target.value })
              }
              value={state.total}
              placeholder="subtotal"
            ></input>
            <input
              onChange={(e) =>
                dispatch({ type: "SUBTOTAL_CHANGED", payload: e.target.value })
              }
              value={state.subtotal}
              placeholder="subtotal"
            ></input>

            <button type="submit">Submit</button>
          </form>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default Home;
