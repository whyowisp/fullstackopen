import React from "react";

const Header = (props) => {
    return <h1>{props.courseName}</h1>;
  };
  
  const Course = (props) => {
    return (
      <div>
        <Header courseName={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
      </div>
    );
  };
  
  const Content = (props) => {
    const { parts } = props;
    return (
      <div>
        {parts.map((part) => (
          <p key={part.id}>
            <Part name={part.name} exercises={part.exercises} />
          </p>
        ))}
      </div>
    );
  };
  
  const Part = ({ name, exercises }) => {
    return (
      <p>
        {name} {exercises}
      </p>
    );
  };
  
  const Total = (props) => {
    const { parts } = props;
    const allExercises = parts.map((part) => part.exercises);
  
    const initialValue = 0;
    const total = allExercises.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      initialValue
    );
  
    return <b>Total of {total} exercises</b>;
  };

export default Course;
