import { useGetModuleById } from "@/api/queries/module.queries";
import { Link, useParams } from "react-router-dom";
import { TermsComponent } from "./terms";

const moduleOptions = [
  {
    name: "Cards",
    link: "cards",
  },
  {
    name: "Learning",
    link: "learning",
  },
  {
    name: "Test",
    link: "test",
  },
  {
    name: "Demo",
    link: "demo",
  },
];

export const ModulePage = () => {
  const { moduleId } = useParams();

  const {
    data: module,
    error,
    isLoading,
    isSuccess,
  } = useGetModuleById(moduleId || "");

  if (isLoading || !isSuccess) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-semibold text-spicy_mix mb-4">
        {module?.data.name}
      </h1>
      <p className="text-lg font-normal text-spicy_mix mb-4 w-2/3">
        {module?.data.description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">
        {moduleOptions.map((moduleOption) => (
          <Link
            to={moduleOption.link}
            className="w-full h-16 rounded-xl p-5 bg-white drop-shadow-l flex justify-center items-center"
            key={moduleOption.link}
          >
            <p className="text-xl font-semibold ">{moduleOption.name}</p>
          </Link>
        ))}
      </div>
      <TermsComponent />
    </div>
  );
};
