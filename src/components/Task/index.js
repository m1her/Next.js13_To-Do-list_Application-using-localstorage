import { useEffect, useState } from "react";

const Task = (props) => {
  const [isChecked, setisChecked] = useState(false);
  const id = props.itemId;

  useEffect(() => {
    const List = JSON.parse(localStorage.getItem("lists"));
    const found = List.find((obj) => {//get selected lists when the app is loaded
      return obj.isSelected === true;
    });
    const task = found.Tasks.find((obj) => {
      //look if the task is checked or not
      //or set the isChecked value so it could be displayed on the interface
      return obj.id === props.itemId;
    });
    setisChecked(task.isChecked);
  }, []);

  const deleteTask = () => {
    const List = JSON.parse(localStorage.getItem("lists")); //get lists from localstorage
    const found = List.find((obj) => {
      return obj.isSelected === true;
    }); //get selected list
    const task = found.Tasks.find((obj) => {
      return obj.id === props.itemId;
    }); //get selected Tasks you want to delete

    const foundNewTasks = found.Tasks.filter((item) => item.id !== task.id); //delete the task

    const newFound = {
      id: found.id,
      title: found.title,
      isSelected: found.isSelected,
      Tasks: foundNewTasks,
    }; // update the list

    const newList = List.map((obj) => {
      if (obj.id === newFound.id) {
        return newFound;
      }
      return obj;
    }); //update localstorage "lists" item

    localStorage.setItem("lists", JSON.stringify(newList)); //store updated item
    window.dispatchEvent(new Event("storage"));
  };

  const checkTask = () => {
    const List = JSON.parse(localStorage.getItem("lists")); //get lists from localstorage
    const found = List.find((obj) => {
      return obj.isSelected === true;
    }); //get the selected list
    const task = found.Tasks.find((item) => {
      return item.id === props.itemId;
    }); //get selected Tasks you want to check

    const newTask = {
      id: task.id,
      content: task.content,
      date: task.date,
      isChecked: !task.isChecked,
    }; //update the task

    setisChecked(!isChecked); //update check status/state

    const newFoundTasks = found.Tasks.map((task) => {
      if (task.id === newTask.id) {
        return newTask;
      }
      return task;
    }); //update "found's" list tasks

    const newFound = {
      id: found.id,
      title: found.title,
      isSelected: found.isSelected,
      Tasks: newFoundTasks,
    }; // update found with adding the new tasks

    const newList = List.map((obj) => {
      if (obj.id === newFound.id) {
        return newFound;
      }
      return obj;
    }); //update localstorage item

    localStorage.setItem("lists", JSON.stringify(newList)); //store updated item
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="flex items-center space-x-4 bg-[#424549] p-2 mb-2 rounded">
      <input
        id="default-checkbox"
        type="checkbox"
        value=""
        className=" checked:accent-[#7289da] w-[18px] h-[18px] inline-flex items-center border-[#7289da] border-none rounded-full"
        checked={isChecked}
        onChange={checkTask}
      />
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium truncate text-white ${
            isChecked ? "line-through font-semibold" : ""
          }`}
        >
          {props.content}
        </p>
        <p className="text-gray-500 truncate dark:text-gray-400 text-xs">
          {props.date}
        </p>
      </div>
      <div
        className="inline-flex items-center text-base font-semibold"
        onClick={deleteTask}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="text-red-500 hover:text-red-700 hover:cursor-pointer"
        >
          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
        </svg>
      </div>
    </div>
  );
};
export default Task;
