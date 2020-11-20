const db = require('./models')

// Allows us to make a comment
async function dbTest() {
  const article = await db.article.findOne()
  const comment = await db.comment.create({
    name: 'Paul Allen',
    content: 'This is really neat! Thanks for posting.',
    articleId: article.id
  })
  console.log(comment)
}

dbTest()

// Allows us to associate comment with article, but this is error-driven development; should comment out the first code block after running it for the first time, them run this code block (don't run them at the same time)
async function test() {
    const article = await db.article.findOne({
      where: { id: 1 },
      include: [db.comment]
    })
    // by using eager loading, the article model should have a comments key
    console.log(article.comments)
  }
  test()