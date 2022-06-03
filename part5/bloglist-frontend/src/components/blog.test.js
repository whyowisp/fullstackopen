import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  id: 'kljk45g36uk323rw432t',
  title: 'Tenavat-sarjakuva menestys',
  author: 'Jaska Jokunen',
  url: 'https://jokudomain/jokuhost/jokunenroute',
  likes: 34,
  user: { name: 'mikkis' },
}

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Blog blog={blog}
        loadBlogs={Function}
        setMessage={Function}
        setMessageType={Function}
        username={''}
      />
    ).container
  })

  test('renders only author and title of a blog', () => {
    const div = container.querySelector('#detailsHidden')

    expect(div).toHaveTextContent('Tenavat-sarjakuva menestys - Jaska Jokunen')
    expect(div).not.toHaveTextContent('https://jokudomain/jokuhost/jokunenrouteLikes: 34', { exact: false })
  })

  test('button click reveals blog url and number of likes', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Show')

    await user.click(button)

    const div = container.querySelector('#detailsVisible')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent('https://jokudomain/jokuhost/jokunenrouteLikes: 34', { exact: false })
  })
})