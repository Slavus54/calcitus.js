import {fromEvent} from 'rxjs'
import {Datus} from 'datus.js'
import {generateBox, boxPart} from '../../engine/engine'
import {updateCurrentSession, checkCurrentSession} from '../../storage/storage'
import {ComponentContainer} from '../ComponentContainer'
import {ComponentConstructor, GameTitles} from '../../types/types'

export class Box extends ComponentContainer implements ComponentConstructor {

    constructor() {
        super(window.location.pathname)

        this.render()       
    }

    init() {

        const box = document.querySelector('.box')
        const parts = box.childNodes
        const area = document.querySelector('.task-area')
        const input = document.querySelector('.task-inp')
        const btn = document.getElementById('btn-check')

        const datus = new Datus()
       
        let power = 2
        let value = 0
        let points = checkCurrentSession(GameTitles.Box)
        let pickedParts = []
        let nums = generateBox(power)

        const onParts = () => {
            parts.forEach(el => {
                //@ts-ignore
                let column = Number(el.getAttribute('column'))
                //@ts-ignore
                let row = Number(el.getAttribute('row'))
    
                let result = nums.find(num => num.column === column && num.row === row)
    
                if (result !== undefined) {
                    //@ts-ignore
                    el.textContent = result.num
    
                    el.addEventListener('click', () => {   
                        
                        if (pickedParts.length < 2) {
                            //@ts-ignore
                            el.classList.add('box__item-active')
    
                            pickedParts = [...pickedParts, Number(el.textContent)]
    
                            if (pickedParts.length === 2) {
    
                                let task = boxPart(pickedParts[0], pickedParts[1])
        
                                area.textContent = task
                            }
                        } 
                    })
                }            
            })
        }
        
        onParts()

        input.addEventListener('input', e => {
            //@ts-ignore
            let data = Number(e.target.value)

            value = isNaN(data) ? 0 : data 
        })

        fromEvent(btn, 'click').subscribe(() => {
            if (value === eval(area.textContent)) {
                points += power * 2
            
                updateCurrentSession({game: GameTitles.Box, points, timestamp: datus.timestamp()})
            }

            nums = generateBox(power)

            parts.forEach(el => {
                //@ts-ignore
                el.classList.remove('box__item-active')
                el.textContent = '*'
            })

            onParts()

            //@ts-ignore
            input.value = ''
            area.textContent = ''
            pickedParts = []
            value = 0
        })
    }
}