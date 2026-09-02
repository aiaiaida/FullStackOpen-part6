
import { create } from 'zustand'
import anecdotesService from './service/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = anecdote => ({
//   content: anecdote,
//   id: getId(),
//   votes: 0
// })

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    vote: (id) => set(
      state => ({ anecdotes: state.anecdotes.map(anecdote => anecdote.id === id ? {...anecdote, votes: anecdote.votes + 1} : anecdote ) })
    ),
    add: async (anecdote) => {
      const newAnecdote = await anecdotesService.createNew(anecdote)
      set(state => ({ anecdotes: state.anecdotes.concat(newAnecdote)})
    )},
    setFilter: (text) => set(() => ({ filter: text })
    ),
    initialize: async () => {
      const anecdotes = await anecdotesService.getAll()
      set(() => ({ anecdotes }))
    }
  },
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useAnecdotesActions = () => useAnecdoteStore((state) => state.actions)