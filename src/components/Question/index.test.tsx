import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { Question } from '.'

describe('Question component', () => {
  const content = 'Pergunta?'
  const author = { name: 'Nome do autor', avatar: 'avatar.png' }

  test('Should render content prop when load', async () => {
    render(<Question content={content} author={{ name: '', avatar: '' }} />)

    const questionContent = screen.getByText(content)
    expect(questionContent).toBeInTheDocument()
  })

  test('Should render author prop when load', async () => {
    render(<Question content="" author={author} />)

    const questionAuthorName = screen.getByText(author.name)
    const questionAuthorAvatar = screen.getByRole('img')

    expect(questionAuthorName).toBeInTheDocument()
    expect(questionAuthorAvatar).toBeInTheDocument()
    expect(questionAuthorAvatar?.getAttribute('src')).toBe(author.avatar)
  })

  //TODO: Should render with className answered when isAnswered=true
  //TODO: Should render with className highlighted when isHighlighted=true
})
