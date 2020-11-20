const db = require('./models')

async function dbTest() {
  const article = await db.article.findOne()
  const comment = await db.comment.create({
    creator: 'Paul Allen',
    content: 'This is really neat! Thanks for posting.',
    articleId: article.id
  })
  console.log(comment)
}

dbTest()