import { useUpdateTerm } from "@/api/queries/term.queries";
import { Button } from "@/components/ui/button";
import { TermDto } from "@/lib/dto/term.dto";
import { Edit, Lightbulb, Star } from "lucide-react";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { useParams } from "react-router-dom";

interface FlashcardProps {
  item: TermDto;
  index: number;
  numberOfTerms: number;
}

export const Flashcard = ({ item, index, numberOfTerms }: FlashcardProps) => {
  const { moduleId } = useParams();
  const [isDefinitionExpanded, setIsDefinitionExpanded] =
    useState<boolean>(false);

  const { mutateAsync: updateTerm } = useUpdateTerm();
  const onStarClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    updateTerm({
      moduleId: moduleId || "",
      termId: item.id,
      term: item.term,
      definition: item.definition,
      isStarred: !item.isStarred,
    });
  };
  const onCardClick = () => {
    setIsDefinitionExpanded(!isDefinitionExpanded);
  };

  const onEditClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    alert("Flashcard edit clicked");
  };

  const onGetHintClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    alert("Get hint clicked");
  };

  return (
    <ReactCardFlip isFlipped={isDefinitionExpanded} flipDirection="horizontal">
      <div
        className="h-96 p-5 bg-card border text-primary-foreground drop-shadow-l rounded-xl  mb-16 mx-44 cursor-pointer"
        onClick={() => onCardClick()}
      >
        <div className="flex justify-between h-full">
          <div className="flex flex-col justify-between text-lg">
            <div>term</div>
            <div>
              {index + 1} of {numberOfTerms}
            </div>
          </div>
          <div className="text-3xl font-semibold block self-center">
            {item.term}
          </div>
          <div className="flex flex-col justify-between items-end text-lg whitespace-nowrap">
            <div className="flex gap-x-1">
              <Button
                variant={"ghost"}
                size={"customIcon"}
                id="flashcard-edit-button"
                className={"h-10 p-2 rounded-full"}
                datatype="button"
                onClick={(e) => onEditClick(e)}
              >
                <Edit size={"20px"} />
              </Button>
              <Button
                variant={"ghost"}
                size={"customIcon"}
                className={"h-10 p-2 rounded-full"}
                onClick={(e) => onStarClick(e)}
              >
                {item.isStarred ? (
                  <Star
                    fontSize="large"
                    className="self-center cursor-pointer text-yellow-400"
                    size={"20px"}
                  />
                ) : (
                  <Star
                    fontSize="large"
                    className="self-center cursor-pointer"
                    size={"20px"}
                  />
                )}
              </Button>
            </div>
            <div className="">
              <Button
                variant={"ghost"}
                size={"customIcon"}
                className={"h-10 flex items-center gap-x-1 rounded-full"}
                onClick={(e) => onGetHintClick(e)}
              >
                <Lightbulb size={"20px"} />
                get a hint
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="h-96 p-5 bg-card border text-primary-foreground drop-shadow-l rounded-xl  mb-16 mx-44 cursor-pointer"
        onClick={() => setIsDefinitionExpanded(!isDefinitionExpanded)}
      >
        <div className="flex justify-between h-full">
          <div className="flex flex-col justify-between text-lg">
            <div>term</div>
            <div>
              {index + 1} of {numberOfTerms}
            </div>
          </div>
          <div className="text-3xl font-semibold block self-center">
            {item.definition}
          </div>
          <div className="flex flex-col justify-between items-end text-lg whitespace-nowrap">
            <div className="flex gap-x-1">
              <Button
                variant={"ghost"}
                size={"customIcon"}
                className={"h-10 p-2 rounded-full"}
              >
                <Edit size={"20px"} />
              </Button>
              <Button
                variant={"ghost"}
                size={"customIcon"}
                className={"h-10 p-2 rounded-full"}
              >
                {item.isStarred ? (
                  <Star
                    fontSize="large"
                    className="self-center cursor-pointer text-yellow-400"
                    size={"20px"}
                  />
                ) : (
                  <Star
                    fontSize="large"
                    className="self-center cursor-pointer"
                    size={"20px"}
                  />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ReactCardFlip>
  );
};
