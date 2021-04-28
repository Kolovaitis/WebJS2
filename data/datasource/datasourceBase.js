class DatasourceBase {
    async getPosts(){}

    getComments(postId){}

    addPost(name, description, image){}

    addComment(text, author, postId){}
}
module.exports = DatasourceBase