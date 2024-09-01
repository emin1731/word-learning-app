import { useGetModuleById } from "@/api/queries/module.queries";
import { Link, useParams } from "react-router-dom";

export const ModulePage = () => {
  const { moduleId } = useParams();

  const { data: module, error, isLoading } = useGetModuleById(moduleId || "");

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <h1 className="text-6xl font-semibold text-spicy_mix mb-4">
        {module?.data.name}
      </h1>
      <p className="text-xl font-normal text-spicy_mix mb-4 w-2/3">
        {module?.data.description}
      </p>
      <div className="flex justify-center gap-4 mb-20 mt-10">
        <Link
          to="cards"
          className="w-full h-20 rounded-xl p-5 bg-white drop-shadow-l text-spicy_mix text-center"
        >
          <p className="text-3xl font-semibold ">Cards</p>
        </Link>
        <Link
          to="learning"
          className="w-full h-20 rounded-xl p-5 bg-white drop-shadow-l text-spicy_mix text-center"
        >
          <p className="text-3xl font-semibold ">Learning</p>
        </Link>
        <div className="w-full h-20 rounded-xl p-5 bg-white drop-shadow-l text-spicy_mix text-center">
          <p className="text-3xl font-semibold ">Test</p>
        </div>
        <div className="w-full h-20 rounded-xl p-5 bg-white drop-shadow-l text-spicy_mix text-center">
          <p className="text-3xl font-semibold ">Card</p>
        </div>
      </div>
    </div>
  );
};
