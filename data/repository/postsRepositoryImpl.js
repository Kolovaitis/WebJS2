const PostsRepository = require("../../domain/repository/postsRepository")

class PostsRepositoryImpl extends PostsRepository {

    constructor(datasource) {
        super();
        this.datasource = datasource
    }

    async getPosts() {
        console.log("repository:")
        return await this.datasource.getPosts()
    }

    async addPost(post) {
       await this.datasource.addPost(post.name, post.description, post.image)
    }

    async getPost(postId) {
        return await this.datasource.getPost(postId)
    }
}
module.exports = PostsRepositoryImpl