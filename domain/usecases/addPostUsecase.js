class AddPostUsecase {
    constructor(postsRepository) {
        this.postsRepository = postsRepository
    }

    async invoke(post){
        await this.postsRepository.addPost(post);
    }
}
module.exports = AddPostUsecase