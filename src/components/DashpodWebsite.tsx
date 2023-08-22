
import Iframe from 'react-iframe'


export default function DashpodWebsite() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 ">
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.1 h-[80vh]">
        <Iframe url="https://dashpod.in/"
        width="100%"
        height="100%"
        id=""
        className=""
        display="block"
        position="relative"/>
        </div>
    </div>
  )
}