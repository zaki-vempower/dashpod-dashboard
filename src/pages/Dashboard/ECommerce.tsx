import { useAtom } from 'jotai';
// import { useAuth } from '../../hooks/useAuth.tsx';
import { useEffect, useMemo, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import GetRecordQuery from '../../graphqlQueries/GetRecordQuery.js';
import { selectpodAddress, useGraphData, useProfiles, userData } from '../../store/dashboardAtom.ts';
import ProfileAnalyticsCard from '../ProfileCards/ProfileAnalyticsCard.tsx';
import { Bashcolors } from '../../util.ts';
import moment from 'moment';
import DetailCard from './DetailCard.tsx';
const containerProps = {
  width: '100%',
  height: 350,
  // border: '1px solid black',
};





const ECommerce = () => {
  const [graphData, setGraphData] = useAtom(useGraphData);
  const [getProfile,] = useAtom(useProfiles)
  const [user,] = useAtom(userData);
  const [dateTime,] = useState(moment().format('DD-MM-YYYY hh:mm a'))
  const [podAddress,] = useAtom(selectpodAddress);
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
    let graphsNodes: any[] =[];
    if(Array.isArray(graphData) && graphData.length > 0) {
      if(getProfile.length > 0){
        for(let it of getProfile){
          const filterGraph = graphData.filter((item: any) => item.recordId === it)
          console.log('calculateAverage',graphsNodes,podAddress,graphData,it,filterGraph)
          graphsNodes = [...graphsNodes,...filterGraph]
        }

      graphsNodes = graphsNodes.map((item) => {
        item.analyticsValuesList.sort((a:any, b: any) => (a.entryX > b.entryX ? 1 : -1))
        return item
      })
      console.log('graphData123',graphData,graphsNodes)
      graphsNodes = graphsNodes.map((item) => {
        
        if(podAddress !== 'All') {
          console.log('podAddress12345',podAddress,item);
          const data = item.analyticsValuesList.filter((a:any ) => {
            console.log('analyticsValuesList --> podAddress',a.podAddress,podAddress,item)
            return (podAddress === a?.podAddress) || (a?.podAddress === 'NA')
          })
          return {
            ...item,
            analyticsValuesList: data
          }
        }
        return item
        })

        return graphsNodes
      }
      const getVal = graphData.reduce((a: any, b: any) => {
        return new Date(a.dateAndTime) > new Date(b.dateAndTime) ? a : b;
      });

      graphsNodes = graphData.filter(item => item.dateAndTime === getVal.dateAndTime).map((item) => {
        item.analyticsValuesList.sort((a:any, b: any) => (a.entryX > b.entryX ? 1 : -1))
        return item
      })

      graphsNodes = graphsNodes.map((item) => {
        console.log('podAddress12345',podAddress,item,item.recordId);
        if(podAddress !== 'All') {
          const data = item.analyticsValuesList.filter((a:any ) => (podAddress === a?.podAddress) || (a?.podAddress === 'NA'))
          // item['analyticsValuesList'] = data
          return {
            ...item,
            analyticsValuesList: data
          }
        }
        return item
        })

      return graphsNodes
    }

    return []


},[getProfile,graphData,podAddress])
  console.log('setGraphData',getGraphDataFiltered,podAddress)

  const xTitle = getGraphDataFiltered.length > 0 ? getGraphDataFiltered[0]?.activityName : "X-axis"
  const yTitle = getGraphDataFiltered.length > 0 ? getGraphDataFiltered[0]?.categoryName : "Y-axis"
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

  const getCanvasData = () => {
    const series: Array<{
      type: "line";
      markerSize: number;
      dataPoints: Array<{
        x: string;
        y: number;
        indexLabel: string;
        markerColor: string;
    }>
    }> = [];
    getGraphDataFiltered.forEach((item) => {
      const data: Array< {
        x: string;
        y: number;
        indexLabel: string;
        markerColor: string;
    }> = []
      item.analyticsValuesList.forEach((value: {
        entryX: string;
        entryY: number;
        podColor: "1" | "2" | "3" | "4" | "5" | "6" | "7";
        podAddress?: string;
      }) => {
        const pr = {
          x: value.entryX,
          y: (value.entryY/1000),
          indexLabel: value.entryY?.toString(),
          markerColor: Bashcolors[value.podColor]
        }
        data.push(pr)
      })
      series.push({
        type: "line",
        markerSize: 10,
        dataPoints: data
      })
    });



    return series
  }

  const canvasOptions = {
    theme: "dark1", // "light1", "light2", "dark1", "dark2"
    animationEnabled: true,
    data: getCanvasData()
  }
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
      console.log('data.getRecordActivity.data',data.getRecordActivity.data);
      if(Array.isArray(data.getRecordActivity.data)){
        const getData = data.getRecordActivity.data as any[]
        // @ts-ignore
        const sortData = getData.sort((a,b) =>  new Date(b?.dateAndTime * 1000) - new Date(a?.dateAndTime * 1000));
        setGraphData(getData);
      }
    }
  };

  useEffect(() => {
    if(Array.isArray(getGraphDataFiltered) && getGraphDataFiltered.length > 0 && "CanvasJS" in window) {
      // @ts-ignore
      var chart = new window.CanvasJS.Chart("chartContainer",canvasOptions)
      chart.render()
    }
  },[getGraphDataFiltered])

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {/* <CardOne /> */}
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div>
        <h3 className="text-xl font-semibold text-black dark:text-white">
          Analytics
        </h3>
          <h3 className={`text-base font-semibold text-black `}>Activity Name: {xTitle}</h3>
        <h3 className={`text-base font-semibold  text-black`}>Category Name: {yTitle}</h3>
      </div>
      <div className="mb-2">
        <div id="chartFour" className="-ml-5 h-[350] w-[]">
          {/* @ts-ignore */}
          {/* <ReactApexChart
            options={options}
            series={getSeries()}
            type="line"
            height={350}
          /> */}
          <div >
          <div id="chartContainer" style={containerProps} />

          </div>
          {/* <CanvasJSChart options={canvasOptions} containerProps={containerProps} /> */}
        </div>
      </div>
      <div>
        <DetailCard />
      </div>
    </div>
      <div className='w-100'>
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
      <div className='mt-3 chartGrid'>
      <ProfileAnalyticsCard />
      </div>

      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div> */}
    </>
  );
};

export default ECommerce;
