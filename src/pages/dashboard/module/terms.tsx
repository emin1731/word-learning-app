import { useGetTerms } from "@/api/queries/term.queries";
import TermItem from "@/components/dashboard/term-item";
import { TermDto } from "@/lib/dto/term.dto";
import { useParams } from "react-router-dom";

export const TermsComponent = () => {
  const { moduleId } = useParams();
  const { data, isLoading, isSuccess } = useGetTerms({
    moduleId: moduleId || "",
  });

  if (isLoading || !isSuccess) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p className="text-3xl font-semibold text-spicy_mix mb-4 w-2/3">
        All words
      </p>
      <div className="flex flex-col gap-4">
        {data?.data.map((item: TermDto) => {
          return (
            <TermItem
              id={item.id}
              term={item.term}
              definition={item.definition}
              isStarred={item.isStarred}
              learningStatus={item.status}
              key={item.id}
            />
          );
        })}
      </div>
    </div>
  );
};
