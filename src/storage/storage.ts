import {CheckStorageType, SchemaType, SessionType} from '../types/types'
import {schemasStorageKey, sessionStorageKey, resultsStorageKey} from '../env/env' 

export const checkStorageValue: CheckStorageType = (title, isSession) => isSession ? sessionStorage.getItem(title) !== null : localStorage.getItem(title) !== null

export const getStorageValue = (title) => JSON.parse(localStorage.getItem(title))
export const updateStorageValue = (title, data) => localStorage.setItem(title, JSON.stringify(data))

export const getSchemasFromStorage = () => {
    let result: SchemaType[] = getStorageValue(schemasStorageKey)
    let flag: boolean = checkStorageValue(schemasStorageKey, false)

    return flag ? result : []
}

export const getCurrentSession = () => {
    let result: SessionType = JSON.parse(sessionStorage.getItem(sessionStorageKey))
    let flag: boolean = checkStorageValue(sessionStorageKey, true)

    return flag ? result : null
}

export const updateCurrentSession = ({game, points, timestamp} : SessionType) => {
    sessionStorage.setItem(sessionStorageKey, JSON.stringify({game, points, timestamp}))
}

export const checkCurrentSession = (title: string) => {
    let result: SessionType = JSON.parse(sessionStorage.getItem(sessionStorageKey))

    if (result?.game === title) {
        return result?.points
    }

    return 0
}

export const initialGameResults = () => {
    let result: SessionType[] = getStorageValue(resultsStorageKey)
    let flag: boolean = checkStorageValue(resultsStorageKey, false)

    if (!flag) {
        updateStorageValue(resultsStorageKey, [])
    }

    return flag ? result : []
}

export const updateGameResults = ({game, points, timestamp} : SessionType) => {
    let result: SessionType[] = getStorageValue(resultsStorageKey)

    updateStorageValue(resultsStorageKey, [...result, {game, points, timestamp}])

    sessionStorage.setItem(sessionStorageKey, null)
}

export const deleteGameResults = () => {
    updateStorageValue(resultsStorageKey, [])
}