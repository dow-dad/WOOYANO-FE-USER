"use client";

import DatePicker from "react-datepicker";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { FC, Fragment, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Calendar from 'react-calendar';
import moment from 'moment';


interface ModalSelectDateProps {
  renderChildren?: (p: { openModal: () => void }) => React.ReactNode;
  setTime: React.Dispatch<React.SetStateAction<string>>;
  time: string;
}

const ModalSelectDate: FC<ModalSelectDateProps> = ({ renderChildren, setTime, time }) => {
  const [showModal, setShowModal] = useState(false);

  // 백엔드에서 서비스 가능 시간 데이터
  const availableTimes = ['11:00', '13:00','18:00'];
  // 9시부터 18시까지 배열 만들기
  const hours = Array.from({ length: 10 }, (_, index) => index + 9);


  const onChangeTime = (times: string) => {
    const time = times;
    setTime(time)
  };

  const renderTime = () => {
    return <div className='mb-4 p-2 gap-1'>
      {/* 오전오후를 map으로 만든다. */}
      {['오전', '오후'].map((period) => (
        <div key={period}>
          <p className="text-[20px] mt-4 font-extrabold">{period}</p>
          <ul className='flex flex-row flex-wrap min-w-[300px] gap-2'>
            {hours
              .filter((hour) => (period === '오전' ? hour < 12 : hour >= 12))
              .map((hour) => {
                const time = `${hour}:00`;
                // 데이터가 있으면? true 반환
                const isAvailable = availableTimes.includes(time);

                return (
                  <li key={hour} id={`${hour}:00`} className='w-[23%] pt-3'>
                    {/* isAvailable이 true면 클릭 가능 false면 클릭 불가능 */}
                    <button
                      className={`border rounded-lg w-full leading-[48px] ${isAvailable ? 'border-slate-400 hover:bg-slate-50 focus:bg-slate-200' : 'border-gray-500 bg-gray-200 text-gray-600 cursor-not-allowed'
                        }`}
                      onClick={() => onChangeTime(time)}
                      disabled={!isAvailable}
                    >
                      {hour}:00
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      ))}
    </div>
  }

  // FOR RESET ALL DATA WHEN CLICK CLEAR BUTTON
  // 
  function closeModal() {
    setShowModal(false);
  }

  function openModal() {
    setShowModal(true);
  }

  const renderButtonOpenModal = () => {
    return renderChildren ? (
      renderChildren({ openModal })
    ) : (
      <button onClick={openModal}>Select Time</button>
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
              // enter="ease-out duration-300"
              // enterFrom="opacity-0 "
              // enterTo="opacity-100 "
              // leave="ease-in duration-200"
              // leaveFrom="opacity-100 "
              // leaveTo="opacity-0 "
              >
                <Dialog.Panel className="relative h-full overflow-hidden flex-1 flex flex-col">
                  <>
                    <div className="absolute left-4 top-4">
                      <button
                        className="focus:outline-none focus:ring-0"
                        onClick={closeModal}
                      >
                        <XMarkIcon className="w-5 h-5 text-black dark:text-white" />
                      </button>
                    </div>

                    <div className="flex-1 pt-12 p-1 flex flex-col overflow-auto">
                      <div className="flex-1 flex flex-col bg-white dark:bg-neutral-800">
                        <div className="flex-1 flex flex-col transition-opacity animate-[myblur_0.4s_ease-in-out] overflow-auto ">
                          <div className="p-5 ">
                            <span className="block font-semibold text-xl sm:text-2xl">
                              {` 언제 서비스를 원하시나요? `}
                            </span>
                          </div>
                          <div className="flex-1 relative flex z-10 ">
                            <div className="overflow-hidden rounded-3xl ">

                              {renderTime()}

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 flex justify-between">
                      <button
                        type="button"
                        className="underline font-semibold flex-shrink-0"
                        onClick={() => {
                          onChangeTime("");
                        }}
                      >
                        Clear dates
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

export default ModalSelectDate;
