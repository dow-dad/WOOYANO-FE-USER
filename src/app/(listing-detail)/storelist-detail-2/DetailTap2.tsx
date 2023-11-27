import React, { Fragment, SetStateAction } from 'react'
import { Tab } from '@headlessui/react'
import ButtonSecondary from '@/shared/ButtonSecondary';
import CommentListing from '@/components/CommentListing';




function DetailTap2() {
  
  
  const renderMain = () => {
    return (
  <>
      <Tab.Group>
        <Tab.List className="flex justify-center gap-10 mb-10 w-full">
          
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full flex items-center justify-center focus:outline-none  ${
                  selected
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
                className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none ${
                  selected
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
                <span>
                  Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
                  accommodation, an outdoor swimming pool, a bar, a shared lounge, a
                  garden and barbecue facilities. Complimentary WiFi is provided.
                </span>
                <br />
                <br />
                <span>
                  There is a private bathroom with bidet in all units, along with a
                  hairdryer and free toiletries.
                </span>
                <br /> <br />
                <span>
                  The Symphony 9 Tam Coc offers a terrace. Both a bicycle rental
                  service and a car rental service are available at the accommodation,
                  while cycling can be enjoyed nearby.
                </span>
              </div>
            </div>
            </Tab.Panel>
            <Tab.Panel className="space-y-5">
            <div className="listingSection__wrap">
            {/* HEADING */}
            <h2 className="text-2xl font-semibold">Reviews</h2>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

            {/* Content */}
            <div className="space-y-5 ">
              {/* <FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
              <div className="relative">
                <Input
                  fontClass=""
                  sizeClass="h-16 px-4 py-3"
                  rounded="rounded-3xl"
                  placeholder="Share your thoughts ..."
                />
                <ButtonCircle
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  size=" w-12 h-12 "
                >
                  <ArrowRightIcon className="w-5 h-5" />
                </ButtonCircle>
              </div> */}
            </div>

            {/* comment */}
            <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {/* <CommentListing className="py-8" />
              <CommentListing className="py-8" />
              <CommentListing className="py-8" />
              <CommentListing className="py-8" /> */}
              <div className="pt-8">
                <ButtonSecondary>View more 20 reviews</ButtonSecondary>
              </div>
            </div>
            </div>
            </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>

    )}

  return (
   
      <div className='w-full mb-10'>{renderMain()}</div>
  )
}

export default DetailTap2

// w-full lg:w-4/5 xl:w-2/3 lg:pr-10 