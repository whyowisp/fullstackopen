const Deletebutton = ({ handleDeleteClick, username, blogUserName }) => {
  if (username === blogUserName) {
    return (
      <button id="deleteButton" onClick={handleDeleteClick}>
        remove
      </button>
    )
  }
}

const Likebutton = ({ handleLikeClick }) => {
  return (
    <button id="likeBlogButton" onClick={handleLikeClick}>
      like
    </button>
  )
}

export { Deletebutton, Likebutton }
