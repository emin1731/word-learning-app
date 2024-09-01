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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../../ui/input";
import { useForm } from "react-hook-form";

interface TermItemProps {
  term: string;
  definition: string;
  id: string;
  isStarred: boolean;
  learningStatus: string;
}

function TermItem({
  term,
  definition,
  id,
  isStarred,
  learningStatus,
}: TermItemProps) {
  const [termExpanded, setTermExpanded] = useState<boolean>(false);

  const form = useForm<TermItemType>({
    resolver: zodResolver(TermItemSchema),
    defaultValues: {
      term,
      definition,
    },
  });
  const onSubmit = async (data: TermItemType) => {
    alert(JSON.stringify(data));
  };
  const onClose = () => {
    form.reset();
    setTermExpanded(false);
  };
  const onDelete = () => {
    alert("Delete");
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
            ? " h-20 flex justify-between"
            : " h-50 bg-primary drop-shadow-l text-spicy_mix items-center p-5"
        )}
      >
        {!termExpanded ? (
          <>
            <div className="w-4 bg-muted absolute left-0 top-0 block h-full rounded-l-xl"></div>
            <div
              className={cn(
                "w-4 absolute left-0 top-0 block h-full rounded-l-xl",
                learningStatus
              )}
            ></div>
            <div className="flex justify-start gap-20">
              <p className="text-2xl font-semibold my-4 min-w-36">{term}</p>
              <div className=" w-1.5 bg-muted"></div>
              <p className="text-2xl font-semibold my-4">{definition}</p>
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
          <>
            <p className="text-xl font-semibold mb-1">Edit term</p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex flex-col space-y-2"
              >
                <div className="w-full h-full flex justify-start items-center gap-10">
                  <FormField
                    control={form.control}
                    name="term"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Term</FormLabel>
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
                        <FormLabel>Definition</FormLabel>
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
              </form>
            </Form>
          </>
        )}
      </div>
    </Fragment>
  );
}

export default TermItem;
