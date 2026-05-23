import { useState, useEffect } from "react";
import Header from "./Header";
import TodoList from "./TodoList";
import Pagination from "./Pagination";

function UserPage({ currentUser, onLogout }) {
    const [editTodo, setEditTodo] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Hiển thị todo từ localStorage khi component được mount
    const [todosByUser, setTodosByUser] = useState(() => {
        const savedTodos = localStorage.getItem("todosByUser");
        return savedTodos ? JSON.parse(savedTodos) : {};
    });
  
    //lưu object todosByUser
    useEffect(() => {
        localStorage.setItem("todosByUser", JSON.stringify(todosByUser));
    }, [todosByUser]);

    

    const currentUserTodos = todosByUser[currentUser.username] || [];
    const itemsPerPage = 3;
    const indexOfLastTodo = currentPage * itemsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
    const currentTodos = currentUserTodos.slice(indexOfFirstTodo, indexOfLastTodo);
    const totalPages = Math.max(1, Math.ceil(currentUserTodos.length / itemsPerPage));
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    //chức năng thêm todo
    const handleAddTodo = (newTodo) => {
        if (!newTodo.title?.trim()) return;
        setTodosByUser((prev) => {
        const userTodos = prev[currentUser.username] || [];
        return {
            ...prev,
            [currentUser.username]: [newTodo, ...userTodos],
        };
        });
    };

    const handleDeleteTodo = (idDelete) => {
        setTodosByUser((prev) => {
        const deletedUserTodos = (prev[currentUser.username] || []).filter(
            (todo) => todo.id !== idDelete
        );
        return {
            ...prev,
            [currentUser.username]: deletedUserTodos,
        };
        });
    };

    const handleEditTodo = (idEdit) => {
        const todoToEdit = currentUserTodos.find((todo) => todo.id === idEdit);
        setEditTodo(todoToEdit);
    };

    const handleSaveTodo = (updatedTodo) => {
        setTodosByUser((prev) => {
        const updatedUserTodos = (prev[currentUser.username] || []).map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
        );
        return {
            ...prev,
            [currentUser.username]: updatedUserTodos,
        };
        });
        setEditTodo(null);
    };

  return (
    <div>
      <h1>Welcome {currentUser.username}</h1>
      <button onClick={onLogout}>Logout</button>
      <Header 
        key={editTodo?.id ?? "new"}
        onAddTodo={handleAddTodo} 
        editTodo={editTodo} 
        onUpdateTodo={handleSaveTodo} 
      />
      <TodoList 
        todos={currentTodos} 
        onDeleteTodo={handleDeleteTodo} 
        onEditTodo={handleEditTodo} 
        />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        pageNumbers={pageNumbers}
      />
    </div>
  );
}

export default UserPage;