class GetPostsUsecase{

    constructor(postsRepository) {
        this.postsRepository = postsRepository
    }

    async invoke(){
        console.log("invoke usecase")
        return await this.postsRepository.getPosts();
    }
}
module.exports = GetPostsUsecase