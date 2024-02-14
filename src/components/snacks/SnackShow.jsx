// This card will be used to display the snacks of a bunny.
// the bunny's snacks array will be mapped, producing one of these components for every snack in the array
import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { removeSnack } from '../../api/snack'
import messages from '../shared/AutoDismissAlert/messages'
import EditSnackModal from '../snacks/EditSnackModal'

const SnackShow = (props) => {
    // for the first iteration of this component, we'll only need one prop - the snack
    const { snack, user, bunny, triggerRefresh, msgAlert } = props

    // hook used to display/hide our modal
    const [editModalShow, setEditModalShow] = useState(false)

    const setBgCondition = (cond) => {
        // a snack can either be new, used, or disgusting
        if (cond === 'new') {
            return ({width: '18rem', backgroundColor: '#b5ead7'})
        } else if (cond === 'used') {
            return ({width: '18rem', backgroundColor: '#ffdac1'})
        } else {
            return ({width: '18rem', backgroundColor: '#ff9aa2'})
        }
    }

    // the api calling function that destroys a snack
    const destroySnack = () => {
        // we want to remove the snack
        removeSnack(user, bunny._id, snack._id)
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.deleteSnackSuccess,
                    variant: 'success'
                })
            })
            // refresh the page
            .then(() => triggerRefresh())
            // if err, send err msg
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Card className='m-2' style={setBgCondition(snack.condition)}>
            <Card.Header>{snack.name}</Card.Header>
            <Card.Body>
            <small>{snack.description}</small><br/>
            <small>{snack.isSqueaky ? 'squeak squeak' : 'stoic silence'}</small>
            </Card.Body>
            <Card.Footer>
            <small>Condition: {snack.condition}</small><br/>
            {
              user && bunny.owner && user._id === bunny.owner._id
              ?
            <>
            <Button
              className='m-2'
              variant='warning'
              onClick={() => setEditModalShow(true)}
            >
              Update Snack
            </Button>
            <Button
              className='m-2'
              variant='danger'
              onClick={() => destroySnack()}
            >
              Delete Snack
            </Button>
            </>
            :
            null
              }
            </Card.Footer>
            </Card>
            <EditSnackModal 
                user={user}
                bunny={bunny}
                snack={snack}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
  )
}

export default SnackShow