class AddPostUsecase {
    constructor(postsRepository) {
        this.postsRepository = postsRepository
    }

    invoke(post){
        this.postsRepository.addPost(post);
    }
}
module.exports = AddPostUsecase