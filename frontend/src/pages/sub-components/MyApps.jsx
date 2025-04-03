import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";

const MyApps = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const getMyApps = async () => {
      const { data } = await axios.get(
        "https://backend-portfolio-n2az.onrender.com/api/v1/softwareApplication/getall",
        { withCredentials: true }
      );
      // console.log(data)
      setApps(data.softwareApplications);
    };
    getMyApps();
  }, []);
  return (
    <>
      <div className="w-full flex flex-col gap-8 sm:gap-12">
      <div className="relative flex items-center justify-center w-full mb-12 px-4">
      {/* 👇 Visible on larger screens (sm and up) */}
<h1
  className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
  md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
  lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold about-h1"
  style={{ background: "hsl(222.2 84% 4.9%)" }}
>
  <span className="text-tubeLight-effect font-extrabold">Application</span>
</h1>

{/* 👇 Visible only on mobile screens */}
<h1
  className="flex sm:hidden gap-4 items-center text-[1.8rem] sm:text-[2rem] 
  leading-[50px] tracking-[10px] mx-auto w-fit font-extrabold about-h1"
  style={{ background: "hsl(222.2 84% 4.9%)" }}
>
  <span className="text-tubeLight-effect font-extrabold">Application</span>
</h1>

      <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200 "></span>
    </div>
    
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {apps &&
            apps.map((element) => {
              return (
                <Card
                  className="h-fit p-7 flex flex-col justify-center items-center gap-3"
                  key={element._id}
                >
                  <img
                    src={element.svg && element.svg.url}
                    alt={element.title}
                    className="object-contain h-24 w-24"
                  />
                  <p className="text-muted-foreground text-center">
                    {element.name}
                  </p>
                </Card>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default MyApps;
