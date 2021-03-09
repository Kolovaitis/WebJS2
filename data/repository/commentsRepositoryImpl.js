const CommentsRepository = require("../../domain/repository/commentsRepository")

class CommentsRepositoryImpl extends CommentsRepository {
    constructor(datasource) {
        super();
        this.datasource = datasource
    }

    getComments(postId) {
        return this.datasource.getComments(postId)
    }

    addComment(comment) {
        this.datasource.addComment(comment.text, comment.author, comment.postId)
    }
}
module.exports = CommentsRepositoryImpl