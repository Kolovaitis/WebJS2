class GetPostsUsecase{

    constructor(postsRepository) {
        this.postsRepository = postsRepository
    }

    async invoke(){
        return await this.postsRepository.posts;
    }
}
module.exports = GetPostsUsecase