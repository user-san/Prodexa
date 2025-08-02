import { useState, useEffect } from "react";
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // we can't write this if condition in main body(it will works but-it will runs for every render So using useEffect)
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
  return (
    <>
      <h4 >
        Counter{" => "}
       <span className="counterText">{count}</span> 
      </h4>

      <br />
      <span>
        <button id="myButton" onClick={() => setCount(count + 1)}>
          Increase
        </button>
        <button id="myButton" onClick={() => setCount(count - 1)}>
          Decrease
        </button>
        <button id="myButton" onClick={() => handleIncrease3X()}>
          Increase3X
        </button>
        <button id="myButton" onClick={handleDecrease3X}>
          Decrease3X
        </button>
        <button id="myButton" onClick={() => setCount(0)}>
          Clear
        </button>
      </span>
    </>
  );
}

export default Counter;
