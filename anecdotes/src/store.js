
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

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    vote: async (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const updated = await anecdotesService.update(id, { ...anecdote, votes: anecdote.votes + 1})
      set(state => ({ anecdotes:  state.anecdotes.map(a => a.id === id ? updated : a)})
    )},
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

const useNotificationStore = create((set) => ({
  notification: '',
  actions: {
    setNotification: (message) => {
      set({ notification: message })

      setTimeout(() => {
        set({ notification: '' })
      }, 5000);
    }
  }
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useAnecdotesActions = () => useAnecdoteStore((state) => state.actions)

export const useNotification = () => useNotificationStore((state) => state.notification)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)