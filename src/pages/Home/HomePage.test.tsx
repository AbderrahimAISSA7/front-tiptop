import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import HomePage from './HomePage'
import { AuthProvider } from '../../context/AuthContext'

describe('HomePage', () => {
  it('affiche les informations principales', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </AuthProvider>,
    )

    expect(screen.getByText(/Jeu-Concours/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: /Des lots à gagner/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Jouer/i })).toBeInTheDocument()
  })
})
