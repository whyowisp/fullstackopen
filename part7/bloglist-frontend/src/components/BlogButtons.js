import Button from '@mui/material/Button'

const Deletebutton = ({ handleDeleteClick, username, blogUserName }) => {
  if (username === blogUserName) {
    return (
      <Button variant="contained" id="deleteButton" onClick={handleDeleteClick}>
        remove
      </Button>
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
