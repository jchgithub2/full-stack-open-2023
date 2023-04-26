
import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Anecdote = ({anecdote, votes}) => 
  <>
   {anecdote}
   <br/>
   has {votes} votes
  </>

const App = (props) => {
  const [selected, setSelected] = useState(props)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))


 const handle = () => setSelected(Math.floor(Math.random() * anecdotes.length))

 const Ram = () => {
    const Copy = [...votes]
    Copy[selected]++
    setVotes(Copy)
 }

const Show = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <br/>
      <button onClick={Ram}>Votes</button> <button onClick={handle}>Next Anecdotes</button>
      <h2>Anecdote with the most votes</h2>
      <Anecdote anecdote={anecdotes[Show]} votes={votes[Show]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)



export default App;
