import React, { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text} </button>
);

const StatisticsLine = ({ text, value }) => {
  return (
    <div>
      {text} {value}
    </div>
  );
};

const Statistics = (props) => {
  console.log(props.allFeedbacks.length !== 0);

  if (props.allFeedbacks.length !== 0) {
    return (
      <div>
        <StatisticsLine text="good" value={props.good} />
        <StatisticsLine text="neutral" value={props.neutral} />
        <StatisticsLine text="bad" value={props.bad} />

        <StatisticsLine
          text="all"
          value={props.good + props.neutral + props.bad}
        />
        <StatisticsLine text="average" value={props.average} />
        <StatisticsLine text="positive" value={props.positive} />
      </div>
    );
  }
  return <div>No feedback given</div>;
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
      setGood(good + 1);
    }
    if (value === 0) {
      setNeutral(neutral + 1);
    }
    if (value === -1) {
      setBad(bad + 1);
    }
    setNewFeedback(allFeedbacks.concat(value));

    //Count average & positive feedback
    let sum = 0;
    allFeedbacks.forEach((value) => {
      sum += value;
    });
    setAverage(sum / allFeedbacks.length);
    setPositive((good / allFeedbacks.length) * 100);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => updateValues(1)} text="Good" />
      <Button handleClick={() => updateValues(0)} text="Neutral" />
      <Button handleClick={() => updateValues(-1)} text="Bad" />
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        average={average}
        positive={positive}
        allFeedbacks={allFeedbacks} //Don´t remove, this is sent for condition check
      />

      {console.log(allFeedbacks)}
      {console.log(average)}
    </div>
  );
};

export default App;
