import { SortOptions, useGetModules } from "@/api/queries/module.queries";
import { ModulesComponent } from "./modules";
import { RecentlyVisited } from "./recently-visited";
import { useState } from "react";
import useDebounce from "@/lib/hooks/use-debounce";

export const HomePage = () => {
  const [sortBy, setSortBy] = useState<SortOptions>("date_asc");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedValue = useDebounce(searchQuery, 500);

  const {
    data: modules,
    isLoading: modulesIsLoading,
    isSuccess: modulesIsSuccess,
  } = useGetModules(sortBy, debouncedValue);

  const {
    data: recentlyVisited,
    isLoading: recentlyVisitedIsLoading,
    isSuccess: recentlyVisitedIsSuccess,
  } = useGetModules("date_desc", "");

  if (
    modulesIsLoading ||
    !modulesIsSuccess ||
    recentlyVisitedIsLoading ||
    !recentlyVisitedIsSuccess
  ) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <RecentlyVisited modules={recentlyVisited.data} />
      <ModulesComponent
        modules={modules.data}
        sortBy={sortBy}
        setSortBy={setSortBy}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </>
  );
};
