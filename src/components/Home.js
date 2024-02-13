import {useState, useEffect} from 'react'
import { getAllBunnys } from "../api/bunny"
import LoadingScreen from './shared/LoadingScreen'

const Home = (props) => {
	const { msgAlert, user } = props
	// console.log('props in home', props)

	const [bunnys, setBunnys] = useState(null)

	useEffect ( () => {
		getAllBunnys()
			// .then(res => console.log ('bunnys from axious call: \n', res.data.bunnys))
			.then(res => {
				console.log('use Effect hook ran')
				setBunnys(res.date.bunnys)
			})
			.catch(error => console.error)
	}, [])
	console.log('the bunnys in home: \n', bunnys)
	return (
		<>
			<h2>Home Page</h2>
			{ user !== null ? <h5>Hello {user.email}</h5> : null }
			{bunnys == null ? <LoadingScreen/> : <p>{bunnys[0].name}</p>}
		</>
	)
}

export default Home
