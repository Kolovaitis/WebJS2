class GetCommentsUsecase{

    constructor(commentsRepository) {
        this.commentsRepository = commentsRepository
    }

    invoke(postId){
        let comments = this.commentsRepository.getComments(postId)
        return comments
    }
}
module.exports = GetCommentsUsecase