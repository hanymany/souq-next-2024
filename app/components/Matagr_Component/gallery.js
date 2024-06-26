"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import Link from "next/link";
  import { Image } from 'primereact/image';
import Slider from "react-slick";
import { useSelector } from "react-redux";
const gallery = ( ) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { MarketDetialsArr } = useSelector((state) => state.MarketsSlice);

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(MarketDetialsArr());
    
//   }, [dispatch]);
  

var settingss = {
  dots: true,
  infinite: true,
  speed: 200,
        // slidesToScroll: 1,
        autoplay:true,
  slidesToShow: 1, 
  centerPadding: "10px",
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 358,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

// تحديث عدد الشرائح بناء على طول القائمة
if (MarketDetialsArr && MarketDetialsArr.images.length === 1) {
  settingss.slidesToShow = 1;
} else if (MarketDetialsArr && MarketDetialsArr.images.length === 2) {
  settingss.slidesToShow = 2;
} else   {
  settingss.slidesToShow = 3;
} 


  return (
      <div className="  form_card  cardd">
              <div className="card_header">
                <h2 className="form_heading text-center"> المعرض</h2>
              </div>
              {/* <div className="grid_gallary"> */}
        
 
              <Slider {...settingss} className="imagesform_card"  >
              {MarketDetialsArr?.images.map((item, id) => {
                  return (
                    <div className=" LazyLoadImage_grid_gallary" key={id}>
                       <Image
                        src={`https://souq.deltawy.com/imag?id=${item}`}
                        width={150}
                        height={150}
                        alt={MarketDetialsArr?.name}
                        loading="lazy"
                          preview
                /> 
                    </div>
                  );
                })}
    </Slider>    
   
              {/* </div> */}
            </div>
  );
};

export default gallery;
