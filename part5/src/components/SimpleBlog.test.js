import React from 'react'
import { render, fireEvent } from '@testing-library/react' // highlight-line
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'

test( 'renders content correctly', () => {
  const blog = {
    title: 'Slashdot',
    author: 'Anonymous Coward',
    likes: 1823
  }

  const component = render(
    <SimpleBlog blog = {blog} />
  )

  const elem1 = component.getByText(
    'Slashdot Anonymous Coward'
  )
  expect(elem1).toBeDefined()

  const elem2 = component.getByText(
    'blog has 1823 likes'
  )
  expect(elem2).toBeDefined()
})

test('Clicking like button calls event handler', async () => {
  const blog = {
    title: 'Slashdot',
    author: 'Anonymous Coward',
    likes: 1823
  }

  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog = {blog} onClick={mockHandler} />
  )

  const likeButton = component.getByText('like')
  fireEvent.click( likeButton )
  fireEvent.click( likeButton )

  expect( mockHandler.mock.calls.length).toBe(2)

})