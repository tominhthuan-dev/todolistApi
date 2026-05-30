import { useState } from "react";
import { createTodoApi } from "../../services/todoService";
function TodoForm({currentUser, onAddTodo, editTodo, onUpdateTodo }) {
    const [task, setTask] = useState(editTodo?.title || "");
    
    const handleClick = async () => {
        if (!task.trim()) return;
        try {
            if (editTodo) {
                const updatedTodo = { ...editTodo, title: task };
                onUpdateTodo(updatedTodo);
            } else {
                const newTodo = await createTodoApi({ title: task , userId: currentUser.id });
                onAddTodo(newTodo);
            }
            setTask("");
        } catch (error) {
            console.error("Error creating todo:", error);
        }
    };

    return (
        <div className="search">
            <input
                value={task}
                onChange={(e) => setTask(e.target.value)}
                type="text"
                placeholder="Search..." 
            />
            {
                editTodo  ? (
                    <button onClick={handleClick}>Update</button>
                ) : (
                    <button onClick={handleClick}>Add</button>
                )
            }
               
        </div>
    );
}

export default TodoForm;