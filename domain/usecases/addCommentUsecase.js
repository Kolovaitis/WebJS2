class AddCommentUsecase {
    constructor(commentsRepository) {
        this.commentsRepository = commentsRepository
    }

    invoke(comment){
        this.commentsRepository.addComment(comment)
    }
}
module.exports = AddCommentUsecase