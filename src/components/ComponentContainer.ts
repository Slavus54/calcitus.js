import {ViewBuilder} from '../view/ViewBuilder'
import {ComponentConstructor} from '../types/types'

export class ComponentContainer implements ComponentConstructor {
    key = ''

    constructor(key) {
        this.key = key
    }

    render() {
        const view = new ViewBuilder(this.key)

        view.build()
    }
}