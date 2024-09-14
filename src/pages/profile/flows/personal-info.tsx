import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pen, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ProfileSettingsSchema, ProfileSettingsType } from "../schema";
import { Input } from "@/components/ui/input";
import { useGetProfile } from "@/api/queries/user.queries";
import { ModalDialog } from "@/components/ui/dialog";

export const PersonalInfoFlow = () => {
  const [edit, setEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmCloseOpen, setIsConfirmCloseOpen] = useState(false);

  // const { mutateAsync: changeUsernameMutation } = useChangeUsername();
  // const { mutateAsync: changeEmailMutation } = useChangeEmail();

  const { data: profile } = useGetProfile();
  const { username, email } = profile?.data || {};

  const form = useForm<ProfileSettingsType>({
    resolver: zodResolver(ProfileSettingsSchema),
    mode: "onChange",
    defaultValues: {
      username,
      email,
    },
  });

  // this field required to check if the form is dirty (implicit usage of form.formState.isDirty is not properly working)
  const formUsername = form.watch("username");
  const formEmail = form.watch("email");

  const isDirty = useMemo(() => {
    return formUsername !== username || formEmail !== email;
  }, [formUsername, formEmail, username, email]);

  function onSubmit(data: ProfileSettingsType) {
    alert(JSON.stringify(data));
    // const { username, email } = data;

    // try {
    //   if (username !== form.getValues("username")) {
    //     changeUsernameMutation({ username });
    //     toast({
    //       title: "Username changed successfully",
    //       variant: "default",
    //     });
    //   }

    //   if (email !== form.getValues("email")) {
    //     changeEmailMutation({ newEmail: email });
    //     toast({
    //       title: "Email changed successfully",
    //       variant: "default",
    //     });
    //   }
    // } catch (e: any) {
    //   toast({
    //     title: "Error occurred",
    //     description: e.response.data.message,
    //     variant: "destructive",
    //   });
    // }
  }

  function handleSaveChanges() {
    form.handleSubmit(onSubmit)();
    setIsModalOpen(false);
    setEdit(false);
    form.reset({
      username,
      email,
    });
  }

  // function used to reveal a modal dialog to confirm saving
  function openModal() {
    if (form.formState.isValid) {
      setIsModalOpen(true);
    } else {
      form.trigger();
    }
  }

  // function used to reveal a modal dialog to confirm closing the form
  function handleCancel() {
    if (edit && isDirty) {
      setIsConfirmCloseOpen(true);
    } else {
      setEdit(!edit);
    }
  }

  // function used in modal dialog to discard changes in form
  function discardChanges() {
    form.reset({
      username,
      email,
    });
    setIsConfirmCloseOpen(false);
    setEdit(false);
  }

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h2
          className={cn(
            "text-lg font-semibold",
            !edit && "text-muted-foreground"
          )}
        >
          Profile settings
        </h2>
        <Button
          variant={"outline"}
          className={cn(!edit && "text-muted-foreground")}
          size={"sm"}
          onClick={handleCancel}
        >
          {edit ? <X className="w-5 h-5" /> : <Pen className="w-5 h-5" />}
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={cn(
                    !edit && "text-muted-foreground",
                    "font-semibold md:text-base"
                  )}
                >
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={!edit}
                    placeholder="Enter your username"
                    className="w-full bg-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={cn(
                    !edit && "text-muted-foreground",
                    "font-semibold md:text-base"
                  )}
                >
                  Enter your email address
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={!edit}
                    placeholder="Enter your email address"
                    className="w-full bg-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {edit && (
            <>
              <Button
                type="button"
                variant={"secondary"}
                className="px-10"
                disabled={!isDirty}
                onClick={openModal}
              >
                Submit
              </Button>

              <ModalDialog
                title="Save changes"
                description="Are you sure you want to change your username or password? Note that
                      you will not be able to revert this action."
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                onConfirm={handleSaveChanges}
              />
              <ModalDialog
                isOpen={isConfirmCloseOpen}
                onOpenChange={setIsConfirmCloseOpen}
                title="Discard changes"
                description="Are you sure you want to discard all changes? This action cannot be undone."
                onConfirm={discardChanges}
                onCancel={() => setIsConfirmCloseOpen(false)}
                buttonVariant="destructive"
              />
            </>
          )}
        </form>
      </Form>
    </>
  );
};
