// this modal is rendered by the bunny Show component
// the state that controls this modal (show) will live in the bunnyShow component(the parent of this modal)
// the state, as well as the updater function for that state, will be passed to this modal as props
// other props that we will need, are  the user, updatebunny, msgAlert, and triggerRefresh

import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import BunnyForm from '../shared/BunnyForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditBunnyModal = (props) => {
    // pull the important things from our props
    const { user, show, handleClose, updateBunny, msgAlert, triggerRefresh } = props
    // we're bringing in the bunny from props, but only for the initial state
    // by using the original bunny as our initial state for a NEW piece of state, specific to this component (called bunny), we'll be able to modify the bunny we are updating without affecting the original state in the parent component
    const [bunny, setBunny] = useState(props.bunny)

    const onChange = (e) => {
        e.persist()

        setBunny(prevBunny => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            if (updatedName === 'forsale' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'forsale' && !e.target.checked) {
                updatedValue = false
            }
            const updatedBunny = { [updatedName] : updatedValue }
            return {
                ...prevBunny, ...updatedBunny
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        // make the API call
        updateBunny(user, bunny)
            // close the modal
            .then(() => handleClose())
            // message the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.updateBunnySuccess,
                    variant: 'success'
                })
            })
            // trigger a refresh
            .then(() => triggerRefresh())
            // send error message if applicable
            .catch(() => {
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
                <BunnyForm 
                    bunny={bunny}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update Bunny"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditBunnyModal