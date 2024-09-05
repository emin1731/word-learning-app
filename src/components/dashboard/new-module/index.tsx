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
import { Textarea } from "../../ui/textarea";
import { NewModuleSchema, NewModuleType } from "./schema";
import { useCreateModule } from "@/api/queries/module.queries";
import { useOutsideClick } from "@/lib/hooks/use-outside-click";

export function NewModule() {
  const [moduleExpanded, setModuleExpanded] = useState<boolean>(false);
  const ref = useOutsideClick(() => onClose());

  const { mutateAsync: createModule } = useCreateModule();

  const form = useForm<NewModuleType>({
    resolver: zodResolver(NewModuleSchema),
  });

  const onSubmit = async (data: NewModuleType) => {
    const { name, description } = data;
    await createModule({
      name,
      description,
      isPrivate: false,
    });
    onClose();
  };

  const onClose = () => {
    form.reset();
    setModuleExpanded(false);
  };

  return (
    <Fragment>
      <div>
        <div
          className={cn(
            "w-full p-5 bg-primary text-primary-foreground drop-shadow-l rounded-xl transition-height duration-300 ease-in-out overflow-hidden",
            !moduleExpanded
              ? " h-20 mb-4 cursor-pointer"
              : " h-48 bg-primary drop-shadow-l align-middle mb-4 "
          )}
        >
          {!moduleExpanded ? (
            <div
              className="flex justify-center items-center h-full"
              onClick={() => setModuleExpanded(true)}
            >
              <p className="text-2xl font-semibold">Create new module</p>
            </div>
          ) : (
            <div ref={ref} className="h-full flex items-center">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full h-auto flex justify-center items-end gap-x-5"
                >
                  <div className="flex flex-col justify-center gap-3 w-full">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Module name</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Enter module name"
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Module description</FormLabel> */}
                          <FormControl>
                            <Textarea
                              placeholder="Enter the description of the module"
                              className="min-h-24"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="button"
                    className={cn(
                      buttonVariants({ variant: "secondary" }),
                      " h-10 w-1/2 self-end"
                    )}
                    onClick={() => onClose()}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className={cn(
                      buttonVariants({ variant: "secondary" }),
                      " h-10 w-1/2 self-end"
                    )}
                  >
                    Submit
                  </Button>
                </form>
              </Form>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
