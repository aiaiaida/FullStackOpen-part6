import { useAnecdotes, useAnecdotesActions } from "./store"

const App = () => {
  const anecdotes = useAnecdotes()
  const { vote } = useAnecdotesActions()

  const voteAnecdote = (id) => {
    vote(id)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form>
        <div>
          <input data-testid="new" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
