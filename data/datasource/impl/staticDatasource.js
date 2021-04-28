const DatasourceBase = require("../datasourceBase")

class StaticDatasource extends DatasourceBase {
    constructor() {
        super()
        this._posts = [{
            name: "Start post",
            image: "https://www.goodfreephotos.com/albums/canada/alberta/banff-national-park/very-majestic-and-beautiful-landscape-with-mountains-in-banff-national-park-alberta-canada.jpg",
            description: "Test post description",
            id: 0
        }, {
            name: "Second post",
            image: "https://3.bp.blogspot.com/-kKDAa7h-PXM/V_HXNu7g1fI/AAAAAAAAC6Y/vBHLJJtlXm0_z1h-ESVX75Qi6D_Nt_YpQCLcB/s1600/beautiful-waterfalls-hd-wallpaper-free-for-desktop.jpg",
            description: "Test post description 2",
            id: 1
        }, {
            name: "French bulldogs",
            image: "https://i.pinimg.com/originals/a4/4e/4b/a44e4bce8b47be12ae51394055b67a87.jpg",
            description: "The French Bulldog (French: bouledogue or bouledogue français) is a breed of domestic dog, bred to be companion dogs. The breed is the result of a cross between Toy Bulldogs imported from England, and local ratters in Paris, France, in the 1800s. They are stocky, compact dogs with a friendly, mild-mannered temperament.",
            id: 2
        }]
        this._comments = [{postId: 0, text: "Very beautiful!", author: "Valentin Elf"},
            {postId: 2, text: "😍😍😍😍😍", author: "Dana Fluess"},
            {postId: 2, text: "Wow! nice)", author: "Kevin Parker"}
        ]
    }

    async getPosts() {
        let posts = []
        for (let i=0;i<this._posts.length;i++){
            posts.push(this._posts[i])
        }
        posts.reverse()
        return posts
    }

    getComments(postId) {
        let neededComments = []
        for (let i = 0; i < this._comments.length; i++) {
            let comment = this._comments[i]
            if (comment.postId == postId) {
                neededComments.push(comment)
            }
        }
        return neededComments.reverse()
    }

    addComment(text, author, postId) {
        this._comments.push({text: text, author: author, postId: postId})
    }

    addPost(name, description, image) {
        this._posts.push({name: name, description: description, image: image, id: this._posts.length})
    }
}

module.exports = StaticDatasource