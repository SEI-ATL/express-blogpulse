let db = require('./models');

// db.article.findOne({
//   where: {
//     id: 1
//   }
// }).then(article => {
//   db.comment.findOrCreate({
//     where: {
//       name: 'Walter Mansilla',
//       content: `So excited for this to happen!`,
//       articleId: article.id
//     }
//   }).then(([comment, created]) => {
//     console.log(comment);
//     console.log(created);
//   });
// });

db.article.findOne({
  where: {
    id: 1
  }
}).then(article => {
  article.getComments().then(comments => {
    comments.forEach(comment => {
      console.log(`${comment.name} wrote, "${comment.content}"`);
    });
  });
});