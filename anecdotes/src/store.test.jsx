import React from 'react'
import { describe, beforeEach, it, vi, expect } from 'vitest'
import { renderHook, act, render, screen } from '@testing-library/react'

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
})