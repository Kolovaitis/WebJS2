class DatasourceBase {
    async get posts(){}

    async getComments(postId){}

    async addPost(name, description, image){}

    async addComment(text, author, postId){}
}
module.exports = DatasourceBase