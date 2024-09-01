import { useGetModuleById } from "@/api/queries/module.queries";
import TermItem from "@/components/dashboard/term-item";
import { Link, useParams } from "react-router-dom";

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

const terms = [
  {
    id: "1",
    term: "Term 1",
    definition: "Definition 1",
    starred: true,
    learningStatus: "learning",
  },
  {
    id: "2",
    term: "Term 2",
    definition: "Definition 2",
    starred: false,
    learningStatus: "not-started",
  },
  {
    id: "3",
    term: "Term 3",
    definition: "Definition 3",
    starred: true,
    learningStatus: "completed",
  },
  {
    id: "4",
    term: "Term 4",
    definition: "Definition 4",
    starred: false,
    learningStatus: "not-started",
  },
];

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
      <p className="text-3xl font-semibold text-spicy_mix mb-4 w-2/3">
        All words
      </p>
      <div className="flex flex-col gap-4">
        {terms.map((item) => {
          return (
            <TermItem
              id={item.id}
              term={item.term}
              definition={item.definition}
              isStarred={item.starred}
              learningStatus={item.learningStatus}
              key={item.id}
            />
          );
        })}
      </div>
    </div>
  );
};
