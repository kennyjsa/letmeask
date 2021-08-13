import copyImg from '../../assets/images/copy.svg'

import './style.scss'

type RoomCodeProps = {
  code: string
}

export const RoomCode: React.FC<RoomCodeProps> = ({ code }) => {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code)
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="" />
      </div>
      <span>Sala {code}</span>
    </button>
  )
}
