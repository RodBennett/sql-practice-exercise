const express = require('express');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootmyroot',
    database: 'acme'
});

db.connect();

app.get('/users', (req, res) => {
    const sql = `SELECT
    users.first_name,
    users.last_name,
    posts.title,
    posts.publish_date
  FROM users
  INNER JOIN posts
  ON users.id = posts.user_id
  ORDER BY posts.title;`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

app.listen(5001, () => console.log('Server started'));

