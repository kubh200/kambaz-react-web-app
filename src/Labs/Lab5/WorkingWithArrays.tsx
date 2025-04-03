import { useState } from "react";
import { FormControl, FormCheck } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export default function WorkingWithArrays() {
  const API = `${REMOTE_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState({
    id: "1",
    description: "",
    completed: false
  });
  return (
    <div id="wd-working-with-arrays">
        <h3>Working with Arrays</h3>
        <h4>Retrieving Arrays</h4>
        <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
            Get Todos </a><hr/>
        <h4>Retrieving an Item from an Array by ID</h4>
        <a id="wd-retrieve-todo-by-id" className="btn btn-primary float-end" href={`${API}/${todo.id}`}>
            Get Todo by ID
        </a>
        <FormControl id="wd-todo-id" defaultValue={todo.id} className="w-50"
            onChange={(e) => setTodo({ ...todo, id: e.target.value })} />
        <hr />
        <h3>Filtering Array Items</h3>
        <a id="wd-retrieve-completed-todos" className="btn btn-primary"
            href={`${API}?completed=true`}>
            Get Completed Todos
        </a><hr/>
        <h3>Creating new Items in an Array</h3>
        <a id="wd-retrieve-completed-todos" className="btn btn-primary"
            href={`${API}/create`}>
            Create Todo
        </a><hr/>
        <h3>Deleting from an Array</h3>
        <a id="wd-retrieve-completed-todos" className="btn btn-primary float-end" href={`${API}/${todo.id}/delete`}>
            Delete Todo with ID = {todo.id} </a>
        <FormControl defaultValue={todo.id} className="w-50" onChange={(e) => setTodo({ ...todo, id: e.target.value })}/><hr/>

        <h3>Editing Todo Items</h3>
      <label><strong>Todo ID</strong></label>
      <FormControl
        className="mb-2 w-25"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />

      <label><strong>Description</strong></label>
      <FormControl
        className="mb-2 w-50"
        value={todo.description}
        placeholder="New description..."
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />

      <FormCheck
        className="mb-2"
        type="checkbox"
        label="Completed?"
        checked={todo.completed}
        onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
      />

      <div className="mb-2">
        {/* 1. Link to update the description */}
        <a
          id="wd-update-description"
          className="btn btn-primary me-2"
          href={`${API}/${todo.id}/description/${todo.description}`}
          target="_blank"
          rel="noreferrer"
        >
          Describe Todo ID = {todo.id}
        </a>

        {/* 2. Link to update the completed property */}
        <a
          id="wd-update-completed"
          className="btn btn-primary"
          href={`${API}/${todo.id}/completed/${todo.completed}`}
          target="_blank"
          rel="noreferrer"
        >
          Complete Todo ID = {todo.id}
        </a>
      </div>
    </div>
);}
