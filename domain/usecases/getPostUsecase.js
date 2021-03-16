class GetPostUsecase{

    constructor(postsRepository) {
        this.postsRepository = postsRepository
    }

    invoke(postId){
        let post = this.postsRepository.getPost(postId)
        if(post === undefined) {
            throw "not found"
        }
        return post
    }
}
module.exports = GetPostUsecase