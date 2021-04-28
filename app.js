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
const secretKey = "mern-secret-key";
const { check, validationResult } = require("express-validator");
const authMiddleware = require("./middleware/auth.middleware");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const corsMiddleware = require('./middleware/cors.middleware')


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
app.use(corsMiddleware)
app.use(express.static("static"))

app.get("/all",authMiddleware, function (request, response) {
    console.log("all posts:")
    getPostsUsecase.invoke().then(function (result) {
        response.json(result)
        response.end()
    }).catch(function (e) {
        response.status(500).send("internal server error");
    })
})

app.post("/post",authMiddleware, function (request, response) {
    let body = request.body
    console.log(body)
    let post = {name: body.name, description: body.description, image: body.image}
    if (post.description === undefined || post.name === undefined || post.image === undefined) {
        response.status(400).send("invalid parameters");
    }else {
        addPostUsecase.invoke(post).then(function () {
            response.end()
        }).catch(function (e) {
            response.status(500).send("internal server error");

        })
    }

})

app.get("/post/:id",authMiddleware, function (request, response) {
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
app.get("/post/comments/:id",authMiddleware, function (request, response) {
    getCommentsUsecase.invoke(request.params.id).then(function (result) {
        response.json(result)
        response.end()
    }).catch(function (e) {
        response.status(500).send("internal server error")
    })
})

app.post("/post/:id", authMiddleware, function (request, response) {
    let body = request.body
    let comment = {text: body.text, author: request.user.email, postId: request.params.id}
    if (comment.description === undefined || comment.name === undefined || comment.image === undefined) {
        response.status(400).send("invalid parameters");
    }
    addCommentUsecase.invoke(comment).then(function () {
        response.end()
    }).catch(function (e) {
        response.status(500).send("internal server error");
    })

})
app.post(
    "/registration",
    [
        check("email", "Uncorrected email").isEmail(),
        check("password", "Incorrect password").isLength({ min: 1 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Bad request", errors });
            }

            const { email, password } = req.body;

            const candidate = await datasource.getUser(email);

            if (candidate) {
                return res
                    .status(400)
                    .json({ message: `User with email ${email} already exist` });
            }
            const hashPassword = await bcrypt.hash(password, 8);
            await datasource.addUser(email, hashPassword);
            return res.status(200).json({ message: "User was created" });
        } catch (e) {
            console.log(e);
            res.status(500).send("internal server error");
        }
    }
);

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await datasource.getUser( email );
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPassValid = bcrypt.compareSync(password, user.password);
        if (!isPassValid) {
            return res.status(404).json({ message: "Uncorrect password" });
        }
        const token = jwt.sign({ id: user.id }, secretKey, {
            expiresIn: "1h",
        });
        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
            },
        });
    } catch (e) {
        console.log(e);
        res.status(500).send("internal server error");
    }
});

app.get("/auth", authMiddleware, async (req, res) => {
    try {
        const user = await datasource.getUserById(req.user.id);

        const token = jwt.sign({ id: user.id }, secretKey, {
            expiresIn: "1h",
        });
        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
            },
        });
    } catch (e) {
        console.log(e);
        res.status(500).send("internal server error");
    }
});

app.listen(PORT)