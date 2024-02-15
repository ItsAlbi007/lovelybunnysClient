// this modal is rendered by the SnackShow component
// the state that controls the modal, whether the modal is open or not, will live in the SnackShow component(this modal's parent component)
// the state AND the updaterFunction associated with that state, will be passed here as a prop.

// we'll also use an instance of our reusable SnackForm
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import SnackForm from '../shared/SnackForm'
import messages from '../shared/AutoDismissAlert/messages'
import { updateSnack } from '../../api/snack'

const EditSnackModal = (props) => {
    const { user, show, handleClose, msgAlert, triggerRefresh, bunny } = props
    // we're bringing in the snack from props, but only for the initial state
    // by using the original snack as our initial state for a NEW piece of state, specific to this component (called snack), we'll be able to modify the snack we are updating without affecting the original state in the parent component
    const [snack, setSnack] = useState(props.snack)

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
        // make the API call
        updateSnack(user, bunny, snack)
            // close the modal
            .then(() => handleClose())
            // message the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.updateSnackSuccess,
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
                <SnackForm 
                    snack={snack}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update Snack"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditSnackModal