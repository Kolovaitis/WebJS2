class DatasourceBase {
    get posts(){}

    getComments(postId){}

    addPost(name, description, image){}

    addComment(text, author, postId){}
}
module.exports = DatasourceBase