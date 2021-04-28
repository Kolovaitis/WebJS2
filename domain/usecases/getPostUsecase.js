class GetPostUsecase{

    constructor(postsRepository) {
        this.postsRepository = postsRepository
    }

    async invoke(postId){
        let post = await this.postsRepository.getPost(postId)
        if(post === undefined) {
            throw "not found"
        }
        return post
    }
}
module.exports = GetPostUsecase