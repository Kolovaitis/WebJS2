const PostsRepository = require("../../domain/repository/postsRepository")

class PostsRepositoryImpl extends PostsRepository {

    constructor(datasource) {
        super();
        this.datasource = datasource
    }

    async getPosts() {
        return await this.datasource.posts
    }

    addPost(post) {
        this.datasource.addPost(post.name, post.description, post.image)
    }

    getPost(postId) {
        let posts = this.datasource.posts
        for (let i=0;i<posts.length;i++) {
            let post = posts[i]
            if (post.id == postId) {
                return post
            }
        }
    }
}
module.exports = PostsRepositoryImpl