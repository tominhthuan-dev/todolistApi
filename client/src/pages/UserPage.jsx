import { useState, useEffect } from "react";
import { getTodosApi, deleteTodoApi, updateTodoApi } from "../services/todoService";
import Header from "../components/common/Header";
import TodoForm from "../components/user/TodoForm";
import TodoList from "../components/user/TodoList";
import Pagination from "../components/user/Pagination";

function UserPage({ currentUser, onLogout }) {
    const [editTodo, setEditTodo] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [todosByUser, setTodosByUser] = useState([]);
    useEffect(() => {
        const fetchTodos = async () => {
            try { 
                const dataTodo = await getTodosApi(currentUser.id);
                console.log("Fetched todos:", dataTodo);
                console.log("Current user ID:", currentUser.id);
                setTodosByUser(dataTodo);
            } catch (error) {
                console.error("Error fetching todos:", error);
            }   
        };
        fetchTodos();
    }, []);

    const currentUserTodos = todosByUser;//[currentUser.username] || [];
    const itemsPerPage = 3;
    const indexOfLastTodo = currentPage * itemsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
    const currentTodos = currentUserTodos.slice(indexOfFirstTodo, indexOfLastTodo);
    const totalPages = Math.max(1, Math.ceil(currentUserTodos.length / itemsPerPage));
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    //chức năng thêm todo
    const handleAddTodo = (newTodo) => {
        setTodosByUser((prev) => [
            newTodo,
            ...prev,
        ]);
    };

    const handleDeleteTodo = async(idDelete) => {
        try {
            await deleteTodoApi(idDelete);
            alert("Xóa todo thành công");
            setTodosByUser((prev) => {
                return prev.filter((todo) => todo.id !== idDelete);
            });
        } catch (error) {
            console.error("Error deleting todo:", error);
            alert("Xóa todo thất bại");
            return;
        }
    };
    const handleEditTodo = (idEdit) => {
        const todoToEdit = currentUserTodos.find((todo) => todo.id === idEdit);
        setEditTodo(todoToEdit);
    };

    const handleSaveTodo = async (updatedTodo) => {
        try {
            const updated = await updateTodoApi(updatedTodo.id,{title: updatedTodo.title});
            setTodosByUser((prev) => prev.map((todo) => (todo.id === updated.id ? updated : todo)));        
            setEditTodo(null);
            console.log("Todo updated successfully:", updated);
        } catch (error) {       
            console.error("Error updating todo:", error);
            alert("Cập nhật todo thất bại");
            return;
        }
    };

  return (
    <div>
      <h1>Welcome {currentUser.username}</h1>
      <button onClick={onLogout}>Logout</button>
      <Header />
      <TodoForm 
        key={editTodo?.id ?? "new"}
        onAddTodo={handleAddTodo} 
        editTodo={editTodo} 
        onUpdateTodo={handleSaveTodo} 
        currentUser={currentUser}
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