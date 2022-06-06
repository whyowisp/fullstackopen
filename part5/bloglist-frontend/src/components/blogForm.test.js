import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('When creating new blog, form calls event handler with right details', async () => {
  const createNewBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createNewBlog={createNewBlog} />)

  const inputs = screen.getAllByRole('textbox')

  await user.type(inputs[0], 'Testaamisen riemuista' )
  await user.type(inputs[1], 'Teppo Testaaja' )
  await user.type(inputs[2], 'http://jokuhost/jokupath' )
  await user.click(screen.getByText('Create'))

  console.log(createNewBlog.mock.calls)

  expect(createNewBlog.mock.calls[0][0].title).toBe('Testaamisen riemuista')
  expect(createNewBlog.mock.calls[0][0].author).toBe('Teppo Testaaja')
  expect(createNewBlog.mock.calls[0][0].url).toBe('http://jokuhost/jokupath')
})

export default BlogForm
