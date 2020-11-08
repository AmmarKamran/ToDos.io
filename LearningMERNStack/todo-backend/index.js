const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); //  need this because in our post requst, the 'body' of the req is not pasred in to json automaitlcaly by express, becasue exprses is so lightweight
const app = express();

app.use(cors());
app.use(bodyParser.json()); // need this because in our post requst, the 'body' of the req is not pasred in to json automaitlcaly by express, becasue exprses is so lightweight

const {MongoClient, ObjectID } = require('mongodb')

let db;

MongoClient.connect('mongodb://localhost:27017/todos', { useUnifiedTopology: true }, async function (err, client) {
  if (err) throw err;

db = client.db('todos');
await db.collection('todos').deleteMany();
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


app.post('/todos', async (req, res) => {
    await db.collection('todos').insertOne(req.body);
    res.json('posted')
})



app.delete('/todos/:id', async (req, res) => {
    await db.collection('todos').deleteOne({_id: ObjectID(req.params.id) });
    res.json('deleted')
})


app.listen(3001, () => {
    console.log('work pls');
})