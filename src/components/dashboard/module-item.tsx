import { cn } from "@/lib/utils";
import { EditIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

export interface Module {
  id: string;
  name: string;
  description: string;
  numberOfTerms: number;
  //   terms: Term[];
  // date: number;
  moduleId?: string; // IMPORTANT
}

export interface Term {
  id: string;
  term: string;
  definition: string;
  //   learningStatus: LearningStatus;
  starred: boolean;
  options?: string[];
  moduleId?: string; // IMPORTANT
  termId?: string;
}

function ModuleItem({ id, name, description, numberOfTerms }: Module) {
  const [moduleExpanded, setModuleExpanded] = useState<boolean>(true);
  //   const editModuleDescription = useInput(description);
  //   const dispatch = useAppDispatch();
  //   useEffect(() => {
  //     console.log("EFFECT");
  //   }, []);
  //   const handleClick = () => {
  //     setModuleExpanded(!moduleExpanded);
  //     console.log("EDIT CLICK TEST");
  //   };
  //   const handleEdit = () => {
  //     setModuleExpanded(true);
  //     dispatch(
  //       editModule({
  //         id: stringToId(editModuleName.value),
  //         name: editModuleName.value,
  //         description: editModuleDescription.value,
  //         numberOfTerms,
  //         terms,
  //         moduleId: id,
  //       })
  //     );
  //     console.log("EDITED");
  //   };
  //   const handleCancel = () => {
  //     setModuleExpanded(true);
  //     editModuleName.clearInput();
  //     editModuleDescription.clearInput();
  //   };
  return (
    <Fragment>
      <div
        className={cn(
          "w-full p-7 transition-height duration-300 ease-in-out bg-white drop-shadow-l text-spicy_mix rounded-xl ",
          moduleExpanded
            ? " h-20 flex justify-between"
            : " h-60 bg-white drop-shadow-l text-spicy_mix align-middle"
        )}
      >
        {
          moduleExpanded ? (
            <>
              <Link to={id} relative="path">
                <p className="text-2xl font-semibold">{name} </p>
              </Link>
              <div className="flex align-middle gap-5">
                <p className="text-xl cursor-default">{numberOfTerms} words</p>
                <EditIcon
                  fontSize="large"
                  className="self-center cursor-pointer"
                  onClick={() => setModuleExpanded(false)}
                />
              </div>
            </>
          ) : (
            <form className=" flex justify-between">
              <div className="mb-4 flex flex-col gap-3 w-full mr-10">
                <label className="block text-2xl font-semibold">
                  Edit module
                </label>
                <input
                  className="block appearance-none bg-lavender_blush placeholder-spicy_mix rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Write name of the module"
                  value={name}
                />
                <textarea
                  className="block h-20 appearance-none bg-lavender_blush placeholder-spicy_mix rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline"
                  id="TODO"
                  placeholder="Write description of the module"
                  value={description}
                ></textarea>
              </div>
              <button className="block h-10 w-36 py-2 self-end" type="button">
                Delete
              </button>
              <button
                className="block h-10 w-44 py-2 self-end"
                type="button"
                onClick={() => setModuleExpanded(true)}
              >
                Cancel
              </button>
              <button
                className="block h-10 appearance-none bg-serenade rounded w-44 py-2 px-3 self-end"
                type="button"
              >
                Edit
              </button>
            </form>
          )
          // </div>
        }
      </div>
    </Fragment>
  );
}

export default ModuleItem;
