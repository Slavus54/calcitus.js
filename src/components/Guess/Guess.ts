import {Datus} from 'datus.js'
import {generateGuessTask, checkGuessTask} from '../../engine/engine'
import {updateCurrentSession, checkCurrentSession} from '../../storage/storage'
import {ComponentContainer} from '../ComponentContainer'
import {ComponentConstructor, GameTitles} from '../../types/types'

export class Guess extends ComponentContainer implements ComponentConstructor {

    constructor() {
        super(window.location.pathname)

        this.render()
    }

    init() {
        const datus = new Datus()

        let text = document.querySelector('.task-area')
        let input = document.getElementById('task-value')
        let select = document.getElementById('select-side')
        let checkbox = document.getElementById('even-value')

        let generateBtn = document.getElementById('generate-btn')
        let checkBtn = document.getElementById('check-btn')

        let points = checkCurrentSession(GameTitles.Guess)
        let symbol = select.getAttribute('data-value')
        let isEven = false
        let value
        let toCompare

        input.addEventListener('input', e => {
            //@ts-ignore
            value = Number(e.target.value)
        })

        select.addEventListener('input', e => {
            //@ts-ignore
            symbol = e.target.value
        })
  
        checkbox.addEventListener('change', () => {
            //@ts-ignore
            isEven = checkbox.checked
        })

        generateBtn.addEventListener('click', () => {
            const data = generateGuessTask()
        
            toCompare = data.value
            text.textContent = data.task
        })

        checkBtn.addEventListener('click', () => {
            let award: number = checkGuessTask(toCompare, value, isEven, symbol)

            points += award

            updateCurrentSession({game: GameTitles.Guess, points, timestamp: datus.now()})

            text.textContent = 'Task will be here...'
            value = 0
        })
    }
}