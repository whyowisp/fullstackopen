import React from "react";

const Header = (props) => {
  return <h1>{props.courseName}</h1>;
};

const Course = (props) => {
  return (    
    <div>
      <Header courseName={props.course.name} />
      <Content parts={props.course.parts} />
    </div>
  );
};

const Content = (props) => {
  const { parts } = props 
  return (
    <div>
        {parts.map(part => <p key={part.id}><Part name={part.name} exercises={part.exercises}/></p>)}
    </div>
  );
};

const Part = ({name, exercises}) => {
  return (
    <p>{name} {exercises} </p>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>;
};

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      { 
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
};

export default App;
