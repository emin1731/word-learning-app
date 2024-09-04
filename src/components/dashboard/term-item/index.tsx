import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon, Star } from "lucide-react";
import { Fragment, useState } from "react";
import { TermItemSchema, TermItemType } from "./schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../../ui/input";
import { useForm } from "react-hook-form";
import { useOutsideClick } from "@/lib/hooks/use-outside-click";
import { useDeleteTerm, useUpdateTerm } from "@/api/queries/term.queries";
import { useParams } from "react-router-dom";
import { LearningStatus } from "@/lib/dto/term.dto";

interface TermItemProps {
  term: string;
  definition: string;
  id: string;
  isStarred: boolean;
  learningStatus: LearningStatus;
}

function TermItem({
  term,
  definition,
  id,
  isStarred,
  learningStatus,
}: TermItemProps) {
  const { moduleId } = useParams();
  const [termExpanded, setTermExpanded] = useState<boolean>(false);
  const ref = useOutsideClick(() => onClose());

  const { mutateAsync: deleteTerm } = useDeleteTerm();
  const { mutateAsync: updateTerm } = useUpdateTerm();

  const form = useForm<TermItemType>({
    resolver: zodResolver(TermItemSchema),
    defaultValues: {
      term,
      definition,
    },
  });
  const onSubmit = async (data: TermItemType) => {
    await updateTerm({
      moduleId: moduleId || "",
      status: learningStatus,
      termId: id,
      ...data,
    });
    onClose();
  };
  const onClose = () => {
    form.reset();
    setTermExpanded(false);
  };
  const onDelete = async () => {
    await deleteTerm({ moduleId: moduleId || "", termId: id });
  };

  const handleClick = () => {
    setTermExpanded(true);
  };

  return (
    <Fragment key={id}>
      <div
        className={cn(
          "w-full p-1 px-10 relative transition-height duration-300 ease-in-out bg-primary drop-shadow-l text-spicy_mix rounded-xl justify-between items-center",
          !termExpanded
            ? " h-16 flex justify-between"
            : " h-50 bg-primary drop-shadow-l text-spicy_mix items-center p-5"
        )}
      >
        {!termExpanded ? (
          <>
            <div
              className={cn(
                "w-4 absolute left-0 top-0 block h-full rounded-l-xl ",
                learningStatus === "NOT_STARTED" && "bg-learningNotStarted",
                learningStatus === "IN_PROGRESS" && "bg-learningInProgress",
                learningStatus === "COMPLETED" && "bg-learningCompleted"
              )}
            ></div>
            <div className="flex justify-start gap-20">
              <p className="text-xl font-semibold my-4 min-w-36">{term}</p>
              <div className=" w-0.5 bg-muted"></div>
              <p className="text-xl font-semibold my-4">{definition}</p>
            </div>
            <div className="flex gap-x-3">
              {isStarred ? (
                <Star
                  fontSize="large"
                  className="self-center cursor-pointer text-yellow-400"
                />
              ) : (
                <Star fontSize="large" className="self-center cursor-pointer" />
              )}
              <EditIcon
                fontSize="large"
                className="self-center cursor-pointer"
                onClick={handleClick}
              />
            </div>
          </>
        ) : (
          <div ref={ref}>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex flex-col space-y-2"
              >
                <div className="flex justify-between items-center gap-10">
                  <div className="w-full h-full flex justify-start items-center gap-10">
                    <FormField
                      control={form.control}
                      name="term"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter term"
                              className="w-60 rounded py-2 px-3 focus:outline-none focus:shadow-outline"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="definition"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter definition"
                              className="w-80 rounded py-2 px-3 focus:outline-none focus:shadow-outline"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-end items-end gap-x-4 self-end">
                    <Button
                      type="button"
                      className="bg-secondary h-10 px-6"
                      onClick={() => onClose()}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      className="bg-secondary h-10 px-6"
                      onClick={() => onDelete()}
                    >
                      Delete
                    </Button>
                    <Button type="submit" className="bg-secondary h-10 px-6">
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default TermItem;
