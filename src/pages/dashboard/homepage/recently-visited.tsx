import { useGetModules } from "@/api/queries/module.queries";
import { ModuleDto } from "@/lib/dto/module.dto";
import { Link } from "react-router-dom";

export const RecentlyVisited = () => {
  const {
    data: modules,
    isLoading,
    isSuccess,
  } = useGetModules("date_desc", "");

  if (isLoading || isSuccess == false) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-primary-foreground pb-4">
        Recent modules
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">
        {modules.data?.slice(0, 4).map((module: ModuleDto) => (
          <Link to={module.id}>
            <div
              className="h-40 rounded-xl p-5 bg-white drop-shadow-l text-primary-foreground"
              key={module.name}
            >
              <p className="text-xl font-semibold ">{module.name}</p>
              <p>10 words</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
