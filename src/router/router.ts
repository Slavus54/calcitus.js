import {RouterConstructor} from '../types/types'

export class Router implements RouterConstructor {
    routes = []

    constructor(routes) {
        this.routes = routes
        this.init()
    }

    init() {
        this.routes.map(el => {
            if (el.url === window.location.pathname) {
                let instance = new el.component()

                instance.init()
            }
        })
    }
}