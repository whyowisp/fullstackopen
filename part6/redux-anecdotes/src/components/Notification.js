import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  }

  if (props.message) return <div style={style}>{props.message}</div>
}

//This function contains store states that this particular component needs
const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
