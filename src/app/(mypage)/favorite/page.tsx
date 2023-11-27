"use client";

import StayCard from "@/components/StayCard";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import React from "react";


const AccountSavelists = () => {

  const renderSection1 = () => {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">찜 목록</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div>
          <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {DEMO_STAY_LISTINGS.filter((_, i) => 15 <i && i < 24).map((stay) => (
              <StayCard key={stay.id} data={stay} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return renderSection1();
};

export default AccountSavelists;
