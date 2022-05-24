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

/*
const dummy = (blogs) => {
  return 1
}
*/

module.exports = {
  totalLikes,
  favoriteBlogs
  //dummy
}