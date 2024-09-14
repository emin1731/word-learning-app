import { cn } from "@/lib/utils";
import { Fragment, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NewTermItemSchema, NewTermItemType } from "./schema";
import { useOutsideClick } from "@/lib/hooks/use-outside-click";
import { useCreateTerm } from "@/api/queries/term.queries";
import { useParams } from "react-router-dom";

export function NewTerm() {
  const { moduleId } = useParams();
  const [termExpanded, setTermExpanded] = useState<boolean>(false);
  const ref = useOutsideClick(() => onClose());

  const { mutateAsync: createTerm } = useCreateTerm();

  const form = useForm<NewTermItemType>({
    resolver: zodResolver(NewTermItemSchema),
  });

  const onSubmit = async (data: NewTermItemType) => {
    const { term, definition } = data;
    await createTerm({
      moduleId: moduleId || "",
      term,
      definition,
    });
    onClose();
  };

  const onClose = () => {
    form.reset();
    setTermExpanded(false);
  };

  return (
    <Fragment>
      <div>
        <div
          className={cn(
            "w-full p-5 bg-card border text-primary-foreground drop-shadow-l rounded-xl transition-height duration-300 ease-in-out overflow-hidden",
            !termExpanded
              ? " h-16 mb-4 cursor-pointer"
              : " h-24 bg-card border drop-shadow-l p-5"
          )}
        >
          {!termExpanded ? (
            <div
              className="w-full flex justify-center items-center h-full"
              onClick={() => setTermExpanded(true)}
            >
              <p className="text-xl font-semibold">Create new term</p>
            </div>
          ) : (
            <div ref={ref} className="h-full flex items-center">
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
                        className={cn(
                          buttonVariants({ variant: "secondary" }),
                          "h-10 px-10"
                        )}
                        onClick={() => onClose()}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className={cn(
                          buttonVariants({ variant: "secondary" }),
                          "h-10 px-10"
                        )}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
