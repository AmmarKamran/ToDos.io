const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient

let db;

MongoClient.connect('mongodb://localhost:27017/todos', { useUnifiedTopology: true }, async function (err, client) {
  if (err) throw err;

db = client.db('todos');
await db.collection('todos').insertMany([
    {done: true, desc: 'write code'},
    {done: true, desc: 'fix bugs'},
    {done: false, desc: 'profit'},
])

})

app.get('/', (req, res) => {
    res.json('did this work!')
})


app.get('/todos', async (req, res) => {
    const todos = await db.collection('todos').find().toArray();
    res.json(todos)
})



app.listen(3001, () => {
    console.log('work pls');
})