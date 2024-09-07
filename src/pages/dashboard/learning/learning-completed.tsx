import { useUpdateTerm } from "@/api/queries/term.queries";
import { Button, buttonVariants } from "@/components/ui/button";
import { TermDto } from "@/lib/dto/term.dto";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export const LearningCompleted = ({ terms }: { terms: TermDto[] }) => {
  const { moduleId } = useParams();
  const { mutateAsync: updateTerm } = useUpdateTerm();
  const onStar = async () => {};

  return (
    <div className="w-3/4 space-y-4 mx-auto">
      <h1 className="text-2xl font-semibold text-center text-primary-foreground pb-1">
        Congratulations! You have completed the module.
      </h1>
      <div>
        <div className="h-0.5 bg-primary-foreground"></div>
        <p className="text-lg mt-2">Terms studies in this module: </p>
      </div>

      {terms.map((item: TermDto) => (
        <div className="w-full p-1 px-10 relative transition-height duration-300 ease-in-out bg-primary drop-shadow-l text-spicy_mix rounded-xl flex justify-between items-center h-16 ">
          <div className="flex justify-start gap-20">
            <p className="text-xl font-semibold my-4 min-w-36">{item.term}</p>
            <div className=" w-0.5 bg-muted"></div>
            <p className="text-xl font-semibold my-4">{item.definition}</p>
          </div>
          <div className="flex ">
            <div onClick={onStar}>
              <Button
                onClick={async () => {
                  await updateTerm({
                    moduleId: moduleId || "",
                    termId: item.id,
                    isStarred: !item.isStarred,
                    term: item.term,
                    definition: item.definition,
                  });
                }}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "customIcon" }),
                  "h-10 p-2"
                )}
              >
                {item.isStarred ? (
                  <Star
                    fontSize="large"
                    className="self-center cursor-pointer text-yellow-400"
                  />
                ) : (
                  <Star
                    fontSize="large"
                    className="self-center cursor-pointer"
                  />
                )}
              </Button>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-center">
        <Link to={`/dashboard/${moduleId}`}>
          <Button className="text-base mt-2" size="lg" variant="secondary">
            Go back to module
          </Button>
        </Link>
      </div>
    </div>
  );
};
