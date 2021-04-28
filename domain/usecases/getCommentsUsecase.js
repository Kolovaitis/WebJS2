class GetCommentsUsecase{

    constructor(commentsRepository) {
        this.commentsRepository = commentsRepository
    }

    async invoke(postId){
        return await this.commentsRepository.getComments(postId)
    }
}
module.exports = GetCommentsUsecase