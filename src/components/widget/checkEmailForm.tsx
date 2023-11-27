import React from "react";

interface CheckEmailFormProps {
  checked: boolean;
}

export default function CheckEmailForm({ checked }: CheckEmailFormProps) {
  return (
    <div className="text-[18px]">
      {checked ? <p className="text-blue-600">&#10004;</p>
       : <p className="hidden">&#10004;</p>}
    </div>
  );
}
