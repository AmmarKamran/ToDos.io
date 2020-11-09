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
    {done: true, desc: 'write code', due: '01/01/2000', tag: 'Academics'},
    {done: true, desc: 'fix bugs', due: '01/01/2000', tag: 'Finance'},
    {done: false, desc: 'profit', due: '01/01/2000', tag: 'Home Chores'},
])

})
//
app.delete('/todos', async (req, res) => {
    console.log("deleteMany called")
    await db.collection('todos').deleteMany();
    res.json('deleted All')
})
//
app.get('/', (req, res) => {
    res.json('did this work!')
})


app.get('/todos', async (req, res) => {
    const todos = await db.collection('todos').find().toArray();
    res.json(todos)
})


app.post('/todos/standardTemplate', async (req, res) => {
    console.log("post standard called")
    await db.collection('todos').insertMany([
        {done: true, desc: 'Complete Application', due: '01/01/2000', tag: 'Academics'},
        {done: true, desc: 'Complete 2 Endpoints for Side Project', due: '01/01/2000', tag: 'Career'},
        {done: false, desc: 'Invest in Tech Stocks Via Sarwa / Wahed', due: '01/01/2000', tag: 'Finance'},
        {done: false, desc: 'Community Involvement Volunteering', due: '01/01/2000', tag: 'Community'},
        {done: false, desc: 'Laundry', due: '01/01/2000', tag: 'Home'},
        {done: false, desc: 'Electricity + Phone Bills', due: '01/01/2000', tag: 'Home'},
        {done: false, desc: 'Computer Science Exam Prep', due: '01/01/2000', tag: 'Academics'}
    ])
    res.json('posted standard template')
})

app.post('/todos', async (req, res) => {
    console.log("post1 called")
    await db.collection('todos').insertOne(req.body);
    res.json('posted')
})




app.delete('/todos/:id', async (req, res) => {
    await db.collection('todos').deleteOne({_id: ObjectID(req.params.id) });
    res.json('deleted')
})



app.put('/todos/:id', async (req, res) => {
    await db.collection('todos').replaceOne({_id: ObjectID(req.params.id)}, req.body);
    res.json('putted')
})

app.listen(3001, () => {
    console.log('work pls');
})
//