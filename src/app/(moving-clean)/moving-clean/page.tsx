import SectionGridFilterCard from "@/app/(stay-listings)/SectionGridFilterCard";
import React, { FC } from "react";


export interface ListingStayPageProps {}

const ListingStayPage: FC<ListingStayPageProps> = () => {
  return <SectionGridFilterCard className="container pb-24 lg:pb-28" />;
};

export default ListingStayPage;