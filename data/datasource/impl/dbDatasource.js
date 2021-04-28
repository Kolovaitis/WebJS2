const {Pool} = require('pg');
const DatasourceBase = require("../datasourceBase")

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

class DBDatasource extends DatasourceBase {

    async getPosts() {
        const client = await pool.connect()
        const result = await client.query('SELECT * FROM posts')
        console.log(result)
        return (result) ? result.rows : null
    }

    async getComments(postId) {
        const client = await pool.connect()
        const result = await client.query('SELECT * FROM comments')
        console.log(result)
        return (result) ? result.rows : null
    }

    async addComment(text, author, postId) {
        const client = await pool.connect()
        const result = await client.query('INSERT INTO comments (postId, text, author) VALUES (\'' + postId + '\', \'' + text + '\', \'' + author + '\')')
        console.log(result)
        return result
    }

    async addPost(name, description, image) {
        console.log("datasource")
        const client = await pool.connect()
        const query = 'INSERT INTO posts (name, description, image) VALUES (\'' + name + '\', \'' + description + '\', \'' + image + '\');'
        console.log(query)
        const result = await client.query(query)
        console.log(result)
        return result
    }
    async getPost(id) {
        const client = await pool.connect()
        const result = await client.query('SELECT * FROM posts where id = '+id)
        console.log(result)
        return (result) ? result.rows[0] : null
    }
    async getUser(email) {
        const client = await pool.connect()
        const result = await client.query('SELECT * FROM users where email = \''+email+'\'')
        console.log(result)
        return (result) ? result.rows[0] : null
    }
    async getUserById(id) {
        const client = await pool.connect()
        const result = await client.query('SELECT * FROM users where id = '+id+'')
        console.log(result)
        return (result) ? result.rows[0] : null
    }
    async addUser(email, password) {
        console.log("datasource")
        const client = await pool.connect()
        const query = 'INSERT INTO users (email, password) VALUES (\'' + email + '\', \'' + password + '\');'
        console.log(query)
        const result = await client.query(query)
        console.log(result)
        return result
    }
}

module.exports = DBDatasource