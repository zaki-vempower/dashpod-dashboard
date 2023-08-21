import { useAtom } from 'jotai';
import Select, { MultiValue } from 'react-select';
import makeAnimated from 'react-select/animated';
import { filterActivity, filterDuration, filterPlayers, filterSubmit, useGraphData } from '../../store/dashboardAtom';
import { useMemo, useRef } from 'react';


const animatedComponents = makeAnimated();


/**
 * Description
 * @param {any} fl - Fliter list
 * @param {any} gd - Graph Data List
 * @param {any} k - Activity Name
 * @returns {any}
 */
const getListvalue = (fl: string[], gd: any[], k: string, pk: string): any => {
    const newList: any = []
    gd.forEach(element => {
        if (fl.includes(element[pk])) {
            newList.push(element)
        }
    });

    const getData = [...new Set(newList.map((item: any) => item[k]))].map((item) => ({
        value: item,
        label: typeof item === 'string' ? item.toUpperCase() : item,
    }))

    return getData
}


export default function FilterCard() {
    const [filterPlayerList, setFilterPlayers] = useAtom(filterPlayers)
    const [filterActivityList, setFilterActivityList] = useAtom(filterActivity)
    const [filterDurationList, setFilterDurationList] = useAtom(filterDuration)
    const [graphData,] = useAtom(useGraphData);
    const [, setFilterSubmit] = useAtom(filterSubmit)
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const { filterPlayerOptions, filterActivityOptions, duration } = useMemo(() => {
        const filterPlayerKey = 'playerName'
        const filterActivityName = 'activityName'
        // const arrayUniqueByKey = [...new Map(graphData.map((item: any) =>
        //     [item[filterKey], item])).values()];
        const filterPlayerOptions = [...new Set(graphData.map((item: any) => item[filterPlayerKey]))].map((item) => ({
            value: item,
            label: typeof item === 'string' ? item.toUpperCase() : item,
        }))
        const filterActivityOptions = Array.isArray(filterPlayerList) && filterPlayerList.length > 0 ? getListvalue(filterPlayerList.map(item => item?.value), graphData, filterActivityName, filterPlayerKey) : [...new Set(graphData.map((item: any) => item[filterActivityName]))].map((item) => ({
            value: item,
            label: typeof item === 'string' ? item.toUpperCase() : item,
        }))


        const duration = [{
            value: 'week',
            label: 'Week'
        }, {
            value: 'month',
            label: 'Month'
        }]

        return {
            filterPlayerOptions,
            filterActivityOptions,
            duration
        } as {
            filterPlayerOptions: {
                value: string;
                label: string;
            }[];
            filterActivityOptions: {
                value: string;
                label: string;
            }[];
            duration: {
                value: string;
                label: string;
            }[];
        }

    }, [graphData, filterPlayerList])
    const setFilterChange = (r: MultiValue<unknown>) => {
        if (buttonRef.current !== null && "focus" in buttonRef.current) {
            buttonRef.current?.focus();
        }
        setFilterPlayers(r)

    }

    const setFilterActivityChange = (r: MultiValue<unknown>) => {
        if (buttonRef.current !== null && "focus" in buttonRef.current) {
            buttonRef.current?.focus();
        }
        setFilterActivityList(r)
    }

    const setSubmit = () => {
        setFilterSubmit({
            filterPlayers: filterPlayerList.map((it: any) => it['value']),
            filterActivity: filterActivityList.map((it: any) => it['value']),
            // @ts-ignore
            filterDuration: filterDurationList.map((it: any) => it['value']),
        })
    }

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className='filterGrid'>
                <div className="">
                    <h3 className='text-lg font-semibold mb-2'>
                        Select Players
                    </h3>
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        // defaultValue={[filterPlayerOptions[2]]}
                        aria-label='Players'
                        onChange={(r) => setFilterChange(r)}
                        isMulti
                        className='text-[#64748b]'
                        options={filterPlayerOptions}
                    />
                </div>
                {/* <div className='flex flex-col'>
                    <h3></h3>
                    <div>
                        Players
                    </div>
                </div> */}
                <div className="">
                    <h3 className='text-lg font-semibold mb-2'>
                        Select Activity
                    </h3>
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        // defaultValue={[filterActivityOptions[2]]}
                        aria-label='Activity'
                        onChange={e => setFilterActivityChange(e)}
                        isMulti
                        options={filterActivityOptions}
                        className='text-[#64748b]'
                    />
                </div>
                <div className="">
                    <h3 className='text-lg font-semibold mb-2'>
                        Select Duration
                    </h3>
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        defaultValue={[]}
                        aria-label='Duration'
                        isMulti
                        onChange={e => {
                            if (e.length < 2) {
                                if (buttonRef.current !== null && "focus" in buttonRef.current) {
                                    buttonRef.current?.focus();
                                }
                                setFilterDurationList(e)
                            }
                        }}
                        className='text-[#64748b]'
                        options={duration}
                        value={filterDurationList}
                    />
                </div>
                {/* <div className='flex flex-col'>
                    <h3>Select Duration

                    </h3>
                    <div>
                        Duration
                    </div>
                </div> */}
            </div>
            <div className='w-[100%] flex flex-row justify-center items-center gap-2 m-3'>
                <button
                    className="inline-flex items-center justify-center rounded-md bg-[#d52905] focus:bg-[#e49b8c] py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-7"
                    onClick={setSubmit}
                    ref={buttonRef}
                >
                    Show Results
                </button>
            </div>
        </div>
    )
}
