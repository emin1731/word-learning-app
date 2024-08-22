import { Fragment, useState } from "react";
// import CustomSelect from "../custom-select";
// import NewModule from "../new-module";
import { ModuleItem } from "@/components/dashboard/module-item/module-item";
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

const modules = [
  {
    id: "1",
    name: "Module 1",
    description: "This is module 1",
    numberOfTerms: 20,
    terms: [
      {
        id: "1",
        term: "Term 1",
        definition: "This is term 1",
        starred: false,
      },
      {
        id: "2",
        term: "Term 2",
        definition: "This is term 2",
        starred: false,
      },
    ],
  },
];

export function ModulesComponent() {
  const [position, setPosition] = useState("bottom");

  return (
    // <Container>
    <Fragment>
      <h1 className="text-2xl font-semibold text-primary-foreground pb-4">
        All modules
      </h1>
      <div className="flex justify-between mb-5">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-primary text-base px-10 font-semibold"
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
                value={position}
                onValueChange={setPosition}
              >
                <DropdownMenuRadioItem value="top" className="text-base">
                  Top
                </DropdownMenuRadioItem>
                <DropdownMenuSeparator />
                <DropdownMenuRadioItem value="bottom" className="text-base">
                  Bottom
                </DropdownMenuRadioItem>
                <DropdownMenuSeparator />
                <DropdownMenuRadioItem value="right" className="text-base">
                  Right
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <Input
            placeholder="Search modules"
            className="w-80 bg-primary text-primary-foreground text-base px-10 font-semibold"
          />
        </div>
      </div>

      <NewModule />

      <div className="flex justify-start gap-4 mb-20 flex-col">
        {modules.map((item) => {
          return (
            <ModuleItem
              id={item.id}
              name={item.name}
              description={item.description}
              numberOfTerms={item.numberOfTerms}
              //   terms={item.terms}
              key={item.id}
            />
          );
        })}
      </div>
    </Fragment>
  );
}
