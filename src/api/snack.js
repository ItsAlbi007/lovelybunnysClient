import apiUrl from '../apiConfig'
import axios from 'axios'

// Create snack
// POST	/snacks/:bunnyId	
export const createSnack = (bunny, newSnack) => {
    return axios({
        url: `${apiUrl}/snacks/${bunny._id}`,
        method: 'POST',
        data: { snack: newSnack }
    })
}

// Update snack
// PATCH	/snacks/:bunnyId/:snackId	
export const updateSnack = (user, bunny, updatedSnack) => {
    return axios({
        url: `${apiUrl}/snacks/${bunny._id}/${updatedSnack._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { snack: updatedSnack }
    })
}

// Delete snack
// DELETE	/snacks/:bunnyId/:snackId	
export const removeSnack = (user, bunnyId, snackId) => {
    return axios({
        url: `${apiUrl}/snacks/${bunnyId}/${snackId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}