import React, { useEffect, useState } from "react";
import "./todo.css";

const getData = () => {
  return JSON.parse(localStorage.getItem("data"));
};
const Todo = () => {
  const [Data, setData] = useState("");
  const [newData, setNewData] = useState(getData());
  const [editItem, setEditItem] = useState();
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(newData));
  }, [newData]);
  const addItems = () => {
    if (Data && toggle) {
      setNewData(
        newData.map((currentElem) => {
          if (currentElem.id === editItem) {
            return { ...currentElem, data: Data };
          }
          return currentElem;
        })
      );
      setData("");
      // console.log(update);
      // console.log(newData);
      setEditItem(null);
      setToggle(false);
    } else {
      const obj = {
        id: new Date().getTime().toString(),
        data: Data,
      };
      setNewData([...newData, obj]);
      setData("");
    }
  };
  const deleteItem = (id) => {
    const result = newData.filter((element) => {
      return element.id !== id;
    });
    setNewData(result);
  };
  const updateItem = (id) => {
    const update = newData.find((element) => {
      return element.id === id;
    });
    setData(update.data);
    // console.log(update);
    // console.log(newData);
    setEditItem(id);
    setToggle(true);
  };
  const removeAll = () => {
    setNewData([]);
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./image/todo.svg" alt="todoImage" />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add Item"
              className="form-control"
              value={Data}
              onChange={(e) => {
                setData(e.target.value);
              }}
            />
            {toggle ? (
              <i
                className="fas fa-edit"
                onClick={(e) => {
                  addItems();
                }}
              ></i>
            ) : (
              <i
                className="fa fa-solid fa-plus"
                onClick={(e) => {
                  addItems();
                }}
              ></i>
            )}
          </div>
          <div className="showItems">
            {newData.map((elem) => {
              return (
                <>
                  <div className="eachItem" key={elem.id}>
                    <h3>{elem.data}</h3>
                    <div className="todo-btn">
                      <i
                        className="fas fa-edit"
                        onClick={() => {
                          updateItem(elem.id);
                        }}
                      ></i>
                      <i
                        className="fas fa-trash-alt"
                        onClick={() => {
                          deleteItem(elem.id);
                        }}
                      ></i>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span> Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
