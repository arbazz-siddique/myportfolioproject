import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Portfolio = () => {

  const [project, setProject] = useState([]);
  const[viewAll, setViewAll]=useState(false)

  useEffect(() => {
    const getMyProject = async () => {
      const { data } = await axios.get(
        "https://backend-portfolio-n2az.onrender.com/api/v1/project/getall",
        { withCredentials: true }
      );
      // console.log(data)
      setProject(data.projects);
    };
    getMyProject();
  },[]);

  return (
    <>
    <div>
    <div className="relative mb-12">
      {/* 👇 Visible on larger screens (sm and up) */}
<h1
  className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
  md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
  lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold about-h1"
  style={{ background: "hsl(222.2 84% 4.9%)" }}
>
  <span className="text-tubeLight-effect font-extrabold">Projects</span>
</h1>

{/* 👇 Visible only on mobile screens */}
<h1
  className="flex sm:hidden gap-4 items-center text-[1.8rem] sm:text-[2rem] 
  leading-[50px] tracking-[10px] mx-auto w-fit font-extrabold about-h1"
  style={{ background: "hsl(222.2 84% 4.9%)" }}
>
  My <span className="text-tubeLight-effect font-extrabold">Works</span>
</h1>

      <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200 "></span>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4  rounded-xl">
      {
        viewAll ? project && project.map((element)=> {
          return (
            <Link to={`/project/${element._id}`} key={element._id}>
              <div className="relative overflow-hidden w-full h-60 rounded-xl">
                <img 
                  src={element.projectBanner && element.projectBanner.url} 
                  alt="Project Banner" 
                  className="object-cover w-full h-full rounded-xl "
                />
              </div>
            </Link>
          )
        }): project && project.slice(0,9).map((element)=> {
          return (
            <Link to={`/project/${element._id}`} key={element._id}>
              <div className="relative overflow-hidden w-full h-60 px-4 rounded-xl ">
                <img 
                  src={element.projectBanner && element.projectBanner.url} 
                  alt="Project Banner" 
                  className="object-cover w-full h-full rounded-xl"
                />
              </div>
            </Link>
          )
        })
      }
    </div>

    {
      project && project.length>9 && (
        <div className="w-full text-center my-9">
          <Button className="w-52" onClick={()=>setViewAll(!viewAll)}>
            {
              viewAll ? "show less" : "show more"
            }
          </Button>
        </div>
      )
    }
  </div>
  </>
  )
}

export default Portfolio