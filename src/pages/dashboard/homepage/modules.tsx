import { Fragment } from "react";
import { ModuleItem } from "@/components/dashboard/module-item/";
import { NewModule } from "@/components/dashboard/new-module/";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModuleDto } from "@/lib/dto/module.dto";
import { SortOptions } from "@/api/queries/module.queries";

export function ModulesComponent({
  modules,
  sortBy,
  setSortBy,
  searchQuery,
  setSearchQuery,
}: {
  modules: ModuleDto[];
  sortBy: SortOptions;
  setSortBy: (sortBy: SortOptions) => void;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}) {
  // const [sortBy, setSortBy] = useState<SortOptions>("date_asc");
  // const [searchQuery, setSearchQuery] = useState("");
  // const debouncedValue = useDebounce(searchQuery, 500);

  // const {
  //   data: modules,
  //   isLoading,
  //   isSuccess,
  // } = useGetModules(sortBy, debouncedValue);

  // if (isLoading || isSuccess == false) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Fragment>
      <h1 className="text-2xl font-semibold text-primary-foreground pb-4">
        All modules
      </h1>
      <div className="flex justify-between mb-5">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="default"
                className="text-base px-10 font-semibold"
              >
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuLabel className="text-base p-2">
                Sort modules
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={sortBy}
                onValueChange={(value: string) =>
                  setSortBy(value as SortOptions)
                }
              >
                <DropdownMenuRadioItem value="date_asc" className="text-base">
                  Date: Newest - Oldest
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="date_desc" className="text-base">
                  Date: Oldest - Newest
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="name_asc" className="text-base">
                  Name: A - Z
                </DropdownMenuRadioItem>
                <DropdownMenuSeparator />
                <DropdownMenuRadioItem value="name_desc" className="text-base">
                  Name: Z - A
                </DropdownMenuRadioItem>
                <DropdownMenuSeparator />
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <Input
            placeholder="Search modules"
            className="w-80 bg-primary dark:bg-secondary text-primary-foreground text-base px-10 font-semibold"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <NewModule />

      <div className="flex justify-start gap-4 mb-20 flex-col">
        {modules.map((item: ModuleDto) => {
          return (
            <ModuleItem
              id={item.id}
              name={item.name}
              description={item.description}
              numberOfTerms={10}
              key={item.id}
            />
          );
        })}
      </div>
    </Fragment>
  );
}
