"use client";

import { useBearStore } from "@/store/listings";
import { useEffect, useState } from "react";

const HeroSwitch = () => {
  const updateIsSaleListing = useBearStore(
    (state) => state.updateIsSaleListing
  );
  const isSaleListing = useBearStore((state) => state.isSaleListing);
  const [localIsSaleListing, setLocalIsSaleListing] = useState(isSaleListing);

  useEffect(() => {
    setLocalIsSaleListing(isSaleListing);
  }, [isSaleListing]);

  const switchToSale = () => {
    if (!localIsSaleListing) {
      updateIsSaleListing();
    }
  };

  const switchToRent = () => {
    if (localIsSaleListing) {
      updateIsSaleListing();
    }
  };

  return (
    <div className="flex rounded-full bg-white p-1 w-48">
      <button
        onClick={switchToSale}
        className={`flex-1 ${
          localIsSaleListing ? "bg-red-500 text-white" : "text-gray-700"
        } rounded-full py-2 px-4`}
      >
        For Sale
      </button>
      <button
        onClick={switchToRent}
        className={`flex-1 ${
          !localIsSaleListing ? "bg-red-500 text-white" : "text-gray-700"
        } rounded-full py-2 px-4`}
      >
        To Rent
      </button>
    </div>
  );
};

export default HeroSwitch;
