import $ from 'jquery'
import {fromEvent, interval, take} from 'rxjs'
import {getCurrentSession, updateGameResults, initialGameResults, deleteGameResults} from '../../storage/storage'
import {ComponentContainer} from '../ComponentContainer'
import {ComponentConstructor} from '../../types/types'

export class Welcome extends ComponentContainer implements ComponentConstructor {

    constructor() {
        super(window.location.pathname)

        this.render()       
    }

    init() {
        const saveBtn = $('#save-result')     
        const deleteBtn = $('#delete-result')       
        const canvas = document.getElementById('chart')
        
        let results = initialGameResults()

        const WIDTH = 600
        const HEIGHT = 200
        const ROWS = 10
        const SCALE = 2
        const DPI_WIDTH = WIDTH * SCALE
        const DPI_HEIGHT = HEIGHT * SCALE
        const COLUMNS = DPI_WIDTH / 1e2
        const STEP = DPI_HEIGHT / ROWS

        //@ts-ignore
        const ctx = canvas.getContext('2d')

        canvas.style.width = WIDTH + 'px'
        canvas.style.height = HEIGHT + 'px'

        //@ts-ignore
        canvas.width = DPI_WIDTH
         //@ts-ignore
        canvas.height = DPI_HEIGHT

        ctx.beginPath()
        ctx.strokeStyle = '#ccc'
        ctx.font = 'normal 1.2rem Lato, sans-serif'
        ctx.fillStyle = '#333333'

        for (let i = 1; i <= ROWS; i++) {
            const y = STEP * i 

            ctx.fillText((DPI_HEIGHT - y)*1e-1, 5, y - 5)
            ctx.moveTo(0, y)
            ctx.lineTo(DPI_WIDTH, y)
        }

        for (let i = 1; i <= COLUMNS; i++) {
            const x = 1e2 * i 

            if (i - 1 < results.length) {
                const {game, points} = results[i - 1]
                let y = DPI_HEIGHT - points * 1e1 - 15

                if (i > 1) {
                    let prevPoints = results[i - 2].points

                    if (prevPoints > points) {
                        y += 40
                    } 
                }
                
                ctx.fillText(game, x - 30, y)
            }
         
            ctx.moveTo(x, 0)
            ctx.lineTo(x, DPI_HEIGHT)
        }

        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.lineWidth = 4
        ctx.strokeStyle = '#125999'

        // dots of results

        let rectX = results.length * 1e2 + 5e1
        let rectY = DPI_HEIGHT / 2
        let rectSide = 0

        results.map((el, idx) => {
            let x = (idx + 1) * 1e2
            let y = DPI_HEIGHT - el.points * 1e1

            rectSide += el.points

            ctx.lineTo(x, y)
            ctx.arc(x + 5, y, 10, 0, Math.PI * 2, true)
        })

        ctx.strokeRect(rectX, rectY, rectSide, rectSide / 2)
        ctx.fillText(`${rectSide} points`, rectX + .5e1, rectY + rectSide / 4)

        ctx.stroke()
        ctx.closePath()

        fromEvent(saveBtn, 'click').subscribe(() => {
            const session = getCurrentSession()
            
            if (session !== null) {
                updateGameResults({...session})
            }

            window.location.reload()
        })

        fromEvent(deleteBtn, 'click').subscribe(() => {
            deleteGameResults()
            window.location.reload()
        })
    
        interval(1e3).pipe(take(5)).subscribe(() => {
            console.log('Here are results', results)
        })
    }
}