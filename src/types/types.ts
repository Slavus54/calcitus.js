export interface RouterConstructor {
    routes: any[]
}

export interface RouteItem {
    title: string
    url: string
    component: any
    isVisible: boolean
}

export interface ComponentConstructor {
    key: string
    childs?: string[]
}

export interface SchemaType {
    title: string
    level: string
    content: string
    marker: string
}

export interface TaskResult {
    text: string
    value: number
    points: number
}

export interface LineResult {
    text: string    
    start: number
    end: number
}

export interface TextTaskResult {
    text: string
    value: number
    points: number
}

export interface BoxItem {
    column: number
    row: number
    num: number
}

export interface CheckLineType {
    start: number
    end: number
    symbol: string
    value: number
}

export interface SessionType {
    game: string
    points: number
    timestamp: string
}

export enum GameTitles {
    Schemas = 'Schemas',
    Lines = 'Lines',
    Box = 'Box',
    Text = 'Text'
}

export type CheckStorageType = (title: string, isSession: boolean) => boolean 

export type GeneratingNum = (power: number) => number

export type TextTaskGenerator = (content: string) => TextTaskResult