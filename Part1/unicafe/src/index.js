import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisT = ({text, value}) =>
<tr> 
  <td>{text}</td>
  <td>{value}</td>
</tr>

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total
  const positive = `${(good / total) * 100} %`

  return total > 0 ? (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisT text='good' value={good}/>
          <StatisT text='neutral' value={neutral}/>
          <StatisT text='bad' value={bad}/>
          <StatisT text='All' value={total}/>
          <StatisT text='average' value={average}/>
          <StatisT text='positive' value={positive}/>
        </tbody>
      </table>
    </>
  ) : (
    <p>No feedback given</p>
  )

};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const count = (state, setEstate) => () => setEstate(state + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={count(good, setGood)} text="good!" />
          <Button onClick={count(neutral, setNeutral)} text="neutral" />
          <Button onClick={count(bad, setBad)} text="bad" />    
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
