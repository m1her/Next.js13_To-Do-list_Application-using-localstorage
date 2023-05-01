//sideNav component
"use client";
import TaskList from "src/components/TaskList/index.js";
import Search from "src/components/Search/index.js";
import NewList from "src/components/NewList/index.js";
import { useEffect, useState } from "react";

const ListsNav = () => {
  const defaultList = [
    { id: "1", title: "My Day", Tasks: [], isSelected: false },
    //default list to add when you first oppen the app
    //and if the user did not enter list title
  ];

  const [lists, setLists] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  const [searchText, setsearchText] = useState("");
  const searchHandler = (e) => {
    //save search input
    setsearchText(e.target.value);
  };

  const updateLists = (item) => {
    const List = JSON.parse(localStorage.getItem("lists")); //get localstorage array of lists
    const updatedLists = List.map((list) => {
      //add the new list
      if (list.id === item.id) {
        return {
          id: list.id,
          title: list.title,
          Tasks: list.Tasks,
          isSelected: true,
        };
      } else {
        return {
          id: list.id,
          title: list.title,
          Tasks: list.Tasks,
          isSelected: false,
        };
      }
    });
    localStorage.setItem("lists", JSON.stringify(updatedLists));
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    //load lists when application is oppened/started
    const List = JSON.parse(localStorage.getItem("lists"));
    const found = List.find((obj) => {
      return obj.isSelected === true; //to update selected item's css and display its tasks
    });
    setSelectedItem(found.id);
    if (List) {
      setLists(List);
    } else {
      localStorage.setItem("lists", JSON.stringify(defaultList));
      setLists(defaultList);
    }
  }, []);

  useEffect(() => {
    if (lists) {
    }
    window.addEventListener("storage", () => {
      setLists(JSON.parse(localStorage.getItem("lists")));
    });
  }, [lists]);

  return (
    <div className="fixed h-[calc(100%-100px)] z-10 overflow-x-hidden w-80 top-16 left-0 bg-[#1e2124] mt-5 pt-5 px-2 rounded-r-md">
      <Search onChange={searchHandler} value={searchText} />
      <div className="overflow-scroll h-[430px]">
        <ul>
          {/* how search is working:
          i created two lists, and displayed only one at each time, when search input is empty,
          default list is displayed, else if user wrote in search input,
          new filtered list will be displayed. filtered list will be as follows:
          at the top it will contain the lists that starts with the same letters and then lists 
          which contains the same letters. 
           */}
          {searchText &&
            lists
              .filter((item) =>
                item.title.toLowerCase().includes(searchText.toLowerCase())
              )
              .sort((a, b) => {
                const aStarts = a.title
                  .toLowerCase()
                  .startsWith(searchText.toLowerCase());
                const bStarts = b.title
                  .toLowerCase()
                  .startsWith(searchText.toLowerCase());
                if (aStarts && bStarts) return a.title.localeCompare(b);
                if (aStarts && !bStarts) return -1;
                if (!aStarts && bStarts) return 1;
                return a.title.localeCompare(b);
              })
              .map((item) => (
                <TaskList
                  key={item.id}
                  title={item.title}
                  className={
                    selectedItem === item.id ? "selected bg-[#7289da25]" : ""
                  }
                  onClick={() => {
                    setSelectedItem(item.id);
                    updateLists(item);
                  }}
                  itemId={item.id}
                />
              ))}
          {!searchText &&
            lists.map((item) => (
              <TaskList
                key={item.id}
                title={item.title}
                className={
                  selectedItem === item.id ? "selected bg-[#7289da25]" : ""
                }
                onClick={() => {
                  setSelectedItem(item.id);
                  updateLists(item);
                }}
                itemId={item.id}
              />
            ))}
        </ul>
      </div>
      <NewList />
    </div>
  );
};
export default ListsNav;
