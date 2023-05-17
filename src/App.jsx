import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { randomColor } from "randomcolor";
import Draggable from "react-draggable";
import toast,{ Toaster } from 'react-hot-toast';
import "./App.css";


function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const newItem = () => {
    if (item.trim() !== "") {
      const newItem = {
        id: uuidv4(),
        item,
        color: randomColor({
          luminosity: "light",
        }),
        defaultPos: {
          x: 500,
          y: -500,
        },
      };
      setItems((items) => [...items, newItem]);
      setItem("");
    } else {
      toast.error('Enter the task!')
      setItem("");
    }
  };

  const deleteNode = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updatePos = (data, index) =>{
    let newArr = [...items]
    newArr[index].defaultPos = {x: data.x, y: data.y}
    setItems(newArr)
  }

const keyDown = (e) => {
  const code = e.keyCode || e.which
    if(code === 13){
      newItem()
    }
}

  return (
    <div><Toaster/>
    {
          <div className="App">
      <div className="wrapper">
        <input
          value={item}
          type="text"
          placeholder="Enter your task"
          onChange={(e) => setItem(e.target.value)}
          onKeyDown={(e) => keyDown(e)}
        />
        <button className="enter" onClick={newItem}>
          ADD TASK
        </button>
      </div>

      {items.map((item, index) => {
        return (
          <Draggable 
          key={index} 
          defaultPosition={item.defaultPos} 
          onStop={(_, data)=>{
          updatePos(data, index)
          }}>
            <div className="todo-item" style={{ backgroundColor: item.color }}>
              {`${item.item}`}
              <button className="delete" onClick={() => deleteNode(item.id)}>
                ❌
              </button>
            </div>
          </Draggable>
        );
      })}
    </div>
    }
    </div>

  );
}

export default App;
