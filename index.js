let express = require('express')
let ejsLayouts = require('express-ejs-layouts')
let db = require('./models')
let moment = require('moment')
let rowdy = require('rowdy-logger')
let app = express()

rowdy.begin(app)

app.set('view engine', 'ejs')

app.use(require('morgan')('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(ejsLayouts)
app.use(express.static(__dirname + '/public/'))

// middleware that allows us to access the 'moment' library in every EJS view
app.use((req, res, next) => {
  res.locals.moment = moment
  next()
})

// GET / - display all articles and their authors
app.get('/', (req, res) => {
  db.article.findAll({
    include: [db.author]
  }).then((articles) => {
    res.render('main/index', { articles: articles })
  }).catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})

// app.get('/articles/:id', (req, res) => {
//   const id = req.params.id;
//   db.article.findOne({
//     where: { id: id },
//     include: [db.comment]
//   }).then(comment => {
//     // res.render(`articles/${id}`, {comment})
//     res.send(comment)
//   })
// })

// bring in authors and articles controllers
app.use('/authors', require('./controllers/authors'))
app.use('/articles', require('./controllers/articles'))

var server = app.listen(process.env.PORT || 3000, () => {
  rowdy.print()
})

module.exports = server
