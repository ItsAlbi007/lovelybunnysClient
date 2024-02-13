import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> index
// axious default functionlaity is to send a get request
export const getAllBunnys = () => {
  return axios(`${apiUrl}/bunnys`)
}

// READ -> show
export const getOneBunny = (id) => {
  return axios(`${apiUrl}/bunnys/${id}`)
}

// CAREATE -> to add a bennyu
// UPDATE -> adjust a bunny
// DELETE -> set a bunny FREE