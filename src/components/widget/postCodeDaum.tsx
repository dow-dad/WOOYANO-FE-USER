"use client";
import React from "react";
import DaumPostcode from "react-daum-postcode";

function PostCodeDaum({
  isView,
  setIsView,
  setAddressInfo,
}: {
  isView: boolean;
  setIsView: any;
  setAddressInfo: React.Dispatch<React.SetStateAction<any>>;
}) {
  const complete = (data: any) => {
    setAddressInfo(data);
    setIsView(false);
  };

  return (
    <>
      {isView && (
        <div>
          <DaumPostcode autoClose onComplete={complete} />
        </div>
      )}
    </>
  );
}

export default PostCodeDaum;
