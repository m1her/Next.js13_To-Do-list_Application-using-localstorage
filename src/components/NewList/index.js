//add new list component

"use client";
import { useState } from "react";

const NewList = () => {
  const [toggleAdd, setToggleAdd] = useState(false);
  const [listTitle, setListTitle] = useState("");

  const addNewListToStorage = () => {
    const List = JSON.parse(localStorage.getItem("lists")); //get localstorage array of lists
    List.push({ //push new list the the end of lists array
      id: Math.random(),
      title: listTitle || "New List",
      Tasks: [],
      isSelected: false,
    });
    localStorage.setItem("lists", JSON.stringify(List));
    window.dispatchEvent(new Event("storage"));
    setListTitle("");
    setToggleAdd(false);
  };

  const handleChange = (event) => {//new list input onChange handler
    setListTitle(event.target.value);
  };
  const changeAddComponentView = () => {
    setToggleAdd(true);
  };

  const addListOnBlurHandler = () => {
    addNewListToStorage();
  };

  const addListOnKeyDownHandler = (e) => {//enter key only
    if (e.key === "Enter") {
      addNewListToStorage();
    }
  };

  return (
    <div
      className="absolute bottom-4 right-4 left-4 items-center space-x-4 p-3 mt-2 -mx-3 -mb-3 rounded hover:cursor-pointer hover:bg-[#4d505571]"
      onClick={changeAddComponentView}
    >
      <div className="flex items-center text-base font-semibold text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="20"
          height="20"
          className="block my-auto text-white float-left"
        >
          <path
            d="M440 240H272V72h-32v168H72v32h168v168h32V272h168v-32z"
            fill="var(--ci-primary-color, currentColor)"
          />
        </svg>

        {!toggleAdd && (
          <p className="text-sm ml-4 font-medium truncate text-white float-left">
            New List
          </p>
        )}
        {toggleAdd && (
          <input
            type="input"
            id="input"
            className="block ml-2 h-9 -my-2 w-11/12 p-2 text-sm rounded bg-transparent placeholder-gray-400 text-white focus:outline-none focus:border-gray-400 focus:border focus:placeholder-gray-600"
            placeholder="New List"
            value={listTitle}
            required
            autoFocus
            onBlur={addListOnBlurHandler}
            onKeyDown={addListOnKeyDownHandler}
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
};
export default NewList;
