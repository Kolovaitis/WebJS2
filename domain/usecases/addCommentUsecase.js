class AddCommentUsecase {
    constructor(commentsRepository) {
        this.commentsRepository = commentsRepository
    }

    async invoke(comment){
        await this.commentsRepository.addComment(comment)
    }
}
module.exports = AddCommentUsecase