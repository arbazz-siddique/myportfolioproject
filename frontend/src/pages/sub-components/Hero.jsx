import {
  ExternalLink,
  Github,
  Instagram,
  Linkedin,
  X,
  Youtube,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Hero = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(
          "https://backend-portfolio-n2az.onrender.com/api/v1/user/profile/protfolio",
          { withCredentials: true }
        );
        setUser(data.user);
      } catch (err) {
        console.error("Error fetching user in About:", err.response?.data || err.message);
      }
    };
    getUser();
  }, []);
  

  

  return (
    <div className="w-full flex flex-col justify-center items-center text-center px-4 ">
      <div className="w-full flex items-center gap-2 mb-2">
        <span className="bg-green-400 rounded-full h-2 w-2"></span>
        <p>Online</p>
      </div>
      <h1 className="overflow-y-hidden text-[1.3rem] sm:text-[1.75rem] 
      md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-4">
        Hey, im Mohammad Arbazz Siddique
      </h1>
      <h1 className="text-tubeLight-effect overflow-x-hidden text-[1.3rem] 
      sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px]">
        <Typewriter
          words={["FULLSTACK DEVELOPER", "FREELANCER"]}
          loop={50}
          cursor
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>
      <div className="w-fit px-5 py-2 bg-slate-50 rounded-[20px] flex gap-5 
      items-center mt-4 md:mt-8 lg:mt-10">
        <Link to={"https://www.youtube.com/@ArbazSiddique-ki4cp"} target="_blank">
          <Youtube className="text-red-500 w-7 h-7"/>
        </Link>
        <Link to={user?.instagramurl} target="_blank">
          <Instagram className="text-pink-500 w-7 h-7" />
        </Link>
        
        <Link to={user?.linkedInurl} target="_blank">
          <Linkedin className="text-sky-500 w-7 h-7" />
        </Link>
        <Link to={user?.twitterurl} target="_blank">
          <X className="text-blue-800 w-7 h-7" />
        </Link>
      </div>
      <div className="mt-4 md:mt-8 lg:mt-10 flex gap-3">
        <Link to={user?.githuburl} target="_blank">
          <Button className="rounded-[30px] flex items-center gap-2 flex-row">
            <span>
              <Github />
            </span>
            <span>Github</span>
          </Button>
        </Link>
        <Link to={user?.resume && user?.resume?.url} target="_blank">
          <Button className="rounded-[30px] flex items-center gap-2 flex-row">
            <span>
              <ExternalLink />
            </span>
            <span>Resume </span>
          </Button>
        </Link>
      </div>
      <p className="mt-8 text-xl tracking-[2px]">{user?.aboutMe}</p>
      <hr className="my-8 md::my-10 " />
      <div className="bg-red-500" id="chatbase-container"></div>
    </div>
  );
};

export default Hero;
