import { createAsyncAction } from 'redux-action-tools'
import fetch from '../../libs/fetch'

export const ASYNC_MOCK = 'ASYNC_MOCK'
export const asyncMock = createAsyncAction(ASYNC_MOCK, () => fetch('http://m.jupaionline.com/api/apiVersion/mobile/v5/util/appversion'))
