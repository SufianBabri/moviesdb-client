import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const AppNavBar = ({ user }) => {
	return (
		<Navbar bg="dark" variant="dark" expand="sm">
			<Navbar.Brand>
				<NavLink
					className="nav-link"
					to="/"
					style={{ textDecoration: 'none', color: `white` }}>
					<i className="fa fa-film">&nbsp;&nbsp;Movies DB</i>
				</NavLink>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<NavLink className="nav-item nav-link" to="/movies">
						Movies <span className="sr-only">(current)</span>
					</NavLink>
					<NavLink className="nav-item nav-link" to="/customers">
						Customers
					</NavLink>
					<NavLink className="nav-item nav-link" to="/rentals">
						Rentals
					</NavLink>
					{!user && (
						<React.Fragment>
							<NavLink className="nav-item nav-link" to="/login">
								Login
							</NavLink>
							<NavLink
								className="nav-item nav-link"
								to="/register">
								Register
							</NavLink>
						</React.Fragment>
					)}
					{user && (
						<React.Fragment>
							<NavLink
								className="nav-item nav-link"
								to="/profile">
								{user.name}
							</NavLink>
							<NavLink className="nav-item nav-link" to="/logout">
								Logout
							</NavLink>
						</React.Fragment>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default AppNavBar;
