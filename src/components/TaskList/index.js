const TaskList = (props) => {
  const deleteList = () => {
    const List = JSON.parse(localStorage.getItem("lists"));
    const found = List.find((obj) => {
      return obj.id === props.itemId;
    });

    const newList = List.filter((list) => list.id !== found.id);//filter selected list "found list"
    localStorage.setItem("lists", JSON.stringify(newList));//update localstorage item
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div
      className={`h-10 select-none items-center space-x-4 py-2 px-2 rounded hover:cursor-pointer hover:bg-[#4d505563]${
        props.className ?? ""
      }`}
      onClick={props.onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="20"
        height="20"
        className="text-[#7289da] float-left"
      >
        <path
          fill="var(--ci-primary-color, currentColor)"
          d="M494 198.671a40.536 40.536 0 0 0-32.174-27.592l-115.909-18.837-53.732-104.414a40.7 40.7 0 0 0-72.37 0l-53.732 104.414-115.907 18.837a40.7 40.7 0 0 0-22.364 68.827l82.7 83.368-17.9 116.055a40.672 40.672 0 0 0 58.548 42.538L256 428.977l104.843 52.89a40.69 40.69 0 0 0 58.548-42.538l-17.9-116.055 82.7-83.368A40.538 40.538 0 0 0 494 198.671Zm-32.53 18.7L367.4 312.2l20.364 132.01a8.671 8.671 0 0 1-12.509 9.088L256 393.136 136.744 453.3a8.671 8.671 0 0 1-12.509-9.088L144.6 312.2l-94.069-94.83a8.7 8.7 0 0 1 4.778-14.706l131.841-21.426 61.119-118.767a8.694 8.694 0 0 1 15.462 0l61.119 118.767 131.841 21.426a8.7 8.7 0 0 1 4.778 14.706Z"
          className="ci-primary"
        />
      </svg>

      <p className="text-sm font-medium truncate text-white float-left">
        {props.title || "New List"}
      </p>
      <div
        className="inline-flex items-center text-base font-semibold float-right"
        onClick={deleteList}
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
          className="text-red-500 hover:text-red-700 hover:cursor-pointer w-8 "
        >
          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
        </svg>
      </div>
    </div>
  );
};
export default TaskList;
