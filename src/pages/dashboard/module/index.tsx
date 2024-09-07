import { useGetModuleById } from "@/api/queries/module.queries";
import { Link, useParams } from "react-router-dom";
import { TermsComponent } from "./terms";
import NotFoundPage from "@/pages/not-found";

import {
  GalleryHorizontalEnd,
  RefreshCw,
  Apple,
  BookCheck,
} from "lucide-react";

const moduleOptions = [
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
  {
    name: "Demo",
    link: "demo",
    icon: <Apple />,
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
      <h1 className="text-4xl font-semibold text-spicy_mix mb-3">
        {module?.data.name}
      </h1>
      <p className="text-lg font-normal text-spicy_mix mb-4 w-2/3">
        {module?.data.description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">
        {moduleOptions.map((moduleOption) => (
          <Link
            to={moduleOption.link}
            className="w-full h-16 rounded-xl p-5 bg-white drop-shadow-l flex justify-center gap-x-3"
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
