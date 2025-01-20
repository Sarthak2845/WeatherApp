import { LuWind } from "react-icons/lu"
import { WiHumidity } from "react-icons/wi"
interface HumWin{
    hum:number,
    wind:number
}
const HumiWind:React.FC<HumWin> = ({hum,wind}) => {
  return (
           <div className="flex items-center justify-between">
              <div className="flex-1 flex flex-col justify-center items-center m-2 p-4">
                <h2 className="text-white text-2xl mb-2">Humidity</h2>
                <p className="text-white text-xl flex items-center">
                  <WiHumidity className="mr-2 text-3xl" /> {hum}%
                </p>
              </div>
              <div className="flex-1 flex flex-col justify-center items-center m-2 p-4">
                <h2 className="text-white text-2xl mb-2">Wind</h2>
                <p className="text-white text-xl flex items-center">
                  <LuWind className="mr-2 text-3xl" />{" "}
                  {Math.round(wind * 3.6)}
                  <sub>Km/h</sub>
                </p>
              </div>
            </div>
  )
}

export default HumiWind
