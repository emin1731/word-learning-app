import { SortOptions } from "@/api/queries/module.queries";
import { useUpdateTerm } from "@/api/queries/term.queries";
import { NewTerm } from "@/components/dashboard/new-term";
import TermItem from "@/components/dashboard/term-item";
import { Button } from "@/components/ui/button";
import { LearningStatus, TermDto } from "@/lib/dto/term.dto";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const TermsComponent = ({
  moduleId,
  terms,
  sortBy,
  setSortBy,
  searchQuery,
  setSearchQuery,
}: {
  moduleId: string;
  terms: TermDto[];
  sortBy: SortOptions;
  setSortBy: (sortBy: SortOptions) => void;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}) => {
  const [isConfirmResetOpen, setIsConfirmResetOpen] = useState(false);
  const { mutateAsync: updateTerm } = useUpdateTerm();

  const resetProgress = async () => {
    if (terms) {
      for (const term of terms) {
        await updateTerm({
          moduleId: moduleId || "",
          termId: term.id,
          term: term.term,
          definition: term.definition,
          status: "NOT_STARTED",
        });
      }
    }
    setIsConfirmResetOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold w-2/3">All words</h1>
      </div>
      <div className="flex justify-between mb-5">
        <div className="flex gap-x-4">
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

          <Button
            variant={"default"}
            className="text-base px-10 font-semibold"
            onClick={() => setIsConfirmResetOpen(!isConfirmResetOpen)}
          >
            Reset Progress
          </Button>
        </div>
        <div>
          <Input
            value={searchQuery}
            className="w-80 bg-primary dark:bg-secondary text-primary-foreground text-base px-10 font-semibold"
            placeholder="Search terms"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {terms.map((item: TermDto) => {
          return (
            <TermItem
              id={item.id}
              term={item.term}
              definition={item.definition}
              isStarred={item.isStarred}
              learningStatus={item.status as LearningStatus}
              key={item.id}
            />
          );
        })}
        <NewTerm />
      </div>
      <Dialog open={isConfirmResetOpen} onOpenChange={setIsConfirmResetOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Reset module</DialogTitle>
          </DialogHeader>
          <div className="py-2">
            Are you sure you want to reset the progress of all the words? All
            the words will be marked as not started.
          </div>
          <DialogFooter>
            <Button type="submit" variant={"secondary"} onClick={resetProgress}>
              Reset module
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
