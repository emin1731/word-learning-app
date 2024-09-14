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
// import { useToast } from '@/components/ui/use-toast';

import { PasswordSettingsSchema, PasswordSettingsType } from "../schema";
import { Input } from "@/components/ui/input";
import { ModalDialog } from "@/components/ui/dialog";

export const ChangePasswordFlow = () => {
  // const { mutateAsync: changePassword } = useChangePassword();

  const [edit, setEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmCloseOpen, setIsConfirmCloseOpen] = useState(false);

  const form = useForm<PasswordSettingsType>({
    resolver: zodResolver(PasswordSettingsSchema),
    mode: "onChange",
  });

  // this field required to check if the form is dirty (implicit usage of form.formState.isDirty is not properly working)
  const formOldPassword = form.watch("oldPassword");
  const formPassword = form.watch("password");
  const formConfirmPassword = form.watch("confirmPassword");

  const isDirty = useMemo(() => {
    return formOldPassword && formPassword && formConfirmPassword;
  }, [formOldPassword, formPassword, formConfirmPassword]);

  const onSubmit = async (data: PasswordSettingsType) => {
    alert(JSON.stringify(data));
    // try {
    //   const res = await changePassword(data);
    //   if (res.ok) {
    //     toast({
    //       title: "Password changed successfully",
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
  };

  function handleSaveChanges() {
    form.handleSubmit(onSubmit)();
    setIsModalOpen(false);
    setEdit(false);
    form.reset({
      password: "",
      oldPassword: "",
      confirmPassword: "",
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
  function confirmDiscardChanges() {
    form.reset({
      password: "",
      oldPassword: "",
      confirmPassword: "",
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
          Change Password
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
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      !edit && "text-muted-foreground",
                      "font-semibold md:text-base"
                    )}
                  >
                    Old Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={!edit}
                      placeholder={
                        edit ? "Enter your old password" : "********"
                      }
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold md:text-base">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
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
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold md:text-base">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          className="w-full bg-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {edit && (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => openModal()}
                  className="px-10"
                  disabled={!isDirty}
                >
                  Submit
                </Button>
                <ModalDialog
                  title="Change password"
                  description="Are you sure you want to change your password? Note that you will not be able to revert this action."
                  isOpen={isModalOpen}
                  onOpenChange={setIsModalOpen}
                  onConfirm={handleSaveChanges}
                />

                <ModalDialog
                  isOpen={isConfirmCloseOpen}
                  onOpenChange={setIsConfirmCloseOpen}
                  title="Discard changes"
                  description="Are you sure you want to discard all changes? This action cannot be undone."
                  onConfirm={confirmDiscardChanges}
                  onCancel={() => setIsConfirmCloseOpen(false)}
                  buttonVariant="destructive"
                />
              </>
            )}
          </form>
        </Form>
      </div>
    </>
  );
};
