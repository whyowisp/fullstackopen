const Deletebutton = ({ handleDeleteClick, username, blogUserName }) => {
  if (username === blogUserName) {
    return (
      <button onClick={handleDeleteClick}>Remove</button>
    )
  }
}

const Likebutton = ({ handleLikeClick }) => {
  return <button id='likeBlogButton' onClick={handleLikeClick}>Like</button>
}

export { Deletebutton, Likebutton }