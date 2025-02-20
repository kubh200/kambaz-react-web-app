const TodoItem = ( { todo = { done: true, title: 'Buy milk',
    status: 'COMPLETED' } }) => {
    return (
        <li className="list-group-item">
        <input type="checkbox" className="me-2" style={{ accentColor: 'blue' }}
        defaultChecked={todo.done}/>
        {todo.title} ({todo.status})<hr />
        </li>
    );
}
export default TodoItem;