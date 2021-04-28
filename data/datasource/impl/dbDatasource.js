const { Pool } = require('pg');
const DatasourceBase = require("../datasourceBase")

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

class DBDatasource extends DatasourceBase {

    async get posts() {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM posts');
        return  (result) ? result.rows : null
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

module.exports = DBDatasource