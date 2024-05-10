import {Datus} from 'datus.js'
import {routes} from '../router/routes'
import {getSchemasFromStorage} from '../storage/storage'
import {ComponentConstructor} from '../types/types'
import {containerID, levels, symbols, boxSize} from '../env/env'

export class ViewBuilder implements ComponentConstructor {
    key = ''
    
    constructor(key) {
        this.key = key
    }

    build() {
        const container = document.getElementById(containerID)
        const datus = new Datus()

        let navbar = document.createElement('div')
        let navItems = routes.filter(el => el.isVisible)
        let headline = document.createElement('h2')        

        navbar.classList.add('navbar')

        for (let i = 0; i < navItems.length; i++) {
            let {title, url} = navItems[i]
            let item = document.createElement('div')
            let link = document.createElement('a')

            item.classList.add('navbar__item')
            link.setAttribute('href', url)
            link.textContent = title

            item.appendChild(link)

            navbar.appendChild(item)
        }

        container.appendChild(navbar)
        container.appendChild(headline)

        if (this.key === '/') {
            headline.textContent = 'Welcome to Calcitus.js'

            const description = document.createElement('p')
            const saveBtn = document.createElement('button')
            const deleteBtn = document.createElement('button')
            const btnContainer = document.createElement('div')
            const timeArea = document.createElement('p')
            const canvas = document.createElement('canvas')

            description.textContent = 'Solve different mathematic tasks'

            saveBtn.id = 'save-result'
            saveBtn.textContent = 'Save Result'

            deleteBtn.id = 'delete-result'
            deleteBtn.textContent = 'Delete All'

            btnContainer.classList.add('items_small')

            timeArea.textContent = datus.timestamp()

            canvas.id = 'chart'

            container.appendChild(description)
            container.appendChild(canvas)
            btnContainer.appendChild(deleteBtn)
            btnContainer.appendChild(saveBtn)
            container.appendChild(timeArea)
            container.appendChild(btnContainer)
            
        } else if (this.key === '/schemas') {
            headline.textContent = 'Math Schemas'
        
            let schemas = getSchemasFromStorage()

            let schemasContainer = document.createElement('div')
            let select = document.createElement('select')
            let taskArea = document.createElement('p')
            let valueInp = document.createElement('input')
            let checkBtn = document.createElement('button')

            schemasContainer.classList.add('schemas')
            select.id = 'task-level'
            taskArea.classList.add('task-area')
            taskArea.textContent = 'Current Task'
            valueInp.id = 'task-inp'
            valueInp.setAttribute('type', 'text')
            checkBtn.classList.add('check-btn')

            valueInp.placeholder = 'Enter value'
            checkBtn.textContent = 'Check'

            levels.forEach(el => {
                let option = document.createElement('option')

                option.value = el
                option.textContent = el

                select.appendChild(option)
            })

            for (let i = 0; i < schemas.length; i++) {
                let value = schemas[i]
                let item = document.createElement('div')
                let headline = document.createElement('h3')
                let content = document.createElement('b')
                let level = document.createElement('p')

                item.classList.add('schema')
                item.setAttribute('title', value.title)
                item.setAttribute('level', value.level)
                headline.textContent = value.title
                content.textContent = value.content + ' = ?'
                level.textContent = `Level: ${value.level}`

                item.appendChild(headline)
                item.appendChild(level)
                item.appendChild(content)

                schemasContainer.appendChild(item)
            }

            container.appendChild(schemasContainer)
            container.appendChild(select)
            container.appendChild(taskArea)
            container.appendChild(valueInp)
            container.appendChild(checkBtn)
        
        } else if (this.key === '/lines') {
            headline.textContent = 'Math Lines'

            const taskArea = document.createElement('p')
            const select = document.createElement('select')
            const input = document.createElement('input')
            const rangeArea = document.createElement('p')
            const range = document.createElement('input')
            const btn = document.createElement('button')

            taskArea.classList.add('task-area')
            select.id = 'task-symbol'
            input.id = 'task-value'
            input.setAttribute('type', 'text')
            input.placeholder = 'Enter number'
            rangeArea.id = 'range-data'
            rangeArea.textContent = 'Digit order'
            range.id = 'task-range'
            range.setAttribute('type', 'range')
            //@ts-ignore
            range.value = 20
            btn.id = 'task-check'
            btn.textContent = 'Check'

            symbols.map(el => {
                let option = document.createElement('option')

                option.value = el
                option.textContent = el

                select.appendChild(option)
            })

            container.appendChild(taskArea)
            container.appendChild(select)
            container.appendChild(input)
            container.appendChild(rangeArea)
            container.appendChild(range)
            container.appendChild(btn)

        } else if (this.key === '/box') {

            headline.textContent = `Math Box ${boxSize}x${boxSize}`

            const boxContainer = document.createElement('div')
            const taskArea = document.createElement('p')
            const input = document.createElement('input')
            const btn = document.createElement('button')

            boxContainer.classList.add('box')

            for (let i = 0; i < boxSize; i++) {
                for (let j = 0; j < boxSize; j++) {
                    const boxItem = document.createElement('div')

                    boxItem.classList.add('box__item')
                    boxItem.setAttribute('column', String(j))
                    boxItem.setAttribute('row', String(i))
                    boxItem.textContent = '*'

                    boxContainer.appendChild(boxItem)
                }
            }

            taskArea.classList.add('task-area')
            taskArea.textContent = 'Current Task'
            
            input.classList.add('task-inp')
            input.setAttribute('type', 'text')
            input.placeholder = 'Your answer'
            btn.id = 'btn-check'
            btn.textContent = 'Check'

            container.appendChild(boxContainer)
            container.appendChild(taskArea)
            container.appendChild(input)
            container.appendChild(btn)
        }
    }
}   