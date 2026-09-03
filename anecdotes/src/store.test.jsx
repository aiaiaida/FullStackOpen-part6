import React from 'react'
import { describe, beforeEach, it, vi, expect, afterEach } from 'vitest'
import { renderHook, act, render, screen, cleanup } from '@testing-library/react'

vi.mock('./service/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn()
  }
}))

import anecdotesService from './service/anecdotes'
import useAnecdoteStore, {useAnecdotes, useAnecdotesActions, useFilter } from './store'
import AnecdoteList from './components/AnecdoteList'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

afterEach(() => {
  cleanup()
})

describe('useAnecdotesActions', () => {
  it('initializes with backend anecdotes', async () => {
    const mockAnecdotes = [{ id: 1, content: 'A', votes: 0}]
    anecdotesService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdotesActions())
    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdotes)
  })

  it('receives anecdotes from the store sorted by votes', () => {
    const mockAnecdotes = [{ id: 1, content: 'A', votes: 0 }, { id: 2, content: 'B', votes: 1 }]
    useAnecdoteStore.setState({ anecdotes: mockAnecdotes })

    render(<AnecdoteList />)

    const list = screen.getByTestId('anecdote-list')

    expect(list.children[0].textContent).toContain('B')
    expect(list.children[1].textContent).toContain('A')
  })

  it('receives a properly filtered list of Anecdotes', () => {
    const mockAnecdotes = [{ id: 1, content: 'A', votes: 0 }, { id: 2, content: 'B', votes: 1 }]
    useAnecdoteStore.setState({ anecdotes: mockAnecdotes, filter: 'A' })

    render(<AnecdoteList />)

    const list = screen.getByTestId('anecdote-list')

    expect(list.children[0].textContent).toContain('A')
    expect(list.children).toHaveLength(1)
    expect(screen.queryByText('B')).toBeNull()
  })

  it('voting increases the number of vote', async () => {
    const mockAnecdote = { id: 1, content: 'A', votes: 0 }
    useAnecdoteStore.setState({ anecdotes: [mockAnecdote] })
    anecdotesService.update.mockResolvedValue({ ...mockAnecdote, votes: 1})

    const { result } = renderHook(() => useAnecdotesActions())

    await act(async () => {
      await result.current.vote(mockAnecdote.id)
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current[0].votes).toBe(1)
  })
})