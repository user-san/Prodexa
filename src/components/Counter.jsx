import { useState, useEffect, useReducer } from "react";
import "./Counter.css";
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < 0) {
      setCount(0);
    }
  }, [count]);

  function handleIncrease3X() {
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
  }

  function handleDecrease3X() {
    if (count > 0) {
      setCount((prevCount) => {
        return prevCount - 1;
      });
      setCount((prevCount) => prevCount - 1);
      setCount((prevCount) => prevCount - 1);
    }
  }
  let reducer = (state, action) => {
    switch (action.type) {
      case "increment":
        return { ...state, count2: state.count2 + 1 };
      case "decrement":
        if (state.count2 > 0) {
          return { ...state, count2: state.count2 - 1 };
        }
      case "reset":
        return { ...state, count2: 0 };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, { count2: 0 });

  return (
    <>
      <h4>
        Counter{" => "}
        <span className="counterText">{count}</span>
      </h4>

      <br />
      <div className="btnGroup">
        <button className="counterBtn" onClick={() => setCount(count + 1)}>
          Increase
        </button>
        <button className="counterBtn" onClick={() => setCount(count - 1)}>
          Decrease
        </button>
        <button className="counterBtn" onClick={() => handleIncrease3X()}>
          Increase3X
        </button>
        <button className="counterBtn" onClick={handleDecrease3X}>
          Decrease3X
        </button>
        <button className="counterBtn" onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
      <br />
      <br />

      <p>useReducer</p>
      <h4>
        Counter{" => "} {state.count2}
      </h4>
      <br />

      <div className="btnGroup">
        <button
          className="counterBtn"
          onClick={() => dispatch({ type: "increment" })}
        >
          Increase
        </button>
        <button
          className="counterBtn"
          onClick={() => dispatch({ type: "decrement" })}
        >
          Decrease
        </button>
        <button
          className="counterBtn"
          onClick={() => dispatch({ type: "reset" })}
        >
          Reset
        </button>
      </div>
    </>
  );
}

export default Counter;
