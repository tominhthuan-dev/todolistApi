function TodoItem({  title, onDelete, onEdit }) {
    return (
        <div className="todoitem">
            <h1 className="todoitem-title">{title}</h1>
            <button onClick={onDelete}>Delete</button>
            <button onClick={onEdit}>Edit</button>
        </div>
    );
}

export default TodoItem;