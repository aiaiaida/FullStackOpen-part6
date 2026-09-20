import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAnecdotes, createAnecdote, updateAnecdote } from "../requests"
import useNotification from "./useNotification"

export const useAnecdotes = () => {
  const { setNotificationTimeout } = useNotification()
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: false
  })

  console.log(JSON.parse(JSON.stringify(result)))

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: () => {
    setNotificationTimeout('too short anecdote, must have length 5 or more')}
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
    vote: (anecdote) => {
      updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
      setNotificationTimeout(`anecdote '${anecdote.content}' voted`)
    }
  }
}