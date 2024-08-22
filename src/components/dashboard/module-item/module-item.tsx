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
import { ModuleItemSchema, ModuleItemType } from "./schema";
import { Link } from "react-router-dom";
import { EditIcon } from "lucide-react";

export interface Module {
  id: string;
  name: string;
  description: string;
  numberOfTerms: number;
  //   terms: Term[];
  // date: number;
  moduleId?: string; // IMPORTANT
}

export interface Term {
  id: string;
  term: string;
  definition: string;
  //   learningStatus: LearningStatus;
  starred: boolean;
  options?: string[];
  moduleId?: string; // IMPORTANT
  termId?: string;
}

export function ModuleItem({ id, name, description, numberOfTerms }: Module) {
  const [moduleExpanded, setModuleExpanded] = useState<boolean>(false);

  const form = useForm<ModuleItemType>({
    resolver: zodResolver(ModuleItemSchema),
    defaultValues: {
      moduleName: name,
      moduleDescription: description,
    },
  });

  const onSubmit = async (data: ModuleItemType) => {
    alert(JSON.stringify(data));
  };
  const onClose = () => {
    form.reset();
    setModuleExpanded(false);
  };
  const onDelete = () => {
    alert("Delete");
  };

  return (
    <Fragment>
      <div
        className={cn(
          "w-full p-7 transition-height duration-300 ease-in-out bg-white drop-shadow-l text-spicy_mix rounded-xl flex justify-between",
          !moduleExpanded
            ? " h-20 mb-4 cursor-pointer"
            : " h-72 bg-white drop-shadow-l text-primary-foreground align-middle mb-4 "
        )}
      >
        {!moduleExpanded ? (
          <>
            <div>
              <Link to={id} relative="path">
                <p className="text-2xl font-semibold">{name} </p>
              </Link>
            </div>
            <div className="flex align-middle gap-5">
              <p className="text-xl cursor-default">{numberOfTerms} words</p>
              <EditIcon
                fontSize="large"
                className="self-center cursor-pointer"
                onClick={() => setModuleExpanded(true)}
              />
            </div>
          </>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-2 h-full flex justify-between items-center gap-10"
            >
              <div className="mb-4 flex flex-col gap-3 w-full">
                <FormField
                  control={form.control}
                  name="moduleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Module name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="shadcn"
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
                  name="moduleDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description of the module"
                          className="h-32"
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
        )}
      </div>
    </Fragment>
  );
}
