
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const About = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(
        "https://backend-portfolio-n2az.onrender.com/api/v1/user/profile/protfolio",
        { withCredentials: true }
      );
      setUser(data?.user);
    };
    getUser();
  }, []);
  
  return (
    <>
       <div className="w-full flex flex-col overflow-x-hidden justify-center items-center text-center px-4">
      
       <div className="relative flex items-center justify-center w-full mb-12">
      {/* 👇 Visible on larger screens (sm and up) */}
<h1
  className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
  md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
  lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold about-h1"
  style={{ background: "hsl(222.2 84% 4.9%)" }}
>
  <span className="text-tubeLight-effect font-extrabold ">About Me</span>
</h1>

{/* 👇 Visible only on mobile screens */}
<h1
  className="flex sm:hidden gap-4 items-center text-[1.8rem] sm:text-[2rem] 
  leading-[50px] tracking-[10px] mx-auto w-fit font-extrabold about-h1"
  style={{ background: "hsl(222.2 84% 4.9%)" }}
>
<span className="text-tubeLight-effect font-extrabold">About Me</span>
</h1>

      <span className="absolute w-full  sm:top-7 md:top-8 lg:top-11  bg-slate-200  h-[2px] top-1/2 transform -translate-y-1/2 z-[-1] "></span>
    </div>


      <div className="text-center">
        <p className="uppercase text-xl text-slate-400">
          Allow me to introduce myself.
        </p>
      </div>
      <div>
        <div className="grid md:grid-cols-2 my-8 sm:my-20 gap-14">
          <div className="flex justify-center items-center">
            <img
              src={user.avtar?.url}
              alt="avatar"
              className=" rounded-full rotate-[deg] sm:p-4 h-[240px] sm:h-[340px] md:h-[350px] lg:h-[450px] ml-10"
            />
          </div>
          <div className="flex justify-center flex-col tracking-[1px] text-xl gap-5">
            {user.aboutme}
          </div>
        </div>
        <p className="tracking-[1px] text-xl">
          My dedication and perseverance in timely delivery of work are integral
          to me. I maintain the courage to face any challenges for extended
          periods.
        </p>
      </div>
    </div>
    </>
  )
}

export default About