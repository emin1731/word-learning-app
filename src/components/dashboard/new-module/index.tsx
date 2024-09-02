import { cn } from "@/lib/utils";
import { Fragment, useState } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "../../ui/textarea";
import { NewModuleSchema, NewModuleType } from "./schema";
import { useCreateModule } from "@/api/queries/module.queries";
import { useQueryClient } from "@tanstack/react-query";

export function NewModule() {
  const [moduleExpanded, setModuleExpanded] = useState<boolean>(false);
  const queryClient = useQueryClient(); // Get the query client

  const { mutateAsync: createModule, data: mutateData } = useCreateModule({
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["modules"] });
    },
  });

  const form = useForm<NewModuleType>({
    resolver: zodResolver(NewModuleSchema),
  });

  const onSubmit = async (data: NewModuleType) => {
    const { name, description } = data;
    await createModule({
      name,
      description,
      isPrivate: true,
    });
    alert(JSON.stringify(mutateData));
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
            "w-full p-7 transition-height duration-300 ease-in-out bg-primary drop-shadow-l text-primary-foreground rounded-xl ",
            !moduleExpanded
              ? " h-20 mb-4 cursor-pointer"
              : " h-72 bg-primary drop-shadow-l align-middle mb-4 "
          )}
        >
          {!moduleExpanded ? (
            <div
              className="flex justify-center align-middle"
              onClick={() => setModuleExpanded(true)}
            >
              <p className="text-xl font-semibold">New Module</p>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2 h-full flex justify-between items-center gap-10"
              >
                <div className="mb-4 flex flex-col gap-3 w-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
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
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Description of the module"
                            className="h-20"
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
                  className="bg-secondary h-10 w-1/2 self-end"
                  onClick={() => onClose()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-secondary h-10 w-1/2 self-end"
                >
                  Submit
                </Button>
              </form>
            </Form>
          )}
        </div>
      </div>
    </Fragment>
  );
}
