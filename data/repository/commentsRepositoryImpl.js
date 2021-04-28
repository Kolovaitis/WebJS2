const CommentsRepository = require("../../domain/repository/commentsRepository")

class CommentsRepositoryImpl extends CommentsRepository {
    constructor(datasource) {
        super();
        this.datasource = datasource
    }

    async getComments(postId) {
        return await this.datasource.getComments(postId)
    }

    async addComment(comment) {
        await this.datasource.addComment(comment.text, comment.author, comment.postId)
    }
}
module.exports = CommentsRepositoryImpl