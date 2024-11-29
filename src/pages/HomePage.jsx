import { useEffect, useState } from "react";
import NewTask from "../components/NewTask";
import TodoItem from "../components/TodoItem";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const HomePage = () => {
  const [todos, setTotodos] = useState([]);

  const [loading, setLoading] = useState(false);

  function delay() {
    return new Promise((resolve) => setTimeout(resolve, 300));
  }

  const addTask = async (task) => {
    setLoading(true);
    setTotodos((prevTodos) => [...prevTodos, task]);
    await delay();
    setLoading(false);
    toast.success("Successfully Added");
  };

  const deleteTask = (id) => {
    setTotodos((prevTodos) => prevTodos.filter((_, i) => i !== id));
    toast.warning("Successfully Deleted!!!");
  };

  const updateTask = (task, id) => {
    setTotodos((prevTodos) => prevTodos.map((t, i) => (i === id ? task : t)));
    toast.info("Successfully Update");
  };

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.log("Error ", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);
  return (
    <>
      {users.map((user, i) => (
        <div key={i}>
          {user.id} {user.title}
        </div>
      ))}
      <NewTask addTask={addTask} />

      {loading ? (
        <Spinner />
      ) : (
        todos.length > 0 && (
          <ul className="bg-gray-200 rounded-md shadow-sm p-4">
            {todos.map((todo, i) => (
              <TodoItem
                key={i}
                id={i}
                todo={todo}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))}
          </ul>
        )
      )}
    </>
  );
};

export default HomePage;
