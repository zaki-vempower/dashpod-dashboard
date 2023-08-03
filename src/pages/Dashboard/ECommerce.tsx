import { useAtom } from 'jotai';
import CardFour from '../../components/CardFour.tsx';
import CardOne from '../../components/CardOne.tsx';
import CardThree from '../../components/CardThree.tsx';
import CardTwo from '../../components/CardTwo.tsx';
import ChartOne from '../../components/ChartOne.tsx';
import ChartThree from '../../components/ChartThree.tsx';
import ChartTwo from '../../components/ChartTwo.tsx';
import ChatCard from '../../components/ChatCard.tsx';
import MapOne from '../../components/MapOne.tsx';
import TableOne from '../../components/TableOne.tsx';
// import { useAuth } from '../../hooks/useAuth.tsx';
import { useEffect, useMemo, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import GetRecordQuery from '../../graphqlQueries/GetRecordQuery.js';
import { selectProfiles, useGraphData, useProfiles, userData } from '../../store/dashboardAtom.ts';
import ReactApexChart from 'react-apexcharts';
import ProfileAnalyticsCard from '../ProfileCards/ProfileAnalyticsCard.tsx';
import { accountId } from '../../util.ts';
import { Button } from '@aws-amplify/ui-react';
import { format } from 'date-fns'



const ECommerce = () => {
  const [graphData, setGraphData] = useAtom(useGraphData);
  const [getProfile,] = useAtom(useProfiles)
  const [user,] = useAtom(userData);
  const [dateTime,] = useState(format(new Date(), 'yyyy-MM-dd')
  )
  // const [selectedProfiles,setselectProfiles] = useAtom(selectProfiles)
  // const { user, signOut } = useAuth();

  // function printDocument() {
  //   const input = document.getElementById("mainDashboardElement");
  //   html2canvas(input, { scale: "1" }).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF();
  //     pdf.addImage(imgData, "JPEG", 0, 0);
  //     // pdf.output('dataurlnewwindow');
  //     pdf.save("download.pdf");
  //   });
  // }
  const getGraphDataFiltered = useMemo(() => {
    let graphsNodes: any[] = []

    if(Array.isArray(graphData) && graphData.length > 0) {
      if(getProfile.length > 0){
        for(let it of getProfile){
          const filteredGraph = graphData.filter((item: any) => item.recordId === it)
          graphsNodes = [...graphsNodes,...filteredGraph]
        }
        return graphsNodes
      }
      const getVal = graphData.reduce((a: any, b: any) => {
        return new Date(a.dateAndTime) > new Date(b.dateAndTime) ? a : b;
      });

      return graphData.filter(item => item.dateAndTime === getVal.dateAndTime)
    }

    return []


  
},[getProfile,graphData])
  console.log('setGraphData',getProfile,getGraphDataFiltered)
  // const series = Array.isArray(graphData) && graphData.length > 0 ? graphData.map((record) => ({
  //   name: record.playerName,
  //   data: record.analyticsValuesList.map((value: any) => ({
  //     x: value.entryX,
  //     y: value.entryY,
  //   })),
  // })) : [];
  // const categories = Array.isArray(graphData) && graphData.length > 0 ? graphData[0].analyticsValuesList.map((value: any) => value.entryX) : [];
  const options = {
    chart: {
      type: "line",
    },
    xaxis: {
      title: {
        text: "X-axis",
      },
    },
    yaxis: {
      title: {
        text: "Y-axis",
      },
    },
    legend: {
      show: true,
    },

    markers: {
      size: 6,
      strokeWidth: 0,
      hover: {
        size: 9,
      },
    },

  };

  const getSeries = () => {
    // Format the data to create the series for the chart
    const series: Array<{
      name: string;
      data: {
        x: string;
        y: string
      }
    }> = [];
    getGraphDataFiltered.forEach((item,i) => {
      const values = item.analyticsValuesList.map((value: {
        entryX: string;
        entryY: string;
      }) => ({
        x: value.entryX,
        y: value.entryY,
      }));
      series.push({
        name: item.playerName + i,
        data: values,
      });
    });
    return series;
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    console.log('attributes',user,user?.sub);
    
    const { data } = await API.graphql(graphqlOperation(GetRecordQuery(user?.sub,))) as { data: {
      getRecordActivity: {
        status: string;
        data: {
          
        }
      }
    } };
    if (
      data?.getRecordActivity?.data &&
      data?.getRecordActivity?.status === "success"
    ) {
      setGraphData(data.getRecordActivity.data);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {/* <CardOne /> */}
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div>
        <h3 className="text-xl font-semibold text-black dark:text-white">
          Analytics
        </h3>
      </div>
      <div className="mb-2">
        <div id="chartFour" className="-ml-5">
          {/* @ts-ignore */}
          <ReactApexChart
            options={options}
            series={getSeries()}
            type="line"
            height={350}
          />
        </div>
      </div>
    </div>
      <div className=''>
      {/* <Button className='bg-[#7584a1] p-3 text-center text-white rounded-md' onClick={() => setselectProfiles((prev: any) => {
                if(Array.isArray(prev) && prev.length > 0 ){
                    return []
                }

                return getProfile
            })}>
                View Analytics
            </Button> */}
            <h5 className='text-base font-semibold'>Date: {dateTime}</h5>
      </div>
      </div>
      <div className='mt-3 grid grid-cols-2 gap-2'>
      <ProfileAnalyticsCard />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default ECommerce;
