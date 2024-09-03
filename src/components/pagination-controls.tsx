import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  firstItemIndex: number;
  lastItemIndex: number;
  totalItems: number;
  onNext: () => void;
  onPrevious: () => void;
  onFirst: () => void;
  onLast: () => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  firstItemIndex,
  lastItemIndex,
  totalItems,
  onNext,
  onPrevious,
  onFirst,
  onLast,
}) => {
  return (
    <div className="relative mt-4 flex items-center justify-between gap-4">
      <div className="absolute left-1/2 flex -translate-x-1/2 transform gap-4">
        <div className="flex gap-2">
          {/* Go to First Page */}
          <Button
            className="h-fit w-full md:w-auto"
            variant="outline"
            onClick={onFirst}
            disabled={currentPage === 1}
          >
            <ChevronsLeft size={16} />
          </Button>

          {/* Go to Previous Page */}
          <Button
            className="h-fit w-full md:w-auto"
            variant="outline"
            onClick={onPrevious}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </Button>
        </div>

        <div className="flex gap-2">
          {/* Go to Next Page */}
          <Button
            className="h-fit w-full md:w-auto"
            variant="outline"
            onClick={onNext}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} />
          </Button>

          {/* Go to Last Page */}
          <Button
            className="h-fit w-full md:w-auto"
            variant="outline"
            onClick={onLast}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight size={16} />
          </Button>
        </div>
      </div>
      <div className="flex flex-1 justify-end">
        <p className="mb-4 text-xs italic">
          Showing {firstItemIndex + 1} -{" "}
          {lastItemIndex > totalItems ? totalItems : lastItemIndex} of{" "}
          {totalItems} items
        </p>
      </div>
    </div>
  );
};

export default PaginationControls;
