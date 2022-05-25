const _ = require('lodash')

const totalLikes = (blogs) => {
  const reducer = blogs.reduce((sumOfLikes, blog) => sumOfLikes + blog.likes, 0)
  return reducer
}
const favoriteBlogs = (blogs) => {
  const blogWithMaxLikes = blogs.reduce((previousBlog, currentBlog) => {
    if(previousBlog.likes > currentBlog.likes) {
      currentBlog = previousBlog
    }
    return currentBlog
  }, {})
  return blogWithMaxLikes
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(blog => blog.author)
  const blogCount = _.countBy(authors, Array.value)
  //Sorry
  const max = {
    author: Object.keys(blogCount).reduce((pValue, cValue) => (blogCount[pValue] > blogCount[cValue]) ? pValue : cValue),
    blogs: Object.values(blogCount).reduce((pValue, cValue) => (blogCount[pValue] > blogCount[cValue]) ? pValue : cValue)
  }
  return max
}
/*
const dummy = (blogs) => {
  return 1
}
*/

module.exports = {
  totalLikes,
  favoriteBlogs,
  mostBlogs
  //dummy
}