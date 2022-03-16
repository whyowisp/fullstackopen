import React from "react";
import Course from './Course';

//Part 2.5 Note! : My components are probably so interwined so i couldn´t just take
//                 one component out and move it to another module. This solution 
//                 was only one i got this working. 

const Courses = (props) => {
  const { courses } = props;
  return (
    <div>
      {courses.map((course) => (
        <Course course={course} />
      ))}
    </div>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <Courses courses={courses} />;
    </div>
  );
};

export default App;