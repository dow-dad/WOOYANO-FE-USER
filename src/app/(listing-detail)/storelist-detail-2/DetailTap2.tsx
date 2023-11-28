import React, { Fragment, SetStateAction } from 'react'
import { Tab } from '@headlessui/react'
import ButtonSecondary from '@/shared/ButtonSecondary';
import CommentListing from '@/components/CommentListing';
import { StoreInfoType } from '@/types/house-keeper-detail/storeInfoType';
import { ReviewDataType } from '@/types/house-keeper-detail/reviewDataType';




function DetailTap2({ storeInfo,reviewData }: { storeInfo: StoreInfoType,reviewData: ReviewDataType[]}) {


  const renderMain = () => {
    return (
      <>
        <Tab.Group>
          <Tab.List className="flex justify-center gap-10 mb-10 w-full">

            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full flex items-center justify-center focus:outline-none  ${selected
                    ? "bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900"
                    : " text-neutral-6000 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    }`}
                >
                  <span className="mr-2.5">업체 정보</span>
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none ${selected
                    ? "bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900"
                    : "text-neutral-6000 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    }`}
                >
                  리뷰
                </button>
              )}
            </Tab>
          </Tab.List>

          <Tab.Panels className="min-w-full">
            <Tab.Panel className="space-y-5">
              <div className="listingSection__wrap">
                <h2 className="text-2xl font-semibold">업체 정보</h2>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                <div className="text-neutral-6000 dark:text-neutral-300">
                  <div>
                    <div className='font-semibold text-2xl text-black'>
                      업체 소개
                    </div>
                    <div>
                      {storeInfo.description}
                    </div>
                  </div>

                  <div className='mt-5'>
                    <div className='font-semibold text-2xl text-black'>
                      영업정보
                    </div>
                    <div>
                      업체명:{storeInfo.name}
                    </div>
                    <div>
                      서비스 가능지역:{storeInfo.serviceAreaList[0] === 26500 ? "부산" : "전국"}
                    </div>
                  </div>

                  <div className='mt-5'>
                    <div className='font-semibold text-2xl text-black'>
                      사업자정보
                    </div>
                    <div>
                      상호명:{storeInfo.name}
                    </div>
                    <div>
                      사업자주소:{storeInfo.clientAddress}
                    </div>
                    <div>
                      사업자번호:{storeInfo.registrationNumber}
                    </div>
                  </div>

                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel className="space-y-5">
              <div className="listingSection__wrap">
                {/* HEADING */}
                <h2 className="text-2xl font-semibold">리뷰</h2>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

                {/* review */}
                <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {
                    reviewData.map((item: ReviewDataType, idx) => (
                      <CommentListing key={idx} className="py-8" reviewData={item} />
                    ))}
                  {/*               
              <CommentListing className="py-8" />
              <CommentListing className="py-8" />
              <CommentListing className="py-8" /> */}
                  {/* <div className="pt-8">
                <ButtonSecondary>View more 20 reviews</ButtonSecondary>
              </div> */}
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </>

    )
  }

  return (

    <div className='w-full mb-10'>{renderMain()}</div>
  )
}

export default DetailTap2

// w-full lg:w-4/5 xl:w-2/3 lg:pr-10 