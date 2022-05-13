const totalLikes = (blogs) => {
  const reducer = blogs.reduce((sumOfLikes, blog) => sumOfLikes + blog.likes, 0)
  return reducer
}

const dummy = (blogs) => {
  return 1
}

module.exports = {
  totalLikes,
  dummy
}