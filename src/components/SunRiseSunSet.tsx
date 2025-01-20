import { TbSunrise, TbSunset } from "react-icons/tb";
interface SunRiseSunSetProps {

    rise: number;
  
    set: number;
  
  }
  
  
  const SunRiseSunSet: React.FC<SunRiseSunSetProps> = ({ rise, set }) => {
    return (
    //   <div>
    //     <p>Sunrise: {new Date(rise * 1000).toLocaleTimeString()}</p>
    //     <p>Sunset: {new Date(set * 1000).toLocaleTimeString()}</p>
    //   </div>
     <div className="flex items-center justify-between">
                  <div className="flex-1 flex flex-col justify-center items-center m-2 p-4">
                    <h2 className="text-white text-2xl mb-2">Sunrise</h2>
                    <p className="text-white text-xl flex items-center">
                      <TbSunrise className="mr-2 text-3xl" /> {new Date(rise*1000).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex-1 flex flex-col justify-center items-center m-2 p-4">
                    <h2 className="text-white text-2xl mb-2">Sunset</h2>
                    <p className="text-white text-xl flex items-center">
                      <TbSunset className="mr-2 text-3xl" /> {new Date(set*1000).toLocaleTimeString()}
                    </p>
                  </div>
                 
                </div>
    );
  }

export default SunRiseSunSet
