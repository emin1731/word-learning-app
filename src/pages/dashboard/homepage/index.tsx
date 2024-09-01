import { useGetModules } from "@/api/queries/module.queries";
import { ModulesComponent } from "./modules";
import { RecentlyVisited } from "./recently-visited";

export const HomePage = () => {
  const { data, isPending } = useGetModules();

  if (isPending) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <RecentlyVisited />
      <ModulesComponent modules={data?.data} />
    </>
  );
};
