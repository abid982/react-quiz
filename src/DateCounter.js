import { useReducer } from 'react';

function reducer(state, action) {
  console.log(state, action);
  // Whatever we return here should be the new state.
  // We have three actions
  // 1. Decrease
  // 2. Increase
  // 3. Set
  // return state + action;

  // if (action.type === 'inc') return state + action.payload;
  // if (action.type === 'dec') return state - action.payload;
  // if (action.type === 'inc') return state + 1;
  // if (action.type === 'dec') return state - 1;
  // if (action.type === 'setCount') return action.payload;
  // return { count: 0, step: 1 };

  // Now actually it's very common to use a switch statement inside of a reducer function.
  switch (action.type) {
    case 'dec':
      // return { count: state.count + 1, step: 1 };
      // return { ...state, count: state.count - 1 };
      return { ...state, count: state.count - state.step };
    case 'inc':
      // return { ...state, count: state.count + 1 };
      return { ...state, count: state.count + state.step };
    case 'setCount':
      return { ...state, count: action.payload };
    case 'setStep':
      return { ...state, step: action.payload };
    case 'reset':
      return { step: 1, count: 0 };
    default:
      throw new Error('Unknown action');
  }
}

function DateCounter() {
  // Replace these two use state hooks with use reducer hook.
  // The use reducer hook is basically a more advanced and more complex way of managing state instead of use state hook.
  // Now the use reduce hook works with a so called reducer function which is a pure function that always take in the previous state and the so called action as arguments and then return the next state.
  // So this hooks takes in not only the initial state but also the reducer function.
  const initialState = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;
  // const [count, dispatch] = useReducer(reducer, 0);
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  const dec = function () {
    // dispatch(-1);
    // dispatch({ type: 'dec', payload: 1 });
    dispatch({ type: 'dec' });
    // setCount((count) => count - 1);
    // setCount(count => count - step);
  };

  const inc = function () {
    // dispatch(1);
    // dispatch({ type: 'inc', payload: 1 });
    dispatch({ type: 'inc' });
    // setCount((count) => count + 1);
    // setCount(count => count + step);
  };

  const defineCount = function (e) {
    // dispatch(Number(e.target.value));
    // setCount(Number(e.target.value));
    dispatch({ type: 'setCount', payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    dispatch({ type: 'setStep', payload: Number(e.target.value) });
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);
    dispatch({ type: 'reset' });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
