import {fromEvent} from 'rxjs'
import {Datus} from 'datus.js'
import {generateTask} from '../../engine/engine'
import {getSchemasFromStorage, updateCurrentSession, checkCurrentSession} from '../../storage/storage'
import {ComponentContainer} from '../ComponentContainer'
import {ComponentConstructor, GameTitles} from '../../types/types'

export class Schemas extends ComponentContainer implements ComponentConstructor {

    constructor() {
        super(window.location.pathname)

        this.render()
    }

    init() {
        const select = document.getElementById('task-level')
        const area = document.querySelector('.task-area')
        const input = document.getElementById('task-inp')
        const btn = document.querySelector('.check-btn')

        const schemasAPI = getSchemasFromStorage()
        const datus = new Datus()

        let schemas = document.querySelector('.schemas').childNodes
        let task = ''
        let level = 'Easy'
        let checkValue = 0
        let inpValue = 0
        let award = 0
        let allPoints = checkCurrentSession(GameTitles.Schemas)

        schemas.forEach(el => {
        //@ts-ignore
            if (el.getAttribute('level') !== level) {
                //@ts-ignore
                el.classList.add('unvisible')
            } else {
                //@ts-ignore
                el.classList.remove('unvisible')
            }               
        })
        
        schemas.forEach(el => {
            el.addEventListener('click', () => {
                //@ts-ignore
                let title = el.getAttribute('title')

                let schema = schemasAPI.find(el => el.title === title)

                if (schema !== undefined) {
                    const {text, value, points} = generateTask(schema, 2)
                
                    task = text
                    checkValue = value
                    award = points

                    area.textContent = `Current Task: ${task}, Points: ${allPoints}`
                }
            })
        })

        select.addEventListener('input', e => {
            //@ts-ignore
            level = e.target.value
            
            schemas.forEach(el => {
            //@ts-ignore
                if (el.getAttribute('level') !== level) {
                    //@ts-ignore
                    el.classList.add('unvisible')
                } else {
                    //@ts-ignore
                    el.classList.remove('unvisible')
                }               
            })
        })

        input.addEventListener('input', e => {
            //@ts-ignore
            inpValue = e.target.value
        })

        fromEvent(btn, 'click').subscribe(() => {
            //@ts-ignore
            let inputValue = parseInt(inpValue)
          
            if (inputValue === checkValue) {
                allPoints += award

                updateCurrentSession({game: GameTitles.Schemas, points: allPoints, timestamp: datus.timestamp()})
            }

            area.textContent = 'Current Task'
            //@ts-ignore
            input.value = ''
            award = 0
        })
    }
}