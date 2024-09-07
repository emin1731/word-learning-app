import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Fragment } from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="text-center mb-20 pt-52 bg-background">
      <h1 className="text-5xl font-bold  pb-4 mb-5">Oops!</h1>
      <p className="text-3xl font-semibold pb-4 mb-5">
        Sorry, page is not found
      </p>
      <Link to={"/dashboard"}>
        <Button className={cn(buttonVariants({ variant: "secondary" }))}>
          Go to dashboard
        </Button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
