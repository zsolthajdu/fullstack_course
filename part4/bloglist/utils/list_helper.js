let lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = blogs => {
  const reducer = ( sum, blog ) => {
    return sum + blog.likes
  }

  return blogs.reduce( reducer, 0)
}

const favoriteBlog = blogs => {
  if( blogs.length > 0 ) {
    let maxLikes = -1
    let maxIndex = 0
    const check = ( blog, index ) => {
      if( blog.likes > maxLikes ) {
        maxLikes = blog.likes
        maxIndex = index
      }
    }

    blogs.forEach( check )
    let x = {
      'title' : blogs[ maxIndex].title,
      'author': blogs[ maxIndex].author,
      'likes' : maxLikes
    }
    return x
  }
}

const mostBlogs = blogs => {

  if( blogs.length > 0 ) {
    let counts = lodash.countBy( blogs, function(b) { return b.author } )
    //console.log( counts )
    let people = Object.entries( counts )

    let sorted = lodash.sortBy( people, function( p ) { return p[1] } )
    //console.log( sorted )
    let n = sorted.length - 1

    return { author: sorted[n][0] , blogs: sorted[n][1] }
  }
  else
    return {}
}

const mostLikes = blogs => {

  if( blogs.length > 0 ) {
    let groups = lodash.groupBy( blogs, (b) => b.author )
    let people = Object.entries( groups )
    //console.log( people )

    let maxLikes = -1
    let maxIndex = 0
    const check = ( dude, index ) => {
      let sum = lodash.sumBy( dude[1] , (blog) => blog.likes )
      if( sum > maxLikes ) {
        maxLikes = sum
        maxIndex = index
      }
    }
    people.forEach( check )

    return { author: people[maxIndex][0] , likes: maxLikes }
  }
  else
    return {}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
