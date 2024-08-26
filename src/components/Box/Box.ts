import $ from 'jquery'
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
        const area = $('.task-area')
        const input = $('.task-inp')
        const btn = $('#btn-check')

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
        
                                area.text(task)
                            }
                        } 
                    })
                }            
            })
        }
        
        onParts()

        input.on('input', e => {
            //@ts-ignore
            let data = Number(e.target.value)

            value = isNaN(data) ? 0 : data 
        })

        fromEvent(btn, 'click').subscribe(() => {
            if (value === eval(area.text())) {
                points += power * 2
            
                updateCurrentSession({game: GameTitles.Box, points, timestamp: datus.now()})
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
            area.text('')
            pickedParts = []
            value = 0
        })
    }
}