import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default class ScrollSlider2 extends Component {
  render() {
    var settings = {
      
      infinite: true,
      dots: false,
      speed: 3000,
      slidesToScroll: 1,
      slidesToShow: 3,
      autoplay: true,
      autoplaySpeed: 1000,
      prevArrow: <></>,
      nextArrow: <></>,
      rtl: true,
     
    responsive: [
        {
            breakpoint: 1025,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              
            }
          },
          {
            breakpoint: 1000,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: 1
            }
          },
          {
            breakpoint: 650,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: 1
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
      ]
    };

    
    return (
        <div className="-mt-2">
        
        <Slider {...settings} >
          <div>
            <img src="/slider/img7.jpeg" alt="logo"  className="h-32 sm:h-44 md:h-44 w-full p-0.5 rounded-lg object-cover"/>
          </div>
          <div>
          <img src="/slider/img6.jpeg" alt="logo"  className="h-32 sm:h-44 md:h-44 w-full p-0.5 rounded-lg object-cover"/>

          </div>
          <div>
          <img src="/slider/img5.webp" alt="logo"  className="h-32 sm:h-44 md:h-44 w-full p-0.5 rounded-lg object-cover"/>

          </div>
          <div>
          <img src="/slider/img4.jpeg" alt="logo"  className="h-32 sm:h-44 md:h-44 w-full p-0.5 rounded-lg object-cover"/>

          </div>
          <div>
          <img src="/slider/img3.webp" alt="logo"  className="h-32 sm:h-44 md:h-44 w-full p-0.5 rounded-lg object-cover"/>
          </div>
          <div>
          <img src="/slider/img2.webp" alt="logo"  className="h-32 sm:h-44 md:h-44 w-full p-0.5 rounded-lg object-cover"/>

          </div>
          <div>
          <img src="/slider/img1.webp" alt="logo"  className="h-32 sm:h-44 md:h-44 w-full p-0.5 rounded-lg object-cover"/>

          </div>
          
        </Slider>
      </div>
    );
  }
}