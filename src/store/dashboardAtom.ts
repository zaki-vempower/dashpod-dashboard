import { atom } from 'jotai'
import { MultiValue } from 'react-select'
import { ProfileType } from './storeType'

export const  useGraphData = atom<any>([])
export const useProfiles = atom<any>([])
export const selectProfiles = atom<any>([])
export const userData = atom<any>({})
export const selectpodAddress = atom<"All" | string>("All")
export const filterPlayers = atom<MultiValue<unknown>>([])
export const filterActivity = atom<MultiValue<unknown>>([])
export const filterDuration = atom<unknown>([])
export const filterSubmit = atom<{
    filterPlayers: MultiValue<unknown>
    filterActivity: MultiValue<unknown>,
    filterDuration: 'week'[] | 'month'[]
} | undefined>(undefined)
export const useUserProfile = atom<ProfileType | null>(null)