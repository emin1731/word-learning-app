import { Button, buttonVariants } from "@/components/ui/button";
import { TermDto } from "@/lib/dto/term.dto";
import { cn } from "@/lib/utils";
import { Edit, Lightbulb, Star } from "lucide-react";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";

interface FlashcardProps {
  item: TermDto;
  index: number;
  numberOfTerms: number;
}

export const Flashcard = ({ item, index, numberOfTerms }: FlashcardProps) => {
  const [isDefinitionExpanded, setIsDefinitionExpanded] =
    useState<boolean>(false);
  return (
    <ReactCardFlip isFlipped={isDefinitionExpanded} flipDirection="horizontal">
      <div
        className="h-96 p-5 bg-primary text-primary-foreground drop-shadow-l rounded-xl  mb-16 mx-44 cursor-pointer"
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
            {item.term}
          </div>
          <div className="flex flex-col justify-between items-end text-lg whitespace-nowrap">
            <div className="flex gap-x-1">
              <Button
                className={cn(
                  buttonVariants({ variant: "ghost", size: "customIcon" }),
                  "h-10 p-2 rounded-full"
                )}
              >
                <Edit size={"20px"} />
              </Button>
              <Button
                className={cn(
                  buttonVariants({ variant: "ghost", size: "customIcon" }),
                  "h-10 p-2 rounded-full"
                )}
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
                className={cn(
                  buttonVariants({ variant: "ghost", size: "customIcon" }),
                  "h-10 flex items-center gap-x-1 rounded-full"
                )}
              >
                <Lightbulb size={"20px"} />
                get a hint
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="h-96 p-5 bg-primary text-primary-foreground drop-shadow-l rounded-xl  mb-16 mx-44 cursor-pointer"
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
                className={cn(
                  buttonVariants({ variant: "ghost", size: "customIcon" }),
                  "h-10 p-2 rounded-full"
                )}
              >
                <Edit size={"20px"} />
              </Button>
              <Button
                className={cn(
                  buttonVariants({ variant: "ghost", size: "customIcon" }),
                  "h-10 p-2 rounded-full"
                )}
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
