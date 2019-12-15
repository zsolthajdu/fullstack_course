import React from 'react'

const Blog = ({ title,author,url }) => (
  <div>
    {author} : <b>{title}</b> , {url} 
  </div>
)

export default Blog