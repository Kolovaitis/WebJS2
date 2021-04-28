class AddPostUsecase {
    constructor(postsRepository) {
        this.postsRepository = postsRepository
    }

    async invoke(post){
        console.log("add post usecase")
        await this.postsRepository.addPost(post);
    }
}
module.exports = AddPostUsecase