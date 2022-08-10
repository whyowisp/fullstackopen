const { reduce } = require('lodash')
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

  const max = {
    author: Object.keys(blogCount)
      .reduce((pValue, cValue) => (blogCount[pValue] > blogCount[cValue]) ? pValue : cValue),
    blogs: Object.values(blogCount)
      .reduce((pValue, cValue) => (blogCount[pValue] > blogCount[cValue]) ? pValue : cValue)
  }
  return max
}
const mostLikes = (blogs) => {
  //Groups author objects as value for author name -key -> {[{'author name': [author object]}, ...]}
  const grouped = _.groupBy(blogs, 'author')

  //This takes entries as key-value pairs and returns array of objects constructed from these.
  // _.sumBy() sums all likes found under author name -key
  const mapped = Object.entries(grouped).map(([key, value]) => {
    const author = {
      author: key,
      likes: _.sumBy(value, 'likes')
    }
    return author
  })

  return _.maxBy(mapped, 'likes')
}
/*
const dummy = (blogs) => {
  return 1
}
*/

module.exports = {
  totalLikes,
  favoriteBlogs,
  mostBlogs,
  mostLikes
  //dummy
}