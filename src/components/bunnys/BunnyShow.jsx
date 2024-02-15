//BUNNYSHOwi is our deails page. The show page for a single bunny


import { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getOneBunny, removeBunny, updateBunny } from '../../api/bunny'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'
import EditBunnyModal from './EditBunnyModal'
import SnackShow from '../snacks/SnackShow'
import NewSnackModal from '../snacks/NewSnackModal'
// sets a style object for our snack card container
const snackCardContainerLayout = {
  display: 'flex',
  justifyContent: 'center',
  flexFlow: 'row wrap'
}

const BunnyShow = (props) => {
  const { bunnyId } = useParams()
  const { user, msgAlert } = props

  const [bunny, setBunny] = useState(null)
  const [editModalShow, setEditModalShow] = useState(false)
  const [snackModalShow, setSnackModalShow] = useState(false)
  // this is a boolean, that we can switch between to trigger a page re-render
  const [updated, setUpdated] = useState(false)
  // this gives us a function we can use to navigate via react-router
  const navigate = useNavigate()

  useEffect(() => {
    getOneBunny(bunnyId)
      .then(res => setBunny(res.data.bunny))
      .catch(err => {
        msgAlert({
          heading: 'Oh no!',
          message: messages.generalError,
          variant: 'danger'
        })
      })
    }, [updated])

    // this is an api call function, which means we'll need to handle the promise chain.
    // this means sending appropriate messages, as well as navigating upon success
    const setBunnyFree = () => {
      // we want to remove the bunny
      removeBunny(user, bunny._id)
          // display a success message
          .then(() => {
              msgAlert({
                  heading: 'Oh Yeah!',
                  message: messages.deleteBunnySuccess,
                  variant: 'success'
              })
          })
          // navigate the user back to the index page(Home)(/)
          .then(() => navigate('/'))
          // if an error occurs, tell the user
          .catch(err => {
              msgAlert({
                  heading: 'Oh no!',
                  message: messages.generalError,
                  variant: 'danger'
              })
          })
  }

   // this is going to map over the bunny's snacks array, and produce cards for every snack
  let snackCards
   // if we have a bunny, and if their snacks array length > 0, make cards, otherwise dont
  if (bunny) {
      if (bunny.snack.length > 0) {
          snackCards = bunny.snack.map(snack => (
              <SnackShow 
                  key={snack.id}
                  snack={snack}
                  bunny={bunny}
                  user={user}
                  msgAlert={msgAlert}
                  triggerRefresh={() => setUpdated(prev => !prev)}
              />
          ))
      } else {
          snackCards = <p>Bunny has no snacks, ain't that sad?</p>
      }
  }

  // if we dont have a bunny show the loading screen
  if (!bunny) {
    return <LoadingScreen />
  }

  return (
    <>
      <Container className='m-2'>
        <Card>
          <Card.Header>
            {bunny.fullTitle}
          </Card.Header>
          <Card.Body>
          { bunny.thumbnail ? <Card.Img src = {bunny.thumbnail} alt={`${bunny.name} thumbnail`} />
          :
          null
          }
            <Card.Text>
              <small>Age: {bunny.age}</small><br />
              <small>Type: {bunny.type}</small><br />
              <small>
                Forsale? {bunny.forsale ? 'yes' : 'no'}
              </small>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
          {user ? <Button
                className='m-2'
                variant='info'
                onClick={() => setSnackModalShow(true)}
            >
                Give {bunny.name} a snack!
            </Button>
            :
            null
            }
            {
                bunny.owner && user && bunny._id === user._id
                ?
                <>
                    <Button
                        className='m-2'
                        variant='warning'
                        onClick={setEditModalShow(true)}
                    >
                        Edit bunny
                    </Button>
                    <Button
                        className='m-2'
                        variant='danger'
                        onClick={setBunnyFree()}
                    >
                        Set Bunny Free
                    </Button>
                </>
                :
                null
            }
            <br/>
            {
              bunny.owner ? `owner: ${bunny.owner.email}` : null
            }
          </Card.Footer>
        </Card>
      </Container>
      <Container className='m-2' style={snackCardContainerLayout}>
      {snackCards}
      </Container>
      <EditBunnyModal 
        user={user}
        show={editModalShow}
        updateBunny={updateBunny}
        msgAlert={msgAlert}
        handleClose={() => setEditModalShow(false)}
        bunny={bunny}
        triggerRefresh={() => setUpdated(prev => !prev)}
      />
      <NewSnackModal 
        bunny={bunny}
        show={snackModalShow}
        msgAlert={msgAlert}
        handleClose={() => setSnackModalShow(false)}
        triggerRefresh={() => setUpdated(prev => !prev)}
      />
    </>
  )
}

export default BunnyShow