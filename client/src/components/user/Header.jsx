import { useState } from "react";

function Header({ onAddTodo, editTodo, onUpdateTodo }) {
    const [task, setTask] = useState(editTodo?.title || "");
    
    const handleClick = () => {
        if (editTodo) {
            onUpdateTodo({ id: editTodo.id, title: task });
        } else {
            onAddTodo({ id: Date.now(), title: task });
        }
        setTask("");
    };

    return (
        <header className="header">
            <h1 className="logo">Todo App</h1>
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
        </header>
    );
}

export default Header;