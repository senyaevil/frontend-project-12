const Message = ({ data }) => {
  const { username, body } = data

  return (
    <div className="mb-2 text-break">
      <b>{username}</b>
      {': '}
      {body}
    </div>
  )
}

export default Message