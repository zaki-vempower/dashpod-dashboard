import CardTwo from '../../components/CardTwo'
import CardThree from '../../components/CardThree'
import CardFour from '../../components/CardFour'
import { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify';
import GetProfile from '../../graphqlQueries/GetProfile';
import { accountId } from '../../util';
import { useAtom } from 'jotai';
import { selectProfiles, useGraphData } from '../../store/dashboardAtom';
import { Button } from '@aws-amplify/ui-react';

export default function ProfileAnalyticsCard() {
    const [profile,setProfile] = useState([])
    const [graphData, setGraphData] = useAtom(useGraphData);
    const [,setselectProfiles] = useAtom(selectProfiles)
    const fetchProfile =async () => {
        const { data } = await API.graphql(graphqlOperation(GetProfile, { accountId: accountId })) as { data: {
            getProfiles: {
              status: string;
              data: {
                
              }
            }
          } };
          if (
            data?.getProfiles?.data &&
            data?.getProfiles?.status === "success"
          ) {
            // @ts-ignore
            setProfile(data.getProfiles.data);
          }
    }
    useEffect(() => {
        fetchProfile()
    },[])
    console.log('profile',graphData);
    
    return (
        <>
            {
                Array.isArray(graphData) && graphData.length > 0 && graphData.map((item: any) => {
                    return             <CardTwo firstName={item.playerName} lastName={item.lastName} playerId={item.recordId} activityName={item.activityName} rawData={item} />
                })
            }

            {/* <CardThree />
            <CardFour /> */}
            </>
    )
}
