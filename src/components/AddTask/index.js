//add new task component
"use client";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";

const AddTask = () => {
  const [toggleAdd, setToggleAdd] = useState(false); // toggle add component view
  const [task, setTask] = useState("");
  const [date, setDate] = useState();

  const onDateChange = (newDate) => {
    setDate(newDate.toLocaleDateString()); //save the selected date into data state
  };

  const changeAddComponentView = () => {
    setToggleAdd(true);
  };

  const handleInputChange = (event) => {
    setTask(event.target.value);
  };

  const addTask = () => { //// Adding a task into the localstorage function
    const Lists = JSON.parse(localStorage.getItem("lists")); //get localstorage array of lists
    const found = Lists.find((obj) => {
      return obj.isSelected === true; //get the selected list on the sideNav
    });
    const updatedListTasks = Lists.map((list) => {//add new task to the selected list
      if (list.id === found.id) {
        return {
          id: list.id,
          title: list.title,
          Tasks: [
            ...list.Tasks,
            {
              id: Math.random(),
              content: task,
              date: date,
              isChecked: false,
            },
          ],
          isSelected: list.isSelected,
        };
      } else {
        return {
          id: list.id,
          title: list.title,
          Tasks: list.Tasks,
          isSelected: list.isSelected,
        };
      }
    });
    localStorage.setItem("lists", JSON.stringify(updatedListTasks));
    window.dispatchEvent(new Event("storage"));
  };

  const enterHandler = (e) => { //add task when you press Enter
    if (e.key === "Enter") {
      if (task && date) {
        addTask();
        setToggleAdd(false);
        setTask("");
        setDate(null);
      }
    }
    if (e.key === "Escape") { //exit task adding 
      setToggleAdd(false);
      setTask("");
      setDate(null);
    }
  };

  return (
    <div
      className="absolute bottom-4 right-4 left-4 items-center space-x-4 bg-[#424549] p-3 mt-2 rounded hover:cursor-pointer hover:bg-[#4d5055]"
      onClick={changeAddComponentView}
    >
      <div className="flex items-center text-base font-semibold text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="24"
          height="24"
          className="text-[#7289da] float-left"
        >
          <path
            d="M440 240H272V72h-32v168H72v32h168v168h32V272h168v-32z"
            fill="var(--ci-primary-color, currentColor)"
          />
        </svg>
        {!toggleAdd && (
          <p className="ml-4 text-sm font-medium truncate text-[#7289da] float-left">
            Add a task
          </p>
        )}
        {toggleAdd && (
          <input
            type="input"
            id="input"
            className="block ml-2 h-9 -my-2 w-11/12 p-2 text-sm rounded bg-transparent placeholder-gray-400 text-white focus:outline-none focus:border-gray-400 focus:border focus:placeholder-gray-500"
            placeholder="Add a task"
            value={task}
            required
            autoFocus
            onKeyDown={enterHandler}
            onChange={handleInputChange}
          />
        )}

        {toggleAdd && (
          <Popover placement="top">
            <PopoverHandler>
              <Button
                variant="gradient"
                className="content-center items-center relative -my-4 h-8"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-5 h-5 ml-5 text-[#bcbcbc] transform -translate-x-1/2 -translate-y-1/3"
                  fill="#bcbcbc"
                >
                  <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24v40H64C28.7 64 0 92.7 0 128v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64h-40V24c0-13.3-10.7-24-24-24s-24 10.7-24 24v40H152V24zM48 192h80v56H48v-56zm0 104h80v64H48v-64zm128 0h96v64h-96v-64zm144 0h80v64h-80v-64zm80-48h-80v-56h80v56zm0 160v40c0 8.8-7.2 16-16 16h-64v-56h80zm-128 0v56h-96v-56h96zm-144 0v56H64c-8.8 0-16-7.2-16-16v-40h80zm144-160h-96v-56h96v56z" />
                </svg>
              </Button>
            </PopoverHandler>
            <PopoverContent className="text-black -p-4 rounded w-[250px] h-[302px]">
              <Calendar
                onChange={onDateChange}
                value={date}
                showNeighboringMonth={false}
                locale={"en-US"}
              />
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};
export default AddTask;
