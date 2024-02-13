// this component is going to take functionality away from Home.js, and focus only on displaying a list of bunnys gatherd from the database, via an API call
// used for updating state with api data
import {useState, useEffect} from 'react'
import { getAllBunnys } from "../../api/bunny"
// used for rendering things
import LoadingScreen from '../shared/LoadingScreen'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// react allows you to create something called styling object
const cardContainerLayout = {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'center'
}
const BunnysIndex = (props) => {
  // first we want two pieces of state to use for rendering
  const [bunnys, setBunnys] = useState(null)
  const [error, setError] = useState(false)

  // we'll destructure our props
  const {msgAlert} = props

  useEffect (() => {
		getAllBunnys()
			// .then(res => console.log ('bunnys from axious call: \n', res.data.bunnys))
			.then(res => {
				console.log('use Effect hook ran')
				setBunnys(res.data.bunnys)
			})
			.catch(error => console.error)
	}, [])
	console.log('the bunnys in BunnysIndex: \n', bunnys)

  // we need to handle multiple states of our data
  // what if we have an error?
  if (error) {
    return <LoadingScreen />
  }
  // what if we have no data?
  if (!bunnys) {
    return <LoadingScreen />
    // what if the exected array is empty?
  } else if (bunnys.length === 0) {
    return <p>No Bunnys yet, go add some!</p>
  }

  // what do we display when our data comes thorught fine?
  // we want to loop over the array of bunnys
  // and produce one card for each and ecvery bunny we get back to data base
  const bunnyCards = bunnys.map(bunny => (
    <Card key={bunny.id} style={{ width: '30%', margin: 5 }}>
      <Card.Header>{bunny.fullTitle}</Card.Header>
      <Card.Body>
        <Card.Text>
          {bunny.name}
        </Card.Text>
        { bunny.owner ? 
          <Card.Footer> owner: {bunny.owner.email}</Card.Footer>
          :
          null
        }
      </Card.Body>
    </Card>
  ))


  return (
    <div className="container-md" style={ cardContainerLayout}>
      {bunnyCards}
    </div>
  )
}


export default BunnysIndex
