import $ from 'jquery'
import {fromEvent} from 'rxjs'
import Centum from 'centum.js'
import {Datus} from 'datus.js'
import {generateLine, checkLine} from '../../engine/engine'
import {updateCurrentSession, checkCurrentSession} from '../../storage/storage'
import {ComponentContainer} from '../ComponentContainer'
import {ComponentConstructor, GameTitles} from '../../types/types'
import {pointsLimit} from '../../env/env'

export class Lines extends ComponentContainer implements ComponentConstructor {

    constructor() {
        super(window.location.pathname)

        this.render()
    }

    init() {
        const area = $('.task-area')
        const select = $('#task-symbol')
        const input = $('#task-value')
        const rangeArea = $('#range-data')
        const range = $('#task-range')
        const btn = $('#task-check')

        const centum = new Centum()
        const datus = new Datus()

        let power = 2
        let symbol = '+'
        let value = 0
        let start = 0
        let end = 0
        let points = checkCurrentSession(GameTitles.Lines)

        const line = generateLine(power)
       
        area.text(line.text)
        start = line.start
        end = line.end
        rangeArea.text(`Digit Order: ${power}`)

        select.on('input', e => {
            //@ts-ignore
            symbol = e.target.value
        })

        input.on('input', e => {
            //@ts-ignore
            let data = parseInt(e.target.value)
            
            value = isNaN(data) ? 0 : data
        })

        range.on('input', e => {
            //@ts-ignore
            power = centum.part(e.target.value, pointsLimit, 0)

            rangeArea.text(`Digit Order: ${power}`)
        })

        fromEvent(btn, 'click').subscribe(() => {
            let result = checkLine({start, end, symbol, value})

            if (result) {
                points += power

                updateCurrentSession({game: GameTitles.Lines, points, timestamp: datus.timestamp()})
            }

            const line = generateLine(power)

            area.text(line.text)
            start = line.start
            end = line.end
        })       
    }
}