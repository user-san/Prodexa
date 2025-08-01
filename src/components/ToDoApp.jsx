import { useContext, useState, useRef } from "react";
import { ToDoList } from "../App";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

function ToDoApp() {
  const inputRef = useRef(null);
  const { list, setList } = useContext(ToDoList); // resived the list state from App.jsx

  const [newItem, setNewItem] = useState(""); // State to moitor the input text
  const [isEditModeOn, setEditModeOn] = useState(false); // State to monitor Add and Save text in button
  const [curElement, setCurElement] = useState(null); // state to monitor the update item's id

  function handleChecked(id) {
    let newItemChecked = list.map((item) => {
      return item.id === id ? { ...item, checked: !item.checked } : item;
    });
    setList(newItemChecked);
  }

  function handleUpdate(id) {
    setEditModeOn(true);
    setCurElement(id);
    let editText = list.find((item) => item.id === id);
    setNewItem(editText.text);
    inputRef.current?.focus();
  }

  function handleAddSaveItem() {
    if (isEditModeOn) {
      if (newItem) {
        let editedList = list.map((item) =>
          item.id === curElement ? { ...item, text: newItem } : item
        );
        setList(editedList);
        setNewItem("");
        setCurElement(null);
        setEditModeOn(false);
      } else {
        alert("Enter the text to be change!");
      }
    } else {
      if (newItem) {
        setList([
          ...list,
          { id: list.length + 1, text: newItem, checked: false },
        ]);
        setNewItem("");
      } else {
        alert("Enter the text before clicking the add!");
      }
    }
    inputRef.current?.focus();
  }

  function handleDelete(id) {
    if (isEditModeOn) {
      alert("Can't delete the list is in Edit!");
    } else {
      let updatedList = list
        .filter((item) => item.id !== id)
        .map((item, index) => {
          return { ...item, id: index + 1 };
        });
      setList(updatedList);
    }
  }

  return (
    <div id="main">
      <br />
      {/*control inputs*/}
      <span>
        <input
          ref={inputRef}
          id="textBox"
          type="text"
          value={newItem}
          onChange={(event) => setNewItem(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleAddSaveItem();
            }
          }}
        />
        <button id="myButton" onClick={handleAddSaveItem}>
          {isEditModeOn ? "Save" : "Add"}
        </button>
      </span>

      <br />
      <br />
      <ul>
        {list.map((item) => {
          return (
            <li key={item.id}>
              {item.text}{" "}
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleChecked(item.id)}
              ></input>
              <FaRegEdit
                role="button"
                id="edit"
                onClick={() => handleUpdate(item.id)}
              />
              <RiDeleteBin5Line
                role="button"
                id="delete"
                onClick={() => handleDelete(item.id)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default ToDoApp;
