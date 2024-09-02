import { Fragment, useState } from "react";
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

export function ModulesComponent({ modules }: { modules: ModuleDto[] }) {
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
              numberOfTerms={10}
              key={item.id}
            />
          );
        })}
      </div>
    </Fragment>
  );
}
