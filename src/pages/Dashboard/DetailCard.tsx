import { useAtom } from 'jotai';
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { selectpodAddress, useGraphData, useProfiles } from '../../store/dashboardAtom';
import { Bashcolors, calculateAverage, letterColors } from '../../util';

export default function DetailCard() {
    const [podAddress, setPodAddress] = useAtom(selectpodAddress);
    const [graphData,] = useAtom(useGraphData);
    const [getProfile,] = useAtom(useProfiles)

    const { average, maxValue,minValue} = useMemo(() => {
      if(!Array.isArray(graphData) ||  graphData.length === 0) {
        return {
          average: 0,
          minValue: 0,
          maxValue: 0
        }
      }
      
      let graphsNodes:any[] = []
      const yValues: number[] = []
      if(getProfile.length > 0){
      for(let it of getProfile){
        const filterGraph = graphData.filter((item: any) => item.recordId === it)
        console.log('calculateAverage',graphsNodes,podAddress,graphData,it,filterGraph)
        graphsNodes = [...graphsNodes,...filterGraph]
      }

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

      graphsNodes.forEach((item: {analyticsValuesList: Array<{
        entryY: number
      }>}) => {
        item.analyticsValuesList.forEach((element: {entryY: number}) => {
          return yValues.push(element.entryY / 1000);
        });
      })

      const getAverage = calculateAverage(yValues)
      const getMinValue = yValues.reduce((a, b) => Math.min(a, b))
      const getMaxValue = yValues.reduce((a, b) => Math.max(a, b))

      return {
        average: getAverage.toFixed(2),
        minValue: getMinValue.toFixed(2),
        maxValue: getMaxValue.toFixed(2)
      }
    }
    const getVal = graphData.reduce((a: any, b: any) => {
      return new Date(a.dateAndTime) > new Date(b.dateAndTime) ? a : b;
    });

    graphsNodes = graphData.filter(item => item.dateAndTime === getVal.dateAndTime)
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
    graphsNodes.forEach((item: {analyticsValuesList: Array<{
      entryY: number
    }>}) => {
      item.analyticsValuesList.forEach((element: {entryY: number}) => {
        return yValues.push(element.entryY / 1000);
      });
    })
    const getAverage = calculateAverage(yValues)
    const getMinValue = yValues.reduce((a, b) => Math.min(a, b))
    const getMaxValue = yValues.reduce((a, b) => Math.max(a, b))

    return {
      average: getAverage.toFixed(2),
      minValue: getMinValue.toFixed(2),
      maxValue: getMaxValue.toFixed(2)
    }
    }, [graphData,getProfile,podAddress])


    const getDynamicPodAddress = useMemo(() => {
      if(Array.isArray(graphData) &&  graphData.length > 0) {
        let graphsNodes:any[] = []
        const uniqueValues: {
          podAddress: string;
          podColor: "1" | "2" | "3" | "4" | "5" | "6" | "7";
        }[] = []
        if(getProfile.length > 0){
        for(let it of getProfile){
          const filterGraph = graphData.filter((item: any) => item.recordId === it)
          console.log('calculateAverage',graphsNodes,podAddress,graphData,it,filterGraph)
          graphsNodes = [...graphsNodes,...filterGraph]
        }
  
        graphsNodes.forEach((item) => {
          

            console.log('podAddress12345',podAddress,item);
           item.analyticsValuesList.forEach((a:any ) => {
              uniqueValues.push({
                podAddress: a.podAddress,
                podColor: a.podColor
              })
            })
          })
  
  
          const getSetValues = [...new Map(uniqueValues.map(item =>
            [item['podAddress'], item])).values()]

          console.log('getSetValues',getSetValues)
  
        return getSetValues
      }
      const getVal = graphData.reduce((a: any, b: any) => {
        return new Date(a.dateAndTime) > new Date(b.dateAndTime) ? a : b;
      });
  
      graphsNodes = graphData.filter((item: any) => item.dateAndTime === getVal.dateAndTime)
      graphsNodes.forEach((item) => {
          

         item.analyticsValuesList.forEach((a:any ) => {
            uniqueValues.push({
              podAddress: a.podAddress,
              podColor: a.podColor
            })
          })
        })


        const getSetValues = [...new Map(uniqueValues.map(item =>
          [item['podAddress'], item])).values()]

        console.log('getSetValues',getSetValues)
        return getSetValues
      }

      return []
    },[graphData,getProfile])
    
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

    <div className='chartGrid'>
    <div className="flex flex-col">
    <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
      Avg
    </h4>
      <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 ">
        <div className="p-2.5 xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">
            Avg(Sec)
          </h5>
        </div>
        <div className="p-2.5 text-center xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">
            Best(sec)
          </h5>
        </div>
        <div className="p-2.5 text-center xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">
            Poor(sec)
          </h5>
        </div>
        {/* <div className="hidden p-2.5 text-center sm:block xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">
            Sales
          </h5>
        </div>
        <div className="hidden p-2.5 text-center sm:block xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">
            Conversion
          </h5>
        </div> */}
      </div>

      <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark">
        {/* <div className="flex items-center gap-3 p-2.5 xl:p-5">
          <div className="flex-shrink-0">
          </div>
          <p className="hidden text-black dark:text-white sm:block">Google</p>
        </div> */}

        <div className="flex items-center justify-center p-2.5 xl:p-5">
          <p className="text-black dark:text-white">{average}</p>
        </div>

        <div className="flex items-center justify-center p-2.5 xl:p-5">
          <p className="text-meta-3">{minValue}</p>
        </div>

        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
          <p className="text-black dark:text-white">{maxValue}</p>
        </div>

        {/* <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
          <p className="text-meta-5">4.8%</p>
        </div> */}
      </div>
    </div>
    <div>
    <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
      Positions
    </h4>
    <div className="flex flex-wrap gap-3 justify-center p-5">
    <button
            onClick={() => setPodAddress('All')}
              className={`inline-flex items-center justify-center rounded-full ${podAddress === 'All' ? 'bg-[#687583]'  : 'bg-[#1c2434]'} py-2 px-5 text-center font-medium text-[#FFF] hover:bg-opacity-90 focus:bg-[#687583]`}
            >
              All
            </button>
            {
              Array.isArray(getDynamicPodAddress) && getDynamicPodAddress.length > 0 && getDynamicPodAddress.map((item,i) => {
                return (
                  <button
                  key={item.podAddress + i}
            onClick={() => setPodAddress(item.podAddress)}
              className={`inline-flex items-center justify-center rounded-full ${podAddress === item.podAddress ? 'bg-[#687583]' : 'bg-[#1c2434]' }    py-2 px-5 text-center font-medium hover:bg-opacity-90 focus:bg-[#687583]`}
            style={{
              color: item.podColor ? Bashcolors[item.podColor] : undefined
            }}
            >
              {item.podAddress}
            </button>
                )
              })
            }
            {/* <button
            onClick={() => setPodAddress('First')}
              className={`inline-flex items-center justify-center rounded-full ${podAddress === 'First' ? 'bg-[#687583]' : 'bg-[#1c2434]' }    py-2 px-5 text-center font-medium text-[#D32F2F] hover:bg-opacity-90 focus:bg-[#687583]`}
            >
              Back Left
            </button>
            <button
            onClick={() => setPodAddress('Second')}
              className={`inline-flex items-center justify-center rounded-full ${podAddress === 'Second' ? 'bg-[#687583]' : 'bg-[#1c2434]' }  py-2 px-5 text-center font-medium text-[#0ED989] hover:bg-opacity-90 focus:bg-[#687583]`}
            >
              Back Right
            </button>
            <button
            onClick={() => setPodAddress('Third')}
              className={`inline-flex items-center justify-center rounded-full ${podAddress === 'Third' ? 'bg-[#687583]' : 'bg-[#1c2434]'} py-2 px-5 text-center font-medium text-[#0828F8] hover:bg-opacity-90 focus:bg-[#687583]`}
            >
              Front Left
            </button>
            <button
            onClick={() => setPodAddress('Fourth')}
              className={`inline-flex items-center justify-center rounded-full ${podAddress === 'Fourth' ? 'bg-[#687583]' : 'bg-[#1c2434]'} py-2 px-5 text-center font-medium text-[#F2DA07] hover:bg-opacity-90 focus:bg-[#687583]`}
            >
              Front Right
            </button>
            <button
            onClick={() => setPodAddress('Fifth')}
              className={`inline-flex items-center justify-center rounded-full ${podAddress === 'Fifth' ? 'bg-[#687583]' : 'bg-[#1c2434]'} py-2 px-5 text-center font-medium text-[#F89208] hover:bg-opacity-90 focus:bg-[#687583]`}
            >
              Side Left
            </button>
            <button
            onClick={() => setPodAddress('Sixth')}
              className={`inline-flex items-center justify-center rounded-full ${podAddress === 'Sixth' ? 'bg-[#687583]' : 'bg-[#1c2434]'} py-2 px-5 text-center font-medium text-[#6937C7] hover:bg-opacity-90 focus:bg-[#687583]`}
            >
              Side Right
            </button> */}
            
    </div>
    </div>
    </div>

  </div>
  )
}
