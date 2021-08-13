import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { RoomTitle } from '.'

describe('RoomTitle Component', () => {
  test('Should render title prop when load', async () => {
    const title = 'Titulo'

    render(<RoomTitle title={title} questionCount={0} />)

    expect(screen.getByText(title)).toBeInTheDocument()
  })

  test('Should not render counter when questionCounter is 0', async () => {
    const title = 'Titulo'

    render(<RoomTitle title={title} questionCount={0} />)

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  test('Should render counter when questionCounter is more than 0', async () => {
    const title = 'Titulo'

    render(<RoomTitle title={title} questionCount={3} />)

    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})

//
//deve ocultar o contador quando o questionCount for menor ou igual a zero
//deve exibir o contador somente quando o questionCount for maior que zero
