class GetPostsUsecase{

    constructor(postsRepository) {
        this.postsRepository = postsRepository
    }

    invoke(){
        return this.postsRepository.posts;
    }
}
module.exports = GetPostsUsecase