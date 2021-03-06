import { useEffect, useState } from 'react'
import { database } from '../services/firebase'
import { useAuth } from './useAuth'

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string
      avatar: string
    }
    content: string
    isHighlighted: boolean
    isAnswered: boolean
    likes: Record<
      string,
      {
        authorId: string
      }
    >
  }
>

type QuestionType = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isHighlighted: boolean
  isAnswered: boolean
  likeCount: number
  likeId: string | undefined
}

type Room = {
  title: string
  questions: QuestionType[]
}

export function useRoom(roomID: string): Room {
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState<QuestionType[]>([])

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomID}`)

    // TODO:TODAS AS INFORMACOES DE PERGUNTAS ESTÃO SENDO RECARREGADAS, ALTERAR PARA OUTROS EVENTOS
    // ASSIM SERÁ MAIS PERFORMATICO
    roomRef.on('value', (room) => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              ([, val]) => val.authorId === user?.id
            )?.[0]
          }
        }
      )

      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)

      return () => {
        roomRef.off('value')
      }
    })
  }, [roomID, user?.id])

  return { questions, title }
}
