import React, {useState, useEffect} from 'react'

function App() {
  return (
    <div>
     <List />
    </div>
  );
}


// The two functions below are how we use a GET function from the backend 
// to display them onto our FRONT END BOOM ------------------------------------------------
const List = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState([]);

  // makeAjax request to FETCH TODOS ===================
  const fetchTodos = async () => {
    //fetch request goes here:
    const res = await fetch('http://localhost:3001/todos');
    setTodos(await res.json()); // turn response into json
  };

  // makeAjax request to Add TODOS -- onclick ===================
  const addTodo = async () => {
    //fetch request goes here:
    const res = await fetch('http://localhost:3001/todos', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ desc: text, done: false})
    }
    );

    // currently, after we add a TODO, we must manuallly referesh our page to see the new Todos.
    // We'll insert the following lines in order to have a an aut-refers
    // assume the todo is successfully added a(and dont do any errro hadnling)
    fetchTodos(); // this wil fetch them and reflect them ont othe scren
    setText('');
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const items = todos.map(todo => <Item todo={todo} key={todo._id} fetchTodos={fetchTodos}/> )

  return <div className="ui card">
  <div className="content">
    <div className="header">todo list fast</div>
  </div>
  <div className="content">

    <div className="ui relaxed divided list">
      {items}
    </div>
  </div>
  <div className="extra content">
    <div className="fluid ui action input">
      <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
      <button className="ui teal right labeled icon button" onClick={addTodo}>
        <i className="plus icon"></i>
        add
      </button>
    </div>
  </div>
</div>



};

const Item = (props) => {
  const {done , desc, _id} = props.todo;
  const deleteTodo = async () => {
    await fetch(`http://localhost:3001/todos/${_id}`, {
      method:'DELETE'
    }
    );
    props.fetchTodos();
  }

  const toggleDone = async () => {
    await fetch(`http://localhost:3001/todos/${_id}`, {
      method:'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ done: !done, desc})
    });

    props.fetchTodos();
  };


  return <div className='item'>
    {
      done ? 
      <i className="left floated green check square outline icon" onClick={toggleDone}></i> : 
      <i className="left floated square outline icon" onClick={toggleDone}></i>
    }
    {desc}
    <i className="right floated red trash icon" onClick={deleteTodo}></i>

  </div>
}

//  ------------------------------------------------ ------------------------------------------------



export default App;
