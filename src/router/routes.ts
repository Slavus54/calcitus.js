import {Welcome} from '../components/Welcome/Welcome'
import {Schemas} from '../components/Schemas/Schemas'
import {Lines} from '../components/Lines/Lines'
import {Box} from '../components/Box/Box'
import {Text} from '../components/Text/Text'
import {Guess} from '../components/Guess/Guess'

import {RouteItem} from '../types/types'

export const routes: RouteItem[] = [
    {
        title: 'Home',
        url: '/',
        component: Welcome,
        isVisible: true
    },
    {
        title: 'Schemas',
        url: '/schemas',
        component: Schemas,
        isVisible: true
    },
    {
        title: 'Lines',
        url: '/lines',
        component: Lines,
        isVisible: true
    },
    {
        title: 'Box',
        url: '/box',
        component: Box,
        isVisible: true
    },
    {
        title: 'Text',
        url: '/text',
        component: Text,
        isVisible: true
    },
    {
        title: 'Guess',
        url: '/guess',
        component: Guess,
        isVisible: true
    }
]