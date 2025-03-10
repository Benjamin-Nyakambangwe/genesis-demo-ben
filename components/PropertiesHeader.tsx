"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { List, LayoutGrid } from "lucide-react";
import { useBearStore } from "@/store/listings";

interface BearStore {
  isGrid: boolean;
  updateIsGrid: () => void;
}
interface PropertiesHeaderProps {
  numOfHouses: number;
}

const PropertiesHeader: React.FC<PropertiesHeaderProps> = ({ numOfHouses }) => {
  const updateIsGrid = useBearStore((state: BearStore) => state.updateIsGrid);
  const isGrid = useBearStore((state: BearStore) => state.isGrid);
  const [localIsGrid, setLocalIsGrid] = useState<boolean>(isGrid);

  useEffect(() => {
    setLocalIsGrid(isGrid);
  }, [isGrid]);

  const switchToGrid = (): void => {
    if (!localIsGrid) {
      updateIsGrid();
    }
  };

  const switchToList = (): void => {
    if (localIsGrid) {
      updateIsGrid();
    }
  };

  return (
    <Card className="w-full mb-6">
      <CardContent className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          {/* <div className="flex items-center space-x-4 w-full sm:w-auto">
            <span className="text-sm font-medium">Sort By:</span>
          </div> */}

          <div className="text-sm font-medium w-full sm:w-auto text-center sm:text-left text-[#344E41]">
            <span className="font-bold">{numOfHouses}</span> Search Results
          </div>

          <div className="flex justify-center sm:justify-end w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="mr-2 text-[#344E41] border-[#344E41]"
              onClick={switchToList}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-[#344E41] border-[#344E41]"
              onClick={switchToGrid}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertiesHeader;
