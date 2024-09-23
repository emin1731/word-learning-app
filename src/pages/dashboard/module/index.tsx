import { useGetModuleById } from "@/api/queries/module.queries";
import { Link, useParams } from "react-router-dom";
import { TermsComponent } from "./terms";
import NotFoundPage from "@/pages/not-found";

import { GalleryHorizontalEnd, RefreshCw, BookCheck } from "lucide-react";

interface ModuleOption {
  name: string;
  link: string;
  icon: JSX.Element;
}

const moduleOptions: ModuleOption[] = [
  {
    name: "Cards",
    link: "cards",
    icon: <GalleryHorizontalEnd />,
  },
  {
    name: "Learning",
    link: "learning",
    icon: <RefreshCw />,
  },
  {
    name: "Test",
    link: "test",
    icon: <BookCheck />,
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

  if (module.error || error) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <h1 className="text-4xl font-semibold text-primary-foreground mb-3">
        {module?.data.name}
      </h1>
      <p className="text-lg font-normal mb-4 w-2/3">
        {module?.data.description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-20">
        {moduleOptions.map((moduleOption) => (
          <Link
            to={moduleOption.link}
            className="w-full h-16 rounded-xl p-5 py-10 bg-card hover:bg-card/90 transition-colors border drop-shadow-l flex justify-center items-center gap-x-3"
            key={moduleOption.link}
          >
            <div>{moduleOption.icon}</div>
            <p className="text-xl font-semibold ">{moduleOption.name}</p>
          </Link>
        ))}
      </div>
      <TermsComponent />
    </div>
  );
};
