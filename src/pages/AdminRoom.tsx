import { useHistory, useParams } from 'react-router-dom'

import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'

import { useRoom } from '../hooks/useRoom'

import { database } from '../services/firebase'


import logoImg from '../assets/images/logo.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'
import deleteImg from '../assets/images/delete.svg'
import '../styles/room.scss'

type RoomParams = {
  id: string
}

export function AdminRoom() {
  const history = useHistory()
  const params = useParams<RoomParams>()
  const roomID = params.id

  const { questions, title } = useRoom(roomID)

  async function handleEndRoom() {
    await database
      .ref(`rooms/${roomID}`)
      .update({
        endedAt: new Date()
      })

    history.push('/')
  }

  async function handleCheckQuestionAsAnswered(questionID: string, isAnswered: boolean) {
    await database
      .ref(`rooms/${roomID}/questions/${questionID}`)
      .update({
        isAnswered: !isAnswered
      })
  }

  async function handleHighlightQuestion(questionID: string, isHighlighted: boolean) {
    await database
      .ref(`rooms/${roomID}/questions/${questionID}`)
      .update({
        isHighlighted: !isHighlighted
      })
  }

  async function handleDeleteQuestion(questionID: string) {
    if (!window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      return
    }

    await database
      .ref(`rooms/${roomID}/questions/${questionID}`)
      .remove()
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomID} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar a sala</Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(question => (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >

              {!question.isAnswered &&
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(question.id, question.isAnswered)}>
                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleHighlightQuestion(question.id, question.isHighlighted)}>
                    <img src={answerImg} alt="Dar destaque à pergunta" />
                  </button>
                </>
              }

              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}>
                <img src={deleteImg} alt="Remover pergunta" />
              </button>

            </Question>
          ))}
        </div>

      </main>

    </div>
  )
}