import './style.scss'

type EmptyBoxProps={
  message:string
}

export function EmptyBox({message}:EmptyBoxProps){
  return (<div id="empty-box">
    {message}
  </div>)

}