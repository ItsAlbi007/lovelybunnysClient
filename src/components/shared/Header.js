import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}
const authenticatedOptions = (
	<>
			<Nav.Item className='m-2'>
				<Link to='create-bunny' style={linkStyle}>
				Add new bunny
				</Link>
			</Nav.Item>
			<Nav.Item className='m-2'>
				<Link to='change-password' style={linkStyle}>
				Change Password
				</Link>
			</Nav.Item>
			<Nav.Item className='m-2'>
				<Link to='sign-out' style={linkStyle}>
				Sign Out
				</Link>
			</Nav.Item>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Item className='m-2'>
		    	<Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Item>
        <Nav.Item className='m-2'>
		    	<Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Item>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Item className='m-2'>
			<Link to='/available' style={linkStyle}>
				Available Bunnys
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='/about' style={linkStyle}>
				About Us
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='/contact' style={linkStyle}>
				Contact Us
			</Link>
		</Nav.Item>
	</>
)

const Header = ({ user }) => (
	<Navbar  expand='md'  className='justify-content-between' style={{ backgroundColor:'#343a40'}}>
		<Navbar.Brand className='m-2 flex-fill'>
            <Link to='/' style={linkStyle}>
                Lovely Bunnys
            </Link>
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto'>
				{user && (
					<span className='navbar-text mr-2'>Welcome, {user.email}</span>
				)}
				{alwaysOptions}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
