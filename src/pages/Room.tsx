import { useState } from 'react'
import { useParams } from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'

import '../styles/room.scss'

type RoomParams = {
  id: string
}

export function Room(){
  const params = useParams<RoomParams>()
  const roomID = params.id;

  const [newQuestion, setNewQuestion] = useState('')

  async function handleSendQuestion(){

  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={roomID} />
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 Perguntas</span>
        </div>

        <form>
          <textarea 
            placeholder="O que você quer perguntar?" 
            onChange={(event)=>setNewQuestion(event.target.value)}
            value={newQuestion}
          />
        </form>

        <div className="form-footer">
          <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
          <Button type="submit">Enviar pergunta</Button>
        </div>
      </main>

    </div>
  )
}