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
import { ModuleItemSchema, ModuleItemType } from "./schema";
import { Link } from "react-router-dom";
import { EditIcon } from "lucide-react";
import { useDeleteModule, useUpdateModule } from "@/api/queries/module.queries";
import { useOutsideClick } from "@/lib/hooks/use-outside-click";
import { ModuleDto } from "@/lib/dto/module.dto";

export function ModuleItem({
  id,
  name,
  description,
  numberOfTerms,
}: ModuleDto) {
  const [moduleExpanded, setModuleExpanded] = useState<boolean>(false);
  const { mutateAsync: deleteModule } = useDeleteModule();
  const { mutateAsync: updateModule } = useUpdateModule();
  const ref = useOutsideClick(() => onClose());

  const form = useForm<ModuleItemType>({
    resolver: zodResolver(ModuleItemSchema),
    defaultValues: {
      name: name,
      description: description,
    },
  });

  const onSubmit = async (data: ModuleItemType) => {
    await updateModule({ id, isPrivate: false, ...data });
    onClose();
    form.trigger();
  };

  const onClose = () => {
    form.reset();
    setModuleExpanded(false);
  };

  const onDelete = () => {
    deleteModule(id);
    onClose();
  };

  return (
    <Fragment>
      <div
        className={cn(
          "w-full px-10 py-5 bg-card border drop-shadow-l text-primary-foreground rounded-xl transition-height duration-300 ease-in-out overflow-hidden",
          !moduleExpanded
            ? " h-20 cursor-pointer"
            : " h-48 bg-card border drop-shadow-l align-middle"
        )}
      >
        {!moduleExpanded ? (
          <div className="h-full flex justify-between items-center">
            <div>
              <Link to={id} relative="path">
                <p className="text-2xl font-semibold">{name} </p>
              </Link>
            </div>
            <div className="flex align-middle items-center gap-5">
              <p className="text-xl cursor-default">{numberOfTerms} words</p>
              <Button
                className={cn(
                  buttonVariants({ variant: "ghost", size: "customIcon" }),
                  "h-10 p-3"
                )}
              >
                <EditIcon
                  fontSize="large"
                  className="self-center cursor-pointer"
                  onClick={() => setModuleExpanded(true)}
                />
              </Button>
            </div>
          </div>
        ) : (
          <div ref={ref} className="h-full flex items-center">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-2 h-full flex justify-between items-center gap-x-5"
              >
                <div className="flex flex-col gap-3 w-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
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
                        <FormControl>
                          <Textarea
                            placeholder="Description of the module"
                            className="min-h-24"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* <div className="flex justify-end items-end gap-x-4 self-end"> */}
                <Button
                  type="button"
                  className={cn(
                    buttonVariants({ variant: "secondary" }),
                    " h-10 px-6 self-end"
                  )}
                  onClick={() => onClose()}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className={cn(
                    buttonVariants({ variant: "secondary" }),
                    " h-10 px-6 self-end"
                  )}
                  onClick={() => onDelete()}
                >
                  Delete
                </Button>
                <Button
                  type="submit"
                  className={cn(
                    buttonVariants({ variant: "secondary" }),
                    " h-10 px-6 self-end"
                  )}
                >
                  Submit
                </Button>
                {/* </div> */}
              </form>
            </Form>
          </div>
        )}
      </div>
    </Fragment>
  );
}
