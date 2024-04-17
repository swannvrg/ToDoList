'use client'
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


interface Task {
  id: number;
  task: string;
  completed: boolean;
}

export default function TodoList() {
  const [tab, setTab] = useState<Task[]>([]);
  const [tache, setTache] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTache(event.target.value);
  };

  const addTask = () => {
    if (tache.trim() !== "") {
      setTab((prev) => [
        ...prev,
        { id: prev.length + 1, task: tache, completed: false },
      ]);
      setTache("");
    }
  };

  const deleteTask = (id: number) => {
    const newTab = tab.filter((item) => item.id !== id);
    setTab(newTab);
  };

  const handleCheckboxChange = (id: number) => {
    setTab((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedTasksCount = tab.filter((task) => task.completed).length;
  const remainingTasksCount = tab.length - completedTasksCount;

  return (
    <>
    <title>To Do List</title>
    <nav className="bg-dark text-light p-3 " >
        <h3>Ma To Do List</h3>
      </nav>
    <body className="bg-secondary-subtle">
      
    <div className="container   ">
      
      
      <h1 className="text-center mt-5" >Ma To Do List</h1>
      <div className="row">
        <div className="col-2"></div>
    <div className="bg-light text-center p-5 rounded col-8 border mt-4  ">
      
      <div className="">
        <label className="mb-4 fs-4" htmlFor="taskInput">Ajouter vos tâches :</label><br />
        <div className="row mb-4">
        <input
          type="text"
          id="taskInput"
          value={tache}
          onChange={handleChange}
          className=" offset-2 col-6 me-3"
          placeholder="Entrez une tache"
        />
        <button className="btn btn-primary col-2 " onClick={addTask} >Ajouter</button>
      </div>
      </div>
      <div>
       
        <ul className="list-group">
          {tab.map((item) => (
            <li key={item.id} className="list-group-item d-flex align-items-center justify-content-between mb-1">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  checked={item.completed}
                  onChange={() => handleCheckboxChange(item.id)}
                />
                <label
                  className={`form-check-label ${
                    item.completed ? "text-decoration-line-through" : ""
                  }`}
                >
                  {item.task}
                </label>
              </div>
              <button
                onClick={() => deleteTask(item.id)}
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5">Tâches faites : {completedTasksCount}</div>
        <div>Tâches restantes : {remainingTasksCount}</div>
    </div>
    </div>
    </div>
    </body>
    </>
  );
}
