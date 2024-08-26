import {SchemaType, TaskResult, LineResult, BoxItem, CheckLineType, TextTaskGenerator, GeneratingNum} from '../types/types'
import {levels, marker, symbols, boxSize} from '../env/env'

export const generateTask = (schema: SchemaType, power: number) : TaskResult => {
    const {level, content, marker} = schema
    
    let points = countPoints(level, content, marker)
    let text = textReplace(content, marker, power)
    let value = eval(text)

    return {text, value, points}
}

export const generateLine = (power: number): LineResult => {
    let start: number = getNum(power)
    let end: number = getNum(power)
    let text: string = `${start} ? = ${end}`

    return {text, start, end}
}

export const generateBox = (power: number) : BoxItem[] => {
    let results = []
    let border = (boxSize - 1)

    for (let i = 0; i < boxSize; i++) {
        let column = Math.floor(border * Math.random())
        let row = Math.floor(border * Math.random())
        let num = getNum(power)

        results = [...results, {column, row, num}]
    }

    return results
}

export const boxPart = (first: number, second: number) => {
    let symbol = getRandomSymbol()

    return `${first}${symbol}${second}`
}

export const checkLine = ({start, end, symbol, value}: CheckLineType) => {
    let result: number = eval(`${start} ${symbol} ${value}`)

    return result === end
}

export const generateTextTask: TextTaskGenerator = (content) => {
    let text: string = ''

    content.split(' ').map(el => {
        let value: number = el.length
        let symbol = getRandomSymbol()

        text += `${value}${symbol}`
    })

    text = text.slice(0, text.length - 1)

    return {text, value: eval(text), points: Math.floor(text.length / 2)}
}

export const generateGuessTask = (base = 1e2) => {
    let task = `${Math.floor(base * Math.random())}${getRandomSymbol()}${Math.floor(base * Math.random())}`
    let value = eval(task)

    return {task, value}
}

export const checkGuessTask = (value = 1, answer = 1, isEven = true, symbol = '>') => {
    let points = 0

    if (eval(`${answer}${symbol}${value}`)) {
        let difference = Math.abs(value - answer)
        let percent = difference < value ? Math.round(2e1 - (difference / value) * 2e1) : 0
        
        points += answer % 2 === 0 && isEven && 5
        points += answer % 2 !== 0 && !isEven && 5
        points += percent
    }

    return points
}

const getRandomSymbol = () => symbols[Math.floor(symbols.length * Math.random())]

const countPoints = (level: string, content: string, marker: string) => {
    let result = levels.indexOf(level) + 1

    result += textReplace(content, marker, 1).length - 1
    result = Math.floor(result / 2)

    return result
}

const getNum: GeneratingNum = (power) => {
    let dateValue = Math.floor(Date.now() % 10**power * Math.random()) + 1

    return dateValue
}

const textReplace = (text: string, from: string, power?: number) => {
    let parts = text.split(from).join(marker).split('')
    let result = ''

    for (let i = 0; i < parts.length; i++) {
        let value = parts[i]

        result += value === marker ? getNum(power) : value
    }

    return result
}