import { useSelector, useDispatch } from "react-redux"
import { resetMessage } from "../reducers/messageReducer"

const Notification = () => {
  const notification = useSelector((state) =>
    state.message ? `You voted "${state.message}"` : ""
  )
  const dispatch = useDispatch()
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  }

  const reset = () => {
    setTimeout(() => {
      dispatch(resetMessage())
    }, 5000)
  }

  reset()
  console.log("Notification re-rendered: " + notification)

  return <div style={style}>{notification}</div>
}
export default Notification
