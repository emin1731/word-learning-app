import { TermDto } from "@/lib/dto/term.dto";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface LearningCardProps {
  item: TermDto;
  index: number;
  numberOfTerms: number;
  allTerms: TermDto[];
}

export const LearningCard = ({
  item,
  index,
  numberOfTerms,
  allTerms,
}: LearningCardProps) => {
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const getOptions = () => {
      const otherDefinitions = allTerms
        .filter((term) => term.id !== item.id)
        .map((term) => term.definition);

      const incorrectOptions = shuffleArray(otherDefinitions).slice(0, 3);
      const options = shuffleArray([item.definition, ...incorrectOptions]);

      return options;
    };

    setOptions(getOptions()); // Set options only once
  }, [item, allTerms]);

  const shuffleArray = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  //   const getOptions = () => {
  //     const otherDefinitions = allTerms
  //       .filter((term) => term.id !== item.id)
  //       .map((term) => term.definition);

  //     const incorrectOptions = shuffleArray(otherDefinitions).slice(0, 3);
  //     const options = shuffleArray([item.definition, ...incorrectOptions]);

  //     return options;
  //   };

  const handleOptionClick = (option: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option);
    setIsCorrect(option === item.definition);
  };

  return (
    <div className="h-128 p-10 px-20 bg-primary text-primary-foreground drop-shadow-l rounded-xl mx-10 flex flex-col justify-between">
      <div>
        <div className="text-xl font-semibold flex justify-between mb-4">
          <div>term</div>
          <div>
            {index + 1} of {numberOfTerms}
          </div>
        </div>
        <div className="text-3xl font-semibold">{item.term}</div>
      </div>
      <div>
        {selectedAnswer && (
          <div className="mb-4">
            {isCorrect ? (
              <p className="text-correct-foreground">Correct!</p>
            ) : (
              <p className="text-incorrect-foreground">
                Incorrect. The correct answer is: {item.definition}
              </p>
            )}
          </div>
        )}
        <div className="h-0.5 bg-background"></div>
        <div className="text-xl font-semibold my-2">answers</div>
        <div className="grid grid-rows-2 grid-cols-2 gap-3">
          {options.map((item, index) => {
            return (
              <div
                className={cn(
                  "bg-background text-primary-foreground rounded-xl p-5 px-8 border border-background transition-colors delay-75 ease-out cursor-default",
                  !selectedAnswer &&
                    "hover:border-primary-foreground hover:border cursor-pointer",
                  selectedAnswer === item
                    ? isCorrect
                      ? "bg-correct"
                      : "bg-incorrect"
                    : ""
                )}
                onClick={() => handleOptionClick(item)}
              >
                <div className="flex justify-between items-center gap-x-3">
                  <div className="text-lg">item {item}</div>
                  <div className="bg-primary size-7 flex justify-center items-center rounded-full">
                    {index + 1}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
