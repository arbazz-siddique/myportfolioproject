import axios from "axios";
import React, { useEffect, useState } from "react";

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const getMyTimeline = async () => {
      const { data } = await axios.get(
        "https://backend-portfolio-n2az.onrender.com/api/v1/timeline/getall",
        { withCredentials: true }
      );
      setTimeline(data.timelines);
    };
    getMyTimeline();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center  px-4 ">
      <div className="relative flex items-center justify-center w-full mb-12 px-4">
      {/* 👇 Visible on larger screens (sm and up) */}
<h1
  className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
  md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
  lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold about-h1"
  style={{ background: "hsl(222.2 84% 4.9%)" }}
>
  <span className="text-tubeLight-effect font-extrabold">TimeLines</span>
</h1>

{/* 👇 Visible only on mobile screens */}
<h1
  className="flex sm:hidden gap-4 items-center text-[1.8rem] sm:text-[2rem] 
  leading-[50px] tracking-[10px] mx-auto w-fit font-extrabold about-h1"
  style={{ background: "hsl(222.2 84% 4.9%)" }}
>
  <span className="text-tubeLight-effect font-extrabold">TimeLines</span>
</h1>

      <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200 "></span>
    </div>

        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          {
            timeline && timeline.map((element)=>{
              return(
                <li className="mb-10 ms-6" key={element._id}>
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <svg
                    className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </span>
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {element.title}
                </h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  {element.timeline.from} - {element.timeline.to ? element.timeline.to : "Present"}
                </time>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                 {element.description}
                </p>
              </li>
              )
            })
          }
          
      
        </ol>
      </div>
    </>
  );
};

export default Timeline;
