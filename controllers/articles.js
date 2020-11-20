let express = require("express");
let db = require("../models");
let router = express.Router();

// POST /articles - create a new post
router.post("/", (req, res) => {
  db.article
    .create({
      title: req.body.title,
      content: req.body.content,
      authorId: req.body.authorId,
    })
    .then((post) => {
      res.redirect("/");
    })
    .catch((error) => {
      res.status(400).render("main/404");
    });
});

// GET /articles/new - display form for creating new articles
router.get("/new", (req, res) => {
  db.author
    .findAll()
    .then((authors) => {
      res.render("articles/new", { authors: authors });
    })
    .catch((error) => {
      res.status(400).render("main/404");
    });
});

// GET /articles/:id - display a specific post and its author
router.get("/:id", (req, res) => {
  db.article
    .findOne({
      where: { id: req.params.id },
      include: [db.author, db.comment], // include = join
      // this will generate a property that is plural
    })
    .then((article) => {
      
      if (!article) throw Error();
      // console.log(article.author);
      // console.log(article.comments);
      res.render("articles/show", { article: article });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).render("main/404");
    });
});

/////////////// USING ASYNC/AWAIT///////////////////////
// // 1. AWAIT UNTIL SOMETHING COMPLETES
// // 2. ASYNC THE FUNCTION THAT SHOULD RUN
// router.get("/:id", async (req, res) => { // 2. ASYNC THIS TO WAIT UNTIL -1- is done
// // need to assign it to a var otherwise it disappears
// const article = await db.article.findOne({ // 1. AWAIT UNTIL THIS IS DONE
//   where: { id: req.params.id },
//   include: [db.author, db.comment]
// })

// if (!article) throw Error()
// res.render('articles/show', {article})
// }

/// can also wrap the function to be waited on seperately?














// POST /articles - create a new post
router.post("/comment", (req, res) => {
  db.comment
    .create({
      commentor: req.body.commentor,
      content: req.body.content,
      articleId: req.body.articleId,
    })
    .then((post) => {
      res.redirect(`/articles/${req.body.articleId}`);
    })
    .catch((error) => {
      res.status(400).render("main/404");
    });
});

module.exports = router;
