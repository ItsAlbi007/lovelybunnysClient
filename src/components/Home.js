import  BunnysIndex from './bunnys/BunnysIndex'

const Home = (props) => {
	const { msgAlert} = props
	// console.log('props in home', props)

	// const [bunnys, setBunnys] = useState(null)


	return (
		<>
			<h2>Home Page</h2>
			{/* { user !== null ? <h5>Hello {user.email}</h5> : null }
			{bunnys == null ? <LoadingScreen/> : <p>{bunnys[0].name}</p>} */}
			<BunnysIndex msgAlert={msgAlert} />
		</>
	)
}

export default Home
