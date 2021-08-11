import './style.scss'

type RoomTitleProps={
  title:string
  questionCount:number
}

export function RoomTitle({title, questionCount}:RoomTitleProps){
  return (
    <div className="room-title">
      <h1>{title}</h1>
      
      <span>{questionCount > 0 && <span className="counter" role="status">{questionCount} pergunta(s)</span>}</span>
    </div>
  )

}