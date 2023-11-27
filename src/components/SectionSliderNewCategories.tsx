"use client";

import React, { FC, useEffect, useState } from "react";
import { TaxonomyType } from "@/data/types";
import CardCategory3 from "@/components/CardCategory3";
import CardCategory4 from "@/components/CardCategory4";
import CardCategory5 from "@/components/CardCategory5";
import Heading from "@/shared/Heading";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import PrevBtn from "./PrevBtn";
import NextBtn from "./NextBtn";
import { variants } from "@/utils/animationVariants";
import { useWindowSize } from "react-use";
import GetSession from "@/app/GetSession";
import { useSession } from "next-auth/react";
import ErrorAlert from "./error/Swal";
import ErrorFunction from "@/app/ErrorFun";
import { ResentServiceImg } from "@/types/mainpage/resentServiceImg";

export interface SectionSliderNewCategoriesProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
  // categories?: TaxonomyType[];
  categoryCardType?: "card3" | "card4" | "card5";
  itemPerRow?: 4 | 5;
  sliderStyle?: "style1" | "style2";
}



const SectionSliderNewCategories: FC<SectionSliderNewCategoriesProps> = ({
  heading = "최근 받은 서비스",
  subHeading = "최근 받은 서비스",
  className = "",
  itemClassName = "",
  // categories = DEMO_CATS,
  itemPerRow = 5,
  categoryCardType = "card5",
  sliderStyle = "style1",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [numberOfItems, setNumberOfitem] = useState(0);
  const [recentService, setRecentService] = useState<any>([]);

  const session = useSession();
  const usertoken = session.data?.user.result.token;
  const useremail = session.data?.user.result.email;

  const getRecentService = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reservation/recent`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usertoken}`,
        Email: `${useremail}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      // console.log("data:", data);
      return data;
    } else {
      ErrorFunction("최근 서비스를 불러오지 못했습니다.");
    }
  };

  const getRecentServiceImg = async (index:number) => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/client/user/recent/${index}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usertoken}`,
        Email: `${useremail}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      // console.log(data);
      return data;
    } else {
      ErrorFunction("이미지를 불러오지 못했습니다.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recentServiceResponse = await getRecentService();

        // 확인: recentServiceResponse가 정상적인 응답을 반환하는지 체크
        if (recentServiceResponse && recentServiceResponse.result) {
          const { serviceIdList } = recentServiceResponse.result;

          if (serviceIdList && serviceIdList.length) {
            const serviceDetailsPromises = serviceIdList.map(async (serviceId: number) => {
              try {
                const serviceDetailsResponse = await getRecentServiceImg(serviceId);
                // 확인: serviceDetailsResponse가 정상적인 응답을 반환하는지 체크
                if (serviceDetailsResponse && serviceDetailsResponse.result) {
                  return serviceDetailsResponse.result;
                } else {
                  console.error('Error fetching service details:', serviceDetailsResponse);
                  return null; // 또는 다른 기본값 설정
                }
              } catch (error) {
                console.error('Error fetching service details:', error);
                return null; // 또는 다른 기본값 설정
              }
            });

            const serviceDetails = await Promise.all(serviceDetailsPromises);

            // 확인: serviceDetails가 정상적으로 구성되었는지 체크
            if (serviceDetails) {
              // console.log(serviceDetails);
              setRecentService(serviceDetails);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching recent service:', error);
      }
    };
    fetchData();  
  }, [])

  // console.log(recentService);

  const windowWidth = useWindowSize().width;
  useEffect(() => {
    if (windowWidth < 320) {
      return setNumberOfitem(1);
    }
    if (windowWidth < 500) {
      return setNumberOfitem(itemPerRow - 3);
    }
    if (windowWidth < 1024) {
      return setNumberOfitem(itemPerRow - 2);
    }
    if (windowWidth < 1280) {
      return setNumberOfitem(itemPerRow - 1);
    }

    setNumberOfitem(itemPerRow);
  }, [itemPerRow, windowWidth]);

  function changeItemId(newVal: number) {
    if (newVal > currentIndex) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurrentIndex(newVal);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < recentService?.length - 1) {
        changeItemId(currentIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        changeItemId(currentIndex - 1);
      }
    },
    trackMouse: true,
  });

  const renderCard = (item: ResentServiceImg) => {
    
    return <CardCategory5 item={item} />;
      
  };

  if (!numberOfItems) return null;

  return (
    <div className={`nc-SectionSliderNewCategories ${className}`}>
      <Heading desc={subHeading} isCenter={sliderStyle === "style2"}>
        {heading}
      </Heading>
      <MotionConfig
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        <div className={`relative flow-root`} >
          <div className={`flow-root overflow-hidden rounded-xl`}>
            <motion.ul
              initial={false}
              className="relative whitespace-nowrap -mx-2 xl:-mx-4"
            >
              <AnimatePresence initial={false} custom={direction}>
                {recentService.map((item:ResentServiceImg, indx:number) => (
                  <motion.li
                    className={`relative inline-block px-2 xl:px-4 ${itemClassName}`}
                    custom={direction}
                    initial={{
                      x: `${(currentIndex - 1) * -100}%`,
                    }}
                    animate={{
                      x: `${currentIndex * -100}%`,
                    }}
                    variants={variants(200, 1)}
                    key={indx}
                    style={{
                      width: `calc(1/${numberOfItems} * 100%)`,
                    }}
                  >
                    {renderCard(item)}
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </div>


          
        </div>
      </MotionConfig>
    </div>
  );
};

export default SectionSliderNewCategories;
