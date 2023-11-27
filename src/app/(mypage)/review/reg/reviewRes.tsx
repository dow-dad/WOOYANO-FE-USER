'use client'
import { ReviewType } from "@/types/ReviewType";
import React, { FC, useState } from "react";

export interface PageAddListing5Props {
  setReviewData: React.Dispatch<React.SetStateAction<ReviewType>>;
  reviewData:ReviewType;
}

const ReviewRes: FC<PageAddListing5Props> = ({ setReviewData, reviewData }) => {

  const handleRadioChange = (checked: boolean) => {
    setReviewData({
      ...reviewData,
      reuse: checked
    });
  };
  

  const renderRadio = (
    name: string,
    id: string,
    label: string,
    checked:boolean,
    defaultChecked?: boolean
  ) => {
    return (
      <div className="flex items-center">
        <input
          defaultChecked={defaultChecked}
          id={id + name}
          name={name}
          type="radio"
          className="focus:ring-primary-500 h-6 w-6 text-primary-500 border-neutral-300 !checked:bg-primary-500 bg-transparent"
          onClick={()=>handleRadioChange(checked)}
        />
        <label
          htmlFor={id + name}
          className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {label}
        </label>
      </div>
    );
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">
          리뷰 작성{" "}
        </h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          서비스는 어떠셨나요?
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        <div>
          <div className="flex flex-col gap-2">
            <p>
              남겨주신 의견은 다른 고객님께 도움이 됩니다❤
            </p>
            <label className="text-lg font-semibold" htmlFor="">
              서비스를 평가해주세요.
            </label>
          </div>
          
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {renderRadio("res", "다음에도 이용할게요:)", "다음에도 이용할게요:)" ,true)}
            {renderRadio("res", "이번에만 이용할게요:(", "이번에만 이용할게요:(",false)}
          </div>
        </div>
      </div>
    </>
  );
};

// const [selectOption, setSelectOption] = useState("다음에도 이용할게요:)")

// const handleRadioChange = (e:React.ChangeEvent<HTMLInputElement>) => {
//   const selectValue = e.target.value;
//   setSelectOption(selectValue);
//   postData(selectValue);
// }

// const jwt="eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsInN1YiI6ImFiY2QxMjM0QGdtYWlsLmNvbSIsImlhdCI6MTcwMDEyMzExNywiZXhwIjoxNzAwMTI2NzE3fQ.T86ZcvgzcL4kfzjnDAXD1p4yJsNPknb9JBOBAbvQBlQ"

// const postData = async(selectedRes: string) => {
//   try {
//     const response = await fetch(`http://3.35.62.185:8000/api/v1/review/bookmark`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "email":"abcd1234@gmail.com",
//         "Authorization": `Bearer ${jwt}`
//       },
//       body: JSON.stringify({ res: selectedRes }),
//     })
//     if (!response.ok) {
//       const errorMessage = await response.text(); // 응답에서 자세한 오류 메시지 가져오기
//       throw new Error(`상태 ${response.status}로 요청이 실패했습니다: ${errorMessage}`);
//     }
//     const data = await response.json();
//     console.log('성공', data);
//   } catch (error){
//     console.log('실패', error)
//   }
// }


// const PageAddListing5: FC<PageAddListing5Props> = () => {
//   // const renderRadio = (id, label, value) => (
//   //   <label key={id} className="block">
//   //     <input
//   //       type="radio"
//   //       id={`${id}-${value}`}
//   //       value={value}
//   //       checked={selectOption === value}
//   //       onChange={handleRadioChange}
//   //     />
//   //     {label}
//   //   </label>
//   // );
//   const renderRadio = (
//     name: string,
//     id: string,
//     label: string,
//     defaultChecked?: boolean
//   ) => {
//     return (
//       <div className="flex items-center">
//         <input
//           defaultChecked={defaultChecked}
//           id={id + name}
//           name={name}
//           type="radio"
//           className="focus:ring-primary-500 h-6 w-6 text-primary-500 border-neutral-300 !checked:bg-primary-500 bg-transparent"
//         />
//         <label
//           htmlFor={id + name}
//           className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
//         >
//           {label}
//         </label>
//       </div>
//     );
//   };

//   const renderNoInclude = (text: string) => {
//     return (
//       <div className="flex items-center justify-between py-3">
//         <span className="text-neutral-6000 dark:text-neutral-400 font-medium">
//           {text}
//         </span>
//         <i className="text-2xl text-neutral-400 las la-times-circle hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer"></i>
//       </div>
//     );
//   };

  

//   return (
//     <>
//       <div>
//         <h2 className="text-2xl font-semibold">
//           리뷰 작성{" "}
//         </h2>
//         <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
//           서비스는 어떠셨나요?
//         </span>
//       </div>
//       <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
//       {/* FORM */}
//       <div className="space-y-8">
//         {/* ITEM */}
//         <div>
//           <div className="flex flex-col gap-2">
//             <p>
//               남겨주신 의견은 다른 고객님께 도움이 됩니다❤
//             </p>
//             <label className="text-lg font-semibold" htmlFor="">
//               서비스를 평가해주세요.
//             </label>
//           </div>
          
//           <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//             {renderRadio("res", "다음에도 이용할게요:)", "다음에도 이용할게요:)")}
//             {renderRadio("res", "이번에만 이용할게요:(", "이번에만 이용할게요:(")}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

export default ReviewRes;


