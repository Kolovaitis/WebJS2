const StaticDatasource = require("./data/datasource/impl/staticDatasource")
const PostsRepositoryImpl = require("./data/repository/postsRepositoryImpl")
const CommentsRepositoryImpl = require("./data/repository/commentsRepositoryImpl")
const AddPostUsecase = require("./domain/usecases/addPostUsecase")
const GetPostsUsecase = require("./domain/usecases/getPostsUsecase")
const GetPostUsecase = require("./domain/usecases/getPostUsecase")
const AddCommentUsecase = require("./domain/usecases/addCommentUsecase")

// can't find di
const datasource = new StaticDatasource()
const postsRepository = new PostsRepositoryImpl(datasource)
const commentsRepository = new CommentsRepositoryImpl(datasource)
const addPostUsecase = new AddPostUsecase(postsRepository)
const getPostsUsecase = new GetPostsUsecase(postsRepository)
const getPostUsecase = new GetPostUsecase(postsRepository, commentsRepository)
const addCommentUsecase = new AddCommentUsecase(commentsRepository)
//

const express = require("express")

const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static("static"))

app.get("/", function (request, response) {
    let posts = getPostsUsecase.invoke()
    response.render("main", {
        posts: posts,
    })
})

app.post("/", function (request, response) {
    let body = request.body
    addPostUsecase.invoke({name: body.name, description: body.description, image: body.image})
    response.redirect(request.url)
})

app.get("/post/:id", function (request, response) {
    response.render("post", {
        post: getPostUsecase.invoke(request.params.id),
    })
})

app.post("/post/:id", function (request, response) {
    let body = request.body
    addCommentUsecase.invoke({text: body.text, author: body.author, postId: request.params.id})
    response.redirect(request.url)
})

app.listen(3000)