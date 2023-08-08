import { useAtom } from "jotai";
import { useProfiles } from "../store/dashboardAtom";
import PersonPlaceHolder from "../images/product/person-placeholder.jpg";
import Gym from "../images/product/Gym.jpg";
import moment from "moment";

type rawDataType = {
  dateAndTime: number
}

const CardTwo = ({firstName = "",lastName = "",playerId = "",activityName = "",rawData}: {
  rawData: rawDataType,
  firstName: string;
  lastName: string;
  playerId: string;
  activityName: string;
}) => {
  const [profile,setProfile] = useAtom(useProfiles)
  const getDateTime = moment.unix(rawData?.dateAndTime).format('DD-MM-YYYY hh:mm a')

  return (
    <div  className={`relative rounded-md border overflow-hidden border-stroke shadow-default max-h-34 z-auto h-35 dark:border-strokedark cursor-pointer dark:bg-boxdark ${profile.includes(playerId) ? `bg-[#535f7759]` : `bg-[#ffffff12]` }`} onClick={() => setProfile((prev: any) => {
      if(prev.includes(playerId)) {
        return prev.filter((item: any) => item !== playerId)
      }

      return [...prev,playerId]
    })}>
    <div className="absolute z-[-1]">
    <img src={Gym} className="w-[100vw] bg-[bottom] bg-no-repeat object-cover" alt="" />
    </div>
    <div className="relative top-0 right-0">
      <div className='absolute right-4 top-4 w-25 h-25 bg-[#07193fa3] rounded-md flex flex-col gap-2 justify-center items-center'>
      <div className="h-11.5 w-11.5  bg-meta-2 dark:bg-meta-4 rounded-full ">
    {/* <GymIcon /> */}
    <img src={PersonPlaceHolder} className="w-11.5 h-11.5 rounded-full" alt="" />
      </div>
      <h5 className="text-xs text-white text-center">  {firstName + " " + lastName}</h5>
      </div>
    </div>

    <div className="mt-4 ml-4 flex items-end justify-between">
      <div className="flex flex-col justify-start">
        <h4 className={`text-title-md font-bold  ${profile.includes(playerId) ? `text-white` : 'text-white' } dark:text-white`}>
          {firstName + " " + lastName}
        </h4>
        <span className={`text-sm font-medium  ${profile.includes(playerId) ? `text-white` : 'text-white' }`}>Activity Name: {activityName}</span>
        <span className={`text-sm font-medium  ${profile.includes(playerId) ? `text-white` : 'text-white' }`}>Date: {getDateTime}</span>
      </div>

      {/* <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
        4.35%
        <svg
          className="fill-meta-3"
          width="10"
          height="11"
          viewBox="0 0 10 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
            fill=""
          />
        </svg>
      </span> */}
    </div>
  </div>
  );
};

export default CardTwo;
