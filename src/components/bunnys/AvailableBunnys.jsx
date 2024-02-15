// this component is going to take functionality away from Home.js, and focus only on displaying a list of bunnys gathered from the database, via an API call
// used for updating state with api data
import {useState, useEffect} from 'react'
import { getAllBunnys } from "../../api/bunny"
// used for rendering things
import LoadingScreen from '../shared/LoadingScreen'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'

// react allows you to create something called a styling object
const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const AvailableBunnys = (props) => {
    // first we want two pieces of state to use for rendering
    const [bunnys, setBunnys] = useState(null)
    const [error, setError] = useState(false)

    // we'll destructure our props
    const { msgAlert } = props

    // useEffect is an effect hook, and it requires two args
	// the first is a callback function
	// the second arg is a dependency array
	// the dependency array, tells react when to run the effect hook. If we want this to run only on the first render and anytime the page refreshes, we keep the dependency array empty
	// useEffect is called RIGHT after the FIRST render of the component
	useEffect(() => {
		getAllBunnys()
			// .then(res => console.log('bunnys from axios call: \n', res.data.bunnys))
			.then(res => {
				console.log('use Effect hook ran')
				setBunnys(res.data.bunnys)
			})
			.catch(error => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
                setError(true)
            })
	}, [])

	// WE NEVER EVER DO THIS:
	// getAllbunnys()
	// 	.then(res => setbunnys(res.data.bunnys))
	// 	.catch(err => console.log(err))
	// API calls need to happen in an effect hook, or as the result of a singular action
	// (like a form submission)
	// console.log('the bunnys in bunnysIndex: \n', bunnys)

    // we need to handle multiple states of our data
    // what if we have an error?
    if (error) {
        return <LoadingScreen />
    }

    // what if we have no data?
    if (!bunnys) {
        return <LoadingScreen />
    // what if the expected array is empty?
    } else if (bunnys.length === 0) {
        return <p>No bunnys yet, go add some!</p>
    }

    // what do we display when our data comes through fine?
    // we want to loop over the array of bunnys
    // and produce one card for each and every bunny we get back from the db
    const bunnyCards = bunnys.map(bunny => (
        <Card key={bunny.id} style={{ width: '30%', margin: 5 }} >
            <Card.Header>{bunny.fullTitle}</Card.Header>
            
            <Card.Body>
            { bunny.thumbnail ? 
                    <img src = {bunny.thumbnail} alt={`${bunny.name} thumbnail`} width = {200} height = {200} style = {{objectFit: 'cover', marginBottom: '10px' }}  />
                    :
                    null
                }
                <Card.Text>
                    <Link to={`/bunnys/${bunny.id}`} className='btn btn-info'>
                        View {bunny.name}
                    </Link>
                </Card.Text>
                { bunny.owner ?
                    <Card.Footer>owner: {bunny.owner.email}</Card.Footer>
                    :
                    null
                }
            </Card.Body>
        </Card>
    ))

    return (
        <div className="container-md " style={ cardContainerLayout }>
            {/* <h2>Available Bunnys</h2> */}
            { bunnyCards }
        </div>
    )
}

export default AvailableBunnys