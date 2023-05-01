import ListsNav from "src/components/ListsNav/index.js";
import Navigation from "src/components/Navigation/index.js";
import TasksCard from "src/components/TasksCard/index.js";

export default function Home() {
  return (
    <div>
      <Navigation />
      <ListsNav />
      <TasksCard />
    </div>
  );
}
