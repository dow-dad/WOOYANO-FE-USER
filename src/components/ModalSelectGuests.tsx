"use client";

import React, { FC, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "@/shared/ButtonPrimary";
import GuestsInput from "@/app/(client-components)/(HeroSearchForm2Mobile)/GuestsInput";

interface ModalSelectGuestsProps {
  renderChildren?: (p: { openModal: () => void }) => React.ReactNode;
  setServiceItem: React.Dispatch<React.SetStateAction<any>>;
  serviceItem: any
}

const Product = [
  {
    productnum: 11,
    name: "원룸",
    min_time: "2",
    price: 20000
  },
  {
    productnum: 12,
    name: "빌라",
    min_time: "2",
    price: 30000
  },
  {
    productnum: 13,
    name: "아파트",
    min_time: "2",
    price: 40000
  },
  {
    productnum: 14,
    name: "시간추가",
    min_time: "1",
    price: 10000
  }
]

interface productType {
  productnum: number,
  name: string,
  min_time: string,
  price: number
}

const ModalSelectGuests: FC<ModalSelectGuestsProps> = ({ renderChildren,setServiceItem,serviceItem }) => {
  const [showModal, setShowModal] = useState(false);

  // FOR RESET ALL DATA WHEN CLICK CLEAR BUTTON
  //
  function closeModal() {
    setShowModal(false);
  }

  function openModal() {
    setShowModal(true);
  }

  const onChagekItem = (productnum:string, price:number, service_name:string , min_time:string, isChecked:boolean) => {
    if(isChecked){
      const dict={
        productnum:productnum,
        price:price,
        service_name:service_name,
        min_time:min_time
      }
      setServiceItem([...serviceItem,dict])
    }else{
      setServiceItem(serviceItem.filter((item: { productnum: string; })=>item.productnum !== productnum))
    }
    
  }

  const renderService = () => {
    return <div className='mb-2 bg-white rounded-lg dark:bg-background2 h-auto'>
      <p className='text-xl font-semibold mb-2 border-b-1 border-b-slate-200 leading-10 pt-2 pl-2 '>서비스 선택</p>
      <ul className=''>
        {
          Product.map((item: productType) => {
            const productnum=`${item.productnum}`;
            const price=item.price;
            const service_name=`${item.name}`
            const min_time=`${item.min_time}`

            return (
              <li 
              key={item.productnum} 
              className='flex gap-3 w-full border-b-1 border-black h-[100px] py-2'
              
              >
                <div className='pt-6 pl-2'>
                  <input id={`${item.productnum}`} 
                  type="checkbox" 
                  className='w-[30px] h-[30px]' 
                  checked={serviceItem.some((selected: { productnum: string; }) => `${selected.productnum}` === `${item.productnum}`)}
                  onChange={(e)=>onChagekItem(productnum,price,service_name,min_time,e.currentTarget.checked)}
                  />
                </div>
                <div >
                  <p className='text-lg font-semibold'>{item.name}</p>
                  <p className='text-base '>최소시간: {item.min_time}시간</p>
                  <p className='text-lg font-semibold'>{item.price}원</p>
                </div>
              </li>
              )
          })
        }

      </ul>
    </div>
  }

  const renderButtonOpenModal = () => {
    return renderChildren ? (
      renderChildren({ openModal })
    ) : (
      <button onClick={openModal}>Select Service</button>
    );
  };

  return (
    <>
      {renderButtonOpenModal()}
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="HeroSearchFormMobile__Dialog relative z-50"
          onClose={closeModal}
        >
          <div className="fixed inset-0 bg-neutral-100 dark:bg-neutral-900">
            <div className="flex h-[93%] mt-10">
              <Transition.Child
                as={Fragment}
                enter="ease-out transition-transform"
                enterFrom="opacity-0 translate-y-52"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in transition-transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-52"
              >
                <Dialog.Panel className="relative h-full overflow-hidden flex-1 flex flex-col justify-between ">
                  <>
                    <div className="absolute left-4 top-4">
                      <button
                        className="focus:outline-none focus:ring-0"
                        onClick={closeModal}
                      >
                        <XMarkIcon className="w-5 h-5 text-black dark:text-white" />
                      </button>
                    </div>

                    <div className="flex-1 pt-12 p-1 flex flex-col overflow-hidden">
                      <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-neutral-800">
                        <div className="flex-1 flex flex-col transition-opacity animate-[myblur_0.4s_ease-in-out] overflow-auto">
                          <div
                            className={`flex-1 relative flex z-10 overflow-hidden`}
                          >
                            {renderService()}
                            {/* <GuestsInput /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 flex justify-between">
                      <button
                        type="button"
                        className="underline font-semibold flex-shrink-0"
                        onClick={() => {setServiceItem([])}}
                      >
                        Clear data
                      </button>
                      <ButtonPrimary
                        sizeClass="px-6 py-3 !rounded-xl"
                        onClick={() => {
                          closeModal();
                        }}
                      >
                        Save
                      </ButtonPrimary>
                    </div>
                  </>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalSelectGuests;
