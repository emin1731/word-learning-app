import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginType } from "./schema";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Logo from "@/components/common/logo";
import LoginImg from "@/assets/login-page.png";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "@/api/queries/auth.queries";

export default function LoginPage() {
  const { mutateAsync: login, isPending } = useLogin();

  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: LoginType) => {
    try {
      const res = await login(data);
      // console.log("Login Response:", res); // Check the structure here
      if (res.ok) navigate("/dashboard");

      // if (res.ok) {
      //   alert(`Login successful: ${res.data.accessToken}`);
      //   console.log(res.data);
      // }
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message || "An error occurred");
      }
    }
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex md:items-center justify-between py-16 md:py-0 md:bg-background">
      <div className="relative w-full flex flex-col md:min-h-screen md:w-1/2 px-6 md:p-6 lg:p-26 lg:px-24">
        <div className="md:absolute md:top-5 md:left-5 flex justify-center md:justify-end mb-10">
          <Logo className="w-32 md:w-20" />
        </div>
        <div className="flex-1 w-full flex items-center justify-center">
          <Form {...form}>
            <form
              className="w-full flex flex-col h-full justify-start md:justify-between"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-5 justify-center">
                <h1 className="text-3xl md:text-4xl text-center font-semibold">
                  Log In
                </h1>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold md:text-base">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          className="w-full bg-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-1">
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
                </div>
                <div className="flex justify-between">
                  <Button
                    type="submit"
                    className={cn(
                      buttonVariants({ variant: "secondary" }),
                      "px-10"
                    )}
                  >
                    Login
                  </Button>
                  <Link
                    to="/reset-password"
                    className={buttonVariants({ variant: "link" })}
                  >
                    Forgot password
                  </Link>
                </div>

                <div className="text-center mt-6 ">
                  <a
                    href="/auth/register"
                    className={cn(buttonVariants({ variant: "link" }))}
                  >
                    <div>Don't have an account?</div>
                  </a>
                </div>
              </div>
              <div />
            </form>
          </Form>
        </div>
      </div>
      <div className="hidden  h-screen w-1/2 items-center justify-center md:flex">
        <img src={LoginImg} alt="Login" className=" rounded-l-10xl h-full" />
      </div>
    </div>
  );
}
