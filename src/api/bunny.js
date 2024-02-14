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

// CAREATE -> to add a benny
export const createBunny = (user, newBunny) => {
  return axios({
    url: `${apiUrl}/bunnys`,
    method: 'POST',
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data: { bunny: newBunny }
  })
}

// UPDATE -> adjust a bunny
export const updateBunny = (user, updatedBunny) => {
  return axios({
      url: `${apiUrl}/bunnys/${updatedBunny._id}`,
      method: 'PATCH',
      headers: {
          Authorization: `Token token=${user.token}`
      },
      data: { bunny: updatedBunny }
  })
}
// DELETE -> set a bunny FREE
export const removeBunny = (user, id) => {
  return axios({
      url: `${apiUrl}/bunnys/${id}`,
      method: 'DELETE',
      headers: {
          Authorization: `Token token=${user.token}`
      }
  })
}