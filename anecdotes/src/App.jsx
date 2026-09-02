import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Filter from "./components/Filter"
import { useEffect } from "react"
import { useAnecdotesActions } from "./store"
import Notification from './components/Notification'

const App = () => {
  const { initialize } = useAnecdotesActions()
  useEffect(() => {
    initialize()
  }, [initialize])
  return ( 
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
