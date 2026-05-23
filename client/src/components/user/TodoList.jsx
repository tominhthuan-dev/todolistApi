import TodoItem from "./TodoItem";

function TodoList({ todos, onDeleteTodo, onEditTodo }) {
    return (
        <div className="todolists">
            {todos.map(todo => (
                <TodoItem
                    key={todo.id} 
                    title={todo.title} 
                    onDelete={() => onDeleteTodo(todo.id)} 
                    onEdit={() => onEditTodo(todo.id)}
                />
            ))}
        </div>
    );
}

export default TodoList;