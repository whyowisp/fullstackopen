const Notification = ({ message, messageType }) => {
  //Styles source: https://codeconvey.com/error-message-css-style-example/
  const baseStyle = {
    border: '1px solid',
    margin: '10px auto',
    padding: '15px 10px 15px 50px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '10px center',
    maxWidth: '460px',
  }
  const errorStyle = {
    color: '#D8000C',
    backgroundColor: '#FFBABA',
    backgroundImage: 'url(\'https://i.imgur.com/GnyDvKN.png\')',
  }
  const okStyle = {
    color: '#4F8A10',
    backgroundColor: '#DFF2BF',
    backgroundImage: 'url(\'https://i.imgur.com/Q9BGTuy.png\')',
  }

  if (messageType === 'error')
    return <div style={{ ...baseStyle, ...errorStyle }}>{message}</div>
  else if (messageType === 'ok')
    return <div style={{ ...baseStyle, ...okStyle }}>{message}</div>
  else return null
}

export default Notification