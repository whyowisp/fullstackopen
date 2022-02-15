import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVote] = useState(new Array(6).fill(0));
  const [mostVoted, setMostVoted] = useState({
    mostVotedAnecdote: "",
    votes: 0,
  });

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * 6));
    setAnecdoteByMostVotes();
  };

  const setAnecdoteByMostVotes = () => {
    let highestVote = 0;
    let voteIndex = 0;

    for (let i = 0; i < 6; i++) {
      if (votes[i] > highestVote) {
        highestVote = votes[i];
        voteIndex = i;
      }
    }

    setMostVoted({
      mostVotedAnecdote: anecdotes[voteIndex],
      votes: highestVote,
    });
    console.log(mostVoted);
  };

  const updateVotes = () => {
    const copyOfVotes = [...votes];
    copyOfVotes[selected] += 1;
    console.log(copyOfVotes);
    setVote(copyOfVotes);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <br></br>
      <button onClick={updateVotes}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {mostVoted.mostVotedAnecdote}
      <p>has {mostVoted.votes} votes</p>
    </div>
  );
};

export default App;
