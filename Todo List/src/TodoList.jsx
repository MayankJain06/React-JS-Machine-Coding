import { useState } from "react"

const TodoList =()=>{
    const [text, setText] = useState("");
    const [todoList, setTodoList]  = useState([]);

    const handleChange=(e)=>{
        setText(e.target.value);
    }

    const addTodolist = ()=>{
        if(text.trim() === "") return; 
        const newObj={
            id:Date.now(),
            todo: text,
            isCompleted: false,
        };
        setTodoList((prev)=>[...prev, newObj]);
        setText("");
    }

    const handleDelete = (id)=>{
        setTodoList(todoList.filter((todo, index)=>todo.id !== id));
    }

   const handleToggle = (id)=>{
        setTodoList(todoList.map((todo)=>todo.id === id ? {...todo, isCompleted: true }: todo));
   }

    return (
        <>
        <h1>Todo List</h1>
        <div style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
        <input type="text" value={text} onChange={(e)=>handleChange(e)}></input>
        <button onClick={addTodolist}>Add</button>
        </div>

        <div>
            <ul>
                {todoList?.map((todo, index)=>{
                    return (
                <li>
                <input type="checkbox" onChange={()=>handleToggle(todo.id)}></input>
                <span>{todo?.todo}</span>
                <button onClick={(e)=>handleDelete(todo.id)}>Delete</button>
                </li>
                )})}
            </ul>
        </div>
        </>

    )
}

export default TodoList;