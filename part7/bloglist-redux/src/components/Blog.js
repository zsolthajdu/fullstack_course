import React, { useState } from 'react'

const Blog = ({ title,author,url,likes,adder }) => {
  const blogStyle = {
    paddingTop : 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetails, setShowDetails] = useState( false )

  const showWhenVisible = { display: showDetails ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div onClick = {() => setShowDetails( !showDetails ) }>
        <b>{title}</b> by {author}
      </div>
      <div style={ showWhenVisible } >
        <div>
          {url}
        </div>
        <div>
        Likes: {likes} <button>Like</button>
        </div>
        <div>
        Added by {adder}
        </div>
      </div>
    </div>
  )

}

export default Blog