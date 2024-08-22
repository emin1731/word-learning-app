import { ModulesComponent } from "./modules";
import { RecentlyVisited } from "./recently-visited";

export const HomePage = () => {
  return (
    <>
      <RecentlyVisited />
      <ModulesComponent />
    </>
  );
};
