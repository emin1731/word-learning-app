import { useGetProfile } from "@/api/queries/user.queries";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { PersonalInfoFlow } from "./flows/personal-info";
import { ChangePasswordFlow } from "./flows/change-password";

interface SettingsLink {
  title: string;
  name: string;
}

export const settingsLinks: SettingsLink[] = [
  {
    title: "Profile",
    name: "profile",
  },
  {
    title: "Password",
    name: "password",
  },
];

{
  /* <div>
          {JSON.stringify(profile?.data)}
          <div className="flex gap-x-5">
            <div className="size-32 bg-muted border rounded-full"></div>
          <div>
            <div className="font-bold">John Doe</div>
            <div className="text-sm text-muted">Hello</div>
          </div>
        </div> */
}

export const ProfilePage = () => {
  const { data: profile, isLoading, error } = useGetProfile();
  const [flow, setFlow] = useState("profile");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;
  return (
    <div>
      <div className="mb-10">
        <div className="flex gap-x-5">
          <div className="size-32 bg-primary border rounded-full"></div>
          <div>
            <div className="text-2xl font-semibold">John Doe</div>
            <div className="text-lg">{profile?.data.username}</div>
            <div className="text-sm text-muted">Hello</div>
          </div>
        </div>
      </div>
      <h1 className="text-3xl font-semibold mb-2">Account settings</h1>
      <div className="flex gap-x-5">
        <div className="w-80 bg-primary text-primary-foreground drop-shadow-l rounded-xl py-8 px-5">
          <nav aria-label="Account Settings">
            <ul className="space-y-2 font-medium">
              {settingsLinks.map((link, index) => (
                <Fragment key={link.name}>
                  <li>
                    <Button
                      onClick={() => setFlow(link.name)}
                      className={cn(
                        "w-full border-none",
                        buttonVariants({ variant: "ghost" }),
                        flow === link.name &&
                          buttonVariants({ variant: "outline" })
                      )}
                    >
                      <span className="ms-3r">{link.title}</span>
                    </Button>
                  </li>
                  {settingsLinks.length !== index + 1 && <hr />}
                </Fragment>
              ))}
            </ul>
          </nav>
        </div>
        <div className="w-full bg-primary text-primary-foreground drop-shadow-l rounded-xl p-10">
          <div className="w-full">
            {flow === "profile" && <PersonalInfoFlow />}
            {flow === "password" && <ChangePasswordFlow />}
          </div>
        </div>
      </div>
    </div>
  );
};
