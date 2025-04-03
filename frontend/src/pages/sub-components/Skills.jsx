import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Skills = () => {
  const [skill, setSkills] = useState([]);
  const [allSkill, setAllSkill] = useState(false);

  useEffect(() => {
    const getMySkills = async () => {
      const { data } = await axios.get(
        "https://backend-portfolio-n2az.onrender.com/api/v1/skill/getall",
        { withCredentials: true }
      );
      // console.log(data)
      setSkills(data.skills);
    };
    getMySkills();
  },[]);

  const visibleSkills = allSkill ? skill : skill.slice(0, 9);

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12 px-4 ">
      <div className="relative mb-12">
      {/* 👇 Visible on larger screens (sm and up) */}
<h1
  className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
  md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
  lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold about-h1"
  style={{ background: "hsl(222.2 84% 4.9%)" }}
>
  <span className="text-tubeLight-effect font-extrabold">Skills</span>
</h1>

{/* 👇 Visible only on mobile screens */}
<h1
  className="flex sm:hidden gap-4 items-center text-[1.8rem] sm:text-[2rem] 
  leading-[50px] tracking-[10px] mx-auto w-fit font-extrabold about-h1"
  style={{ background: "hsl(222.2 84% 4.9%)" }}
>
  <span className="text-tubeLight-effect font-extrabold">Skills</span>
</h1>

      <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200 "></span>
    </div>
    
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
        {visibleSkills.map((element) => {
            return (
              <Card
                className="h-fit p-7 flex flex-col justify-center items-center gap-3 rounded-xl"
                key={element._id}
              >
                <img
                  src={element.svg && element.svg.url}
                  alt={element.title}
                  className="h-12 sm:h-24 w-auto rounded-xl"
                />
                <p className="text-muted-foreground text-center ">{element.title}</p>
              </Card>
            );
          })}
      </div>
      {
            skill.length>9 && (
              <div className="w-full text-center my-9">
                <Button className="w-52" onClick={()=>setAllSkill(!allSkill)}>
                  {
                    allSkill ? "Show Less" : "Show More"
                  }
                </Button>
              </div>
            )
          }
    </div>
  );
}

export default Skills