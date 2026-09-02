import { useAnecdotesActions } from '../store'
import { useNotificationActions } from '../store'

const AnecdoteForm = () => {

  const { add } = useAnecdotesActions()
  const { setNotification } = useNotificationActions()
  
  const createNew = async (e) => {
    e.preventDefault()
    const newAnecdote = e.target.input.value
    if (!newAnecdote) return
    await add(newAnecdote)
    e.target.reset()
    setNotification(`You created '${newAnecdote}'`)
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <div>
          <input name="input" data-testid="new" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm