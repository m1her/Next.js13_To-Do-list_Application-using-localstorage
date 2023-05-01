"use client";
import Task from "src/components/Task/index.js";
import AddTask from "src/components/AddTask/index.js";
import { useEffect, useState } from "react";

const TasksCard = () => {
  const [TASKS, setTASKS] = useState();

  useEffect(() => {//get selected list to display its tasks when the app is oppened
    const Lists = JSON.parse(localStorage.getItem("lists"));
    const found = Lists.find((obj) => {
      return obj.isSelected === true; 
    });

    if (found) {
      setTASKS(found?.Tasks);
    }
  }, []);

  useEffect(() => { //update list when selected list change
    window.addEventListener("storage", () => {
      const Lists = JSON.parse(localStorage.getItem("lists"));
      const found = Lists.find((obj) => {
        return obj.isSelected === true;
      });
      setTASKS(found?.Tasks);
    });
  }, []);

  return (
    <div className="fixed bg-[#282b30] mt-[84px] p-4 w-[calc(100%-360px)] rounded h-[calc(100%-100px)] ml-[340px] mb-10">
      <div className="overflow-scroll h-[450px] rounded">
        <ul>
          {TASKS?.map((item) => (
            <Task
              key={item.id}
              content={item.content}
              date={item.date}
              itemId={item.id}
            />
          ))}
        </ul>
      </div>
      <AddTask />
    </div>
  );
};
export default TasksCard;
