import CardTwo from '../../components/CardTwo'
import CardThree from '../../components/CardThree'
import CardFour from '../../components/CardFour'
import { useEffect, useMemo, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify';
import GetProfile from '../../graphqlQueries/GetProfile';
import { accountId } from '../../util';
import { useAtom } from 'jotai';
import { filterSubmit, selectProfiles, useGraphData } from '../../store/dashboardAtom';
import { Button } from '@aws-amplify/ui-react';
import moment from 'moment';

function isDateWithinWeek(dateToCheck: moment.Moment) {
  const startOfWeek = moment().startOf('week');
  const endOfWeek = moment().endOf('week');
  return dateToCheck.isBetween(startOfWeek, endOfWeek, null, '[]'); // '[]' includes start and end dates
}

function isDateWithinMonth(dateToCheck: moment.Moment) {
  const startOfMonth = moment().startOf('month');
  const endOfMonth = moment().endOf('month');
  return dateToCheck.isBetween(startOfMonth, endOfMonth, null, '[]'); // '[]' includes start and end dates
}

export default function ProfileAnalyticsCard() {
  // const [profile, setProfile] = useState([])
  const [graphData, setGraphData] = useAtom(useGraphData);
  const [filterList,] = useAtom(filterSubmit)

  // console.log('profile', graphData, profile);
  const selectedGraphData = useMemo(() => {
    let newGraphdata: any[] = []
    if (Array.isArray(graphData) && graphData.length > 0) {
      newGraphdata = [...graphData]
    }
    if (filterList?.filterPlayers && filterList?.filterPlayers.length > 0) {
      const filterPlayerKey = 'playerName'
      const fl = filterList?.filterPlayers
      newGraphdata = newGraphdata.filter(item => fl.includes(item[filterPlayerKey]))
    }
    if (filterList?.filterActivity && filterList?.filterActivity.length > 0) {
      const filterActivityName = 'activityName'
      const fl = filterList?.filterActivity
      newGraphdata = newGraphdata.filter(item => fl.includes(item[filterActivityName]))
    }
    if (filterList?.filterDuration && filterList?.filterDuration.length > 0) {
      const value = filterList.filterDuration[0]
      newGraphdata = newGraphdata.filter(item => {
        console.log('dfdfdfdfdf',value,filterList.filterDuration)
        const getVal = value === 'week' ? isDateWithinWeek(moment.unix(item['dateAndTime'])) : value === 'month' ? isDateWithinMonth(moment.unix(item['dateAndTime'])) : true
        return getVal
      })

      // if(filterList?.filterDuration.value === 'week' ){
      //   newGraphdata = newGraphdata.filter(item => {
      //     console.log('dateAndTime',isDateWithinWeek(moment.unix(item['dateAndTime'])))
      //     return isDateWithinWeek(moment.unix(item['dateAndTime']))
      //   })
      // }
      // if(filterList?.filterDuration.value === 'month' ){
      //   newGraphdata = newGraphdata.filter(item => {
      //     console.log('dateAndTime',isDateWithinMonth(moment.unix(item['dateAndTime'])))
      //     return isDateWithinWeek(moment.unix(item['dateAndTime']))
      //   })
      // }
    }

    return newGraphdata
  }, [graphData, filterList])

  return (
    <>
      {
        Array.isArray(selectedGraphData) && selectedGraphData.length > 0 && selectedGraphData.map((item: any) => {
          return <CardTwo firstName={item.playerName} lastName={item.lastName} playerId={item.recordId} activityName={item.activityName} rawData={item} />
        })
      }

      {/* <CardThree />
            <CardFour /> */}
    </>
  )
}
