import $ from 'jquery'
import {fromEvent} from 'rxjs'
import {Datus} from 'datus.js'
import {generateTextTask} from '../../engine/engine'
import {updateCurrentSession, checkCurrentSession} from '../../storage/storage'
import {ComponentContainer} from '../ComponentContainer'
import {ComponentConstructor, GameTitles} from '../../types/types'
export class Text extends ComponentContainer implements ComponentConstructor {

    constructor() {
        super(window.location.pathname)

        this.render()
    }

    init() {
        const textArea = $('.task-text')
        const taskArea = $('.task-area')
        const input = $('#task-value')
        const generateBtn = $('#task-generate') 
        const checkBtn = $('#task-check') 

        const datus = new Datus()

        let textareaValue = ''
        let checkValue = 0
        let inpValue = 0
        let taskPoints = 0
        let points = checkCurrentSession(GameTitles.Text)

        textArea.on('input', e => {
            //@ts-ignore
            textareaValue = e.target.value
        })

        generateBtn.on('click', () => {
            //@ts-ignore
            const {text, value, points} = generateTextTask(textareaValue)
   
            taskArea.text(text)
            checkValue = value
            taskPoints = points
        })

        input.on('input', e => {
            //@ts-ignore
            inpValue = e.target.value
        })

        fromEvent(checkBtn, 'click').subscribe(() => {
            //@ts-ignore
            let inputValue = parseInt(inpValue)
           
            if (inputValue === checkValue) {
                points += taskPoints

                updateCurrentSession({game: GameTitles.Text, points, timestamp: datus.now()})
            }

   
            taskArea.text('Task will be here...')
            textArea.val('')
            input.val('')
        })
    }
}