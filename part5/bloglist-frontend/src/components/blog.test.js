import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders only author and title of a blog', async () => {
  const blog = {
    id: 'kljk45g36uk323rw432t',
    title: 'Tenavat-sarjakuva menestys',
    author: 'Jaska Jokunen',
    url: 'https://jokudomain/jokuhost/jokunenroute',
    likes: 34,
    user: { name: 'mikkis' }
  }

  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('#hidden')
  screen.debug(div)

  expect(div).toHaveTextContent('Tenavat-sarjakuva menestys - Jaska Jokunen')
})