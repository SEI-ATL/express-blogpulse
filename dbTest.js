const db = require('./models');

//test model's functionality
// async function dbTest() {
//     const article = await db.article.findOne()
//     const comment = await db.comment.create({
//         name: 'Rock Lobster',
//         content: 'Protect the environment man!!',
//         articleId: article.id
//     })
//     console.log(comment);
// }

// dbTest()

async function test() {
    const article = await db.article.findOne({
        where: { id: 1 },
        include: [db.comment]
    })
    console.log(article.comments);
}
test();