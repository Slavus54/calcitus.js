import {Router} from './router/router'
import {routes} from './router/routes'
import schemas from './api/schemas.json'

import {getSchemasFromStorage, initialGameResults, updateStorageValue} from './storage/storage'

import {schemasStorageKey} from './env/env'

import './style.css'

let data = getSchemasFromStorage() 

if (data.length === 0) {
    updateStorageValue(schemasStorageKey, schemas)
}

initialGameResults()

new Router(routes)