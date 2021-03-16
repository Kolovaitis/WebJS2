class GetPostUsecase{

    constructor(postsRepository, commentsRepository) {
        this.postsRepository = postsRepository
        this.commentsRepository = commentsRepository
    }

    invoke(postId){
        let post = this.postsRepository.getPost(postId)
        if(post === undefined) {
            throw "not found"
        }
        let comments = this.commentsRepository.getComments(postId)
        post.comments = comments
        return post
    }
}
module.exports = GetPostUsecase