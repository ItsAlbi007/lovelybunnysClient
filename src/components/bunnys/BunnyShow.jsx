//BUNNYSHOwi is our deails page. The show page for a single bunny


import { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getOneBunny } from '../../api/bunny'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card } from 'react-bootstrap'

const BunnyShow = (props) => {
  const { bunnyId } = useParams()
  const { user, msgAlert } = props

  const [bunny, setBunny] = useState(null)

  useEffect(() => {
    getOneBunny(bunnyId)
      .then(res => setBunny(res.data.bunny))
      .then(() => {
        msgAlert({
          heading: 'Oh Yeah!',
          message: 'we found the bunny',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Oh no!',
          message: 'Something went wrong',
          variant: 'danger'
        })
      })
  })

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
            <Card.Text>
              <small>Age: {bunny.age}</small><br />
              <small>Type: {bunny.Type}</small><br />
              <small>
                Forsale? {bunny.forsale ? 'yes' : 'no'}
              </small>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            {
              bunny.owner ? `owner: ${bunny.owner.email}` : null
            }
          </Card.Footer>
        </Card>
      </Container>
    </>
  )
}

export default BunnyShow