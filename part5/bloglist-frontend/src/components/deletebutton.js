const Deletebutton = ({ handleDeleteClick, username, blogUserName }) => {
  if (username === blogUserName) {
    return (
      <button onClick={handleDeleteClick}>Remove</button>
    )
  }
}

export default Deletebutton