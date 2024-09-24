import { useGetTerms } from "@/api/queries/term.queries";
import { TermDto } from "@/lib/dto/term.dto";
import { useParams } from "react-router-dom";
import { cn } from "@/lib/utils";

type StatusCount = {
  NOT_STARTED: number;
  IN_PROGRESS: number;
  COMPLETED: number;
};

const calculateStatusCount = (terms: TermDto[]): StatusCount => {
  return terms.reduce<StatusCount>(
    (acc, term) => {
      if (term.status === "NOT_STARTED") {
        acc.NOT_STARTED += 1;
      } else if (term.status === "IN_PROGRESS") {
        acc.IN_PROGRESS += 1;
      } else if (term.status === "COMPLETED") {
        acc.COMPLETED += 1;
      }
      return acc;
    },
    {
      NOT_STARTED: 0,
      IN_PROGRESS: 0,
      COMPLETED: 0,
    }
  );
};

export const ProgressComponent = () => {
  const { moduleId } = useParams();

  const {
    data: terms,
    isLoading,
    isSuccess,
  } = useGetTerms({
    moduleId: moduleId || "",
    sortBy: "date_asc",
    searchQuery: "",
  });

  if (isLoading || !isSuccess) {
    return <div>Loading...</div>;
  }
  const statusCount = calculateStatusCount(terms.data);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold w-2/3">Check progress</h1>
      </div>
      <div className="flex justify-between mb-5">
        <div className="w-full h-14 bg-card rounded-lg overflow-hidden flex justify-start drop-shadow-l">
          {
            <div
              style={{
                width: `${(statusCount.COMPLETED / terms.data.length) * 100}%`,
              }}
              className={cn(
                "h-14 bg-learningCompleted",
                "flex justify-center items-center"
              )}
            >
              <p className="text-primary-foreground font-semibold">
                {statusCount.COMPLETED} Completed
              </p>
            </div>
          }
          {
            <div
              style={{
                width: `${
                  (statusCount.IN_PROGRESS / terms.data.length) * 100
                }%`,
              }}
              className={cn(
                "h-14 bg-learningInProgress",
                "flex justify-center items-center"
              )}
            >
              <p className="text-primary-foreground font-semibold">
                {statusCount.IN_PROGRESS} In Progress
              </p>
            </div>
          }
          {
            <div
              style={{
                width: `${
                  (statusCount.NOT_STARTED / terms.data.length) * 100
                }%`,
              }}
              className={cn(
                "h-14 bg-learningNotStarted",
                "flex justify-center items-center"
              )}
            >
              <p className="text-primary-foreground font-semibold">
                {statusCount.NOT_STARTED} Not Started
              </p>
            </div>
          }
        </div>
      </div>
    </div>
  );
};
