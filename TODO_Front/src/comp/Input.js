import React, { useState } from "react";
import axios from "axios";

export default function Input() {
  const style = {
    outer: { width: "70%" },
    input: {},
    buttom: { backgroundColor: "  #3e5670bd", color: "white" },
    listComp: {
      width: "50%",
      margin: "auto",
      padding: "5px",
      textAlign: "left",
      minHeight: "45px",
    },
    oll: { listStyle: "none" },
    dbutton: {
      float: "right",
      fontSize: "12px",
      backgroundColor: "  #3e5670bd",
      color: "white",
    },
  };

  const [todos, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let temp = [];

    try {
      const resp = await axios.get("http://localhost:8080/getAll", {
        task: inputValue,
      });
      console.log(resp.data);
      // temp=resp.data;
      for (const obj of resp.data) {
        temp.push(obj["task"]);
      }
      console.log("----------------------------------------------");
      console.log(temp);

      setTodo([...temp]);
      console.log("THIS WILL BE TODODODODOD");
      console.log(todos);
      // temp.map(obj=> obj["task"])
      // console.log(temp);
      // setTodo(resp.data);
    } catch (error) {
      console.log(error);
    }
    try {
      const resp = await axios.post("http://localhost:8080/postTask", {
        task: inputValue,
      });
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
    // console.log(e);

    if (inputValue !== "") {
      setTodo([...temp, inputValue]);
    }

    setInputValue("");
  }

  async function deletFromdatabase(ele){
    let id;
      try {
        const task= await axios.get("http://localhost:8080/getAll");
        let list= task.data;
        let one=list.find(obj=>obj.task===ele);
        id=one.id;
        console.log(id);
      }
      catch(err)
      {
        console.log(err);
      }

   
    try {
      const resp = await axios.delete(`http://localhost:8080/deleteTask/${id}`);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = (index) => {
    const newTodos = [...todos];
    const ele= todos[index];
    console.log(`${ele} is been deleted`);
    deletFromdatabase(ele);
    newTodos.splice(index, 1);
    setTodo(newTodos);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div
          className="input-group mb-3 container my-5 col-md-6"
          style={style.outer}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Task to do next"
            aria-label="task"
            aria-describedby="button-addon2"
            value={inputValue}
            onChange={handleChange}
          />
          <button
            className="btn btn-outline-secondary"
            type="submit"
            id="button-addon2"
            style={style.buttom}
            // onClick={handleSubmit}
          >
            Button
          </button>
        </div>
      </form>
      <div>
        <ol style={style.oll}>
          {todos.map((todo, index) => (
            <li
              key={index}
              style={style.listComp}
              className="my-3 form-control"
            >
              <span> </span> {todo}
              <button
                onClick={() => handleDelete(index)}
                style={style.dbutton}
                className="btn btn-outline-secondary"
              >
                Delete
              </button>
              <div></div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
