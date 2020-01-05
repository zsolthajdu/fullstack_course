import React, { useState } from 'react'

const Blog = ({ title,author,url,id }) => {
  const blogStyle = {
    paddingTop : 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const pagelink = 'blogs/' + id

  return (
    <div style={blogStyle}>

      <a href={pagelink}>{title}</a> by {author}

    </div>
  )

}

export default Blog