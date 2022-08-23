import { useState } from 'react'
import { Button } from '@mui/material'

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
        <Button
          variant="contained"
          id="openBlogFormButton"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant="outlined"
          size="small"
          id="closeBlogFormButton"
          onClick={toggleVisibility}
        >
          cancel
        </Button>
      </div>
    </div>
  )
}

export default Togglable
