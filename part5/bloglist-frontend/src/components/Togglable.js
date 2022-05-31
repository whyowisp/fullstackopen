import { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  //'display' is a React inline style property (CSS equivalent)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  //Every time visible -state is changed, component is forced to re-render
  //props.children in this case contains <CreateBlogForm ... /> as child component
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable