import React, { useState } from "react";

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}> {text} </button>
);

const Statistics = (props) => {
  return (
    <div>
    <h1>statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.bad + props.neutral + props.good}</p>
      <p>Average: {props.average}</p>
      <p>Positive: {props.positive}</p>
    </div>
  )
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allFeedbacks, setNewFeedback] = useState([]);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const updateValues = (value) => {
    if (value === 1) {
      setGood(good + 1)
    }
    if (value === 0) {
      setNeutral(neutral + 1)
    }
    if (value === -1) {
      setBad(bad + 1)
    }
    setNewFeedback(allFeedbacks.concat(value))

    //Count average & positive feedback
    let sum = 0;
    allFeedbacks.forEach(value => {
      sum += value      
    })
    setAverage(sum/allFeedbacks.length)
    setPositive(good/allFeedbacks.length * 100)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => updateValues(1)} text='Good' />
      <Button handleClick={() => updateValues(0)} text='Neutral' />
      <Button handleClick={() => updateValues(-1)} text='Bad' />
      <Statistics good={good} neutral={neutral} bad={bad} average={average} positive={positive} />

      {console.log(allFeedbacks)}
      {console.log(average)}
    </div>
  );
};

export default App;
