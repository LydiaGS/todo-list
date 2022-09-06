import React, {useState} from "react";
import {FaTimesCircle, FaCheckCircle, FaPen, FaTrash} from "react-icons/fa";

function TodoForm({addTodo}) {

    const [value, setValue] = useState("");

    function handleEvent(event) {
        setValue(event.target.value)
    }

    function submitTodo(event) {

        event.preventDefault();

        console.log(event)

        if (value.trim() !== "") {
            addTodo(value.trim())
            setValue("")
        }

        return false;
    }

    return <form onSubmit={submitTodo}>
        <input type="text" onChange={handleEvent} value={value}/>
        <button>Ajouter</button>
    </form>

}

function TodoFilter({filter, setFilter}) {

    function handleClick(event) {
        setFilter(event.target.innerText)
    }

    return <>
        <button onClick={handleClick} disabled={filter==="Tous"}>Tous</button>
        <button onClick={handleClick} disabled={filter==="A réaliser"}>A réaliser</button>
        <button onClick={handleClick} disabled={filter==="Ternimé"}>Ternimé</button>
    </>
}

function TodoItem({index, todos, setTodos}) {

    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState("");

    function handleChange(event) {
        setValue(event.target.value)
    }

    function handleTerminer() {
        todos[index].finish = !todos[index].finish;
        setTodos([...todos])
    }

    function handleModifier() {
        if (editing) {
            todos[index].title = value
            setTodos([...todos])
        } else {
            setValue(todos[index].title)
        }
        setEditing(!editing)
    }
    function handleSupprimer() {
        todos.splice(index, 1)
        setTodos([...todos])
    }

    const styleItem = {
        backgroundColor: todos[index].finish ? "green": "transparent",

    }
    
    return <div className="todo-item" style={styleItem}>
        {editing ?
            <input type="text" value={value} onChange={handleChange}/> :
            <span>{todos[index].title}</span>
        }
        <span className="btn-group">
        <button onClick={handleTerminer}>{todos[index].finish ? <FaTimesCircle/> : <FaCheckCircle/>}</button>
        <button onClick={handleModifier}><FaPen/></button>
        <button onClick={handleSupprimer}><FaTrash/></button>
            </span>
    </div>
}

export default function TodoContainer() {

    const [todos, setTodos] = useState([{title:"example", finish:false}]);
    const [filter, setFilter] = useState("Tous");


    function addTodo(title) {

        console.log(title)

        const newTodo = {
            title: title,
            finish: false
        }

        setTodos([...todos, newTodo])
    }

    const styleListe = {
        listStyle: "none",
        display:"flex",
        flexDirection: "column",
        padding: 0
    }

    return <>
        <h1>Application TODO</h1>
        <p>Une simple application pour afficher une liste de chose à faire</p>
        <h2>Formulaire</h2>
        <TodoForm addTodo={addTodo}/>
        <h2>Liste</h2>
        <TodoFilter filter={filter} setFilter={setFilter}/>
        <ul style={styleListe}>
        {todos.filter(t => filter === "Tous" ? true: filter === "Ternimé" ? t.finish : !t.finish)
            .map((todo, index) =>
                <li key={index}>
                    <TodoItem index={index} todos={todos} setTodos={setTodos}/>
                </li>
            )}
    </ul>
    </>

}