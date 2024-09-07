import { useGetTerms, useUpdateTerm } from "@/api/queries/term.queries";
import { NewTerm } from "@/components/dashboard/new-term";
import TermItem from "@/components/dashboard/term-item";
import { Button } from "@/components/ui/button";
import { LearningStatus, TermDto } from "@/lib/dto/term.dto";
import { useParams } from "react-router-dom";

export const TermsComponent = () => {
  const { moduleId } = useParams();
  const { mutateAsync: updateTerm } = useUpdateTerm();

  const {
    data: terms,
    isLoading,
    isSuccess,
  } = useGetTerms({
    moduleId: moduleId || "",
  });

  if (isLoading || !isSuccess) {
    return <div>Loading...</div>;
  }

  const resetProgress = async () => {
    if (terms?.data) {
      for (const term of terms.data) {
        await updateTerm({
          moduleId: moduleId || "",
          termId: term.id,
          term: term.term,
          definition: term.definition,
          status: "NOT_STARTED",
        });
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <p className="text-3xl font-semibold text-spicy_mix mb-4 w-2/3">
          All words
        </p>
        <Button
          onClick={resetProgress}
          className="text-base"
          variant={"default"}
        >
          Reset Progress
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {terms?.data.map((item: TermDto) => {
          return (
            <TermItem
              id={item.id}
              term={item.term}
              definition={item.definition}
              isStarred={item.isStarred}
              learningStatus={item.status as LearningStatus}
              key={item.id}
            />
          );
        })}
        <NewTerm />
      </div>
    </div>
  );
};
