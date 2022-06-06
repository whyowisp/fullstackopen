const Deletebutton = ({ handleDeleteClick, username, blogUserName }) => {
  if (username === blogUserName) {
    return (
      <button onClick={handleDeleteClick}>Remove</button>
    )
  }
}

const Likebutton = ({ handleLikeClick }) => {
  return <button onClick={handleLikeClick}>Like</button>
}

export { Deletebutton, Likebutton }