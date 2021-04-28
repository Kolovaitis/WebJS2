const StaticDatasource = require("./data/datasource/impl/staticDatasource")
const DBDatasource = require("./data/datasource/impl/dbDatasource")
const PostsRepositoryImpl = require("./data/repository/postsRepositoryImpl")
const CommentsRepositoryImpl = require("./data/repository/commentsRepositoryImpl")
const AddPostUsecase = require("./domain/usecases/addPostUsecase")
const GetPostsUsecase = require("./domain/usecases/getPostsUsecase")
const GetPostUsecase = require("./domain/usecases/getPostUsecase")
const GetCommentsUsecase = require("./domain/usecases/getCommentsUsecase")
const AddCommentUsecase = require("./domain/usecases/addCommentUsecase")
const PORT = process.env.PORT || 5000

// can't find di
const datasource = new DBDatasource()
const postsRepository = new PostsRepositoryImpl(datasource)
const commentsRepository = new CommentsRepositoryImpl(datasource)
const addPostUsecase = new AddPostUsecase(postsRepository)
const getPostsUsecase = new GetPostsUsecase(postsRepository)
const getPostUsecase = new GetPostUsecase(postsRepository)
const getCommentsUsecase = new GetCommentsUsecase(commentsRepository)
const addCommentUsecase = new AddCommentUsecase(commentsRepository)
//

const express = require("express")

const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.use(express.static("static"))

app.get("/all", function (request, response) {
    console.log("all posts:")
    getPostsUsecase.invoke().then(function (result) {
        response.json(result)
        response.end()
    }).catch(function (e) {
        response.status(500).send("internal server error");
    })
})

app.post("/post", function (request, response) {
    let body = request.body
    let post = {name: body.name, description: body.description, image: body.image}
    if (post.description === undefined || post.name === undefined || post.image === undefined) {
        response.status(400).send("invalid parameters");
    }
    addPostUsecase.invoke(post).then(function () {
        response.end()
    }).catch(function (e) {
        response.status(500).send("internal server error");

    })


})

app.get("/post/:id", function (request, response) {
    getPostUsecase.invoke(request.params.id).then(function (result) {
        response.json(result)
        response.end()
    }).catch(function (e) {
        if (e === "not found") {
            response.status(404).send("not found")
        }
        response.status(500).send("internal server error")
    })
})
app.get("/post/comments/:id", function (request, response) {
    getCommentsUsecase.invoke(request.params.id).then(function (result) {
        response.json(result)
        response.end()
    }).catch(function (e) {
        response.status(500).send("internal server error")
    })
})

app.post("/post/:id", function (request, response) {
    let body = request.body
    let comment = {text: body.text, author: body.author, postId: request.params.id}
    if (comment.description === undefined || comment.name === undefined || comment.image === undefined) {
        response.status(400).send("invalid parameters");
    }
    addCommentUsecase.invoke(comment).then(function () {
        response.end()
    }).catch(function (e) {
        response.status(500).send("internal server error");
    })

})

app.listen(PORT)