import { TermDto } from "@/lib/dto/term.dto";
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
        className="h-80 p-5 bg-primary text-primary-foreground drop-shadow-l rounded-xl  mb-16 mx-44 cursor-pointer"
        onClick={() => setIsDefinitionExpanded(!isDefinitionExpanded)}
      >
        <div className="flex justify-between h-full">
          <div className="text-xl font-semibold block">term</div>
          <div className="text-3xl font-semibold block self-center">
            {item.term}
          </div>
          <div className="text-xl font-semibold whitespace-nowrap">
            {index + 1} of {numberOfTerms}
          </div>
        </div>
      </div>
      <div
        className="h-80 p-5 bg-primary text-primary-foreground drop-shadow-l rounded-xl  mb-16 mx-44 cursor-pointer"
        onClick={() => setIsDefinitionExpanded(!isDefinitionExpanded)}
      >
        <div className="flex justify-between h-full">
          <div className="text-xl font-semibold block">definition</div>
          <div className="text-3xl font-semibold block self-center">
            {item.definition}
          </div>
          <div className="text-xl font-semibold whitespace-nowrap">
            {index + 1} of {numberOfTerms}
          </div>
        </div>
      </div>
    </ReactCardFlip>
  );
};
