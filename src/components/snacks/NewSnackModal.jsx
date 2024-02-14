// this modal is rendered by the BunnyShow component
// the state that controls this modal, whether it's open or not, will live in BunnyShow
// the state, AND the updaterfunction associated with that state is passed here as a prop from BunnyShow

import React, {useState} from 'react'
import { Modal } from 'react-bootstrap'
import SnackForm from '../shared/SnackForm'
// if we want custom messages, import those here
import messages from '../shared/AutoDismissAlert/messages'
// we'll need an api call to make this modal work, that'll be imported here
import { createSnack } from '../../api/snack'

// we'll also need the same props we're passing to the SnackForm, if they come from the parent

const NewSnackModal = (props) => {
    const { bunny, show, handleClose, msgAlert, triggerRefresh } = props
    // new piece of state, snack, initial value is an empty object
    // we will build this object out, using our handleChange function
    const [snack, setSnack] = useState({})

    const onChange = (e) => {
        e.persist()
        setSnack(prevSnack => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (updatedName === 'isSqueaky' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'isSqueaky' && !e.target.checked) {
                updatedValue = false
            }

            const updatedSnack = { [updatedName] : updatedValue }

            return {
                ...prevSnack, ...updatedSnack
            }
        })
    }
    
    const onSubmit = (e) => {
        e.preventDefault()

        // make our api call
        createSnack(bunny, snack)
            // then close the modal
            .then(() => handleClose())
            // notify our user that it was a success
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.createSnackSuccess,
                    variant: 'success'
                })
            })
            // refresh the parent page(component)
            .then(() => triggerRefresh())
            .then(() => setSnack({}))
            // if error, tell the user
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })

    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <SnackForm 
                    snack={snack}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading={`Give ${bunny.name} a snack!`}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewSnackModal