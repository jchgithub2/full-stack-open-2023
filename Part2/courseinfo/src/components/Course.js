import React from "react";

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Total = ({ parts }) => (
  <>
    <h2>
      Total of {parts.reduce((total, part) => total + part.exercises, 0)}{" "}
      exercises
    </h2>
  </>
);

const Header = ({ header }) => <h2>{header}</h2>;

const Courses = ({ courses }) => (
  <>
    <h1>Web development curriculum</h1>
    {courses.map((courses) => (
      <div key={courses.id}>
        <Header  header={courses.name} />
        <Content  parts={courses.parts} />
        <Total  parts={courses.parts} /> 
      </div> 
    ))}
  </>  
); 

export default Courses;
