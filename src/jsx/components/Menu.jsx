/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import { getUser, removeUserSession } from '../Utils/Common';
import Img from '../Layout/Img';

const Menu = inject('ExpenceStore')(
	observer((props) => {
		const { ExpenceStore, history } = props;
		const { token, setToken, baseURL } = ExpenceStore;

		const user = getUser();

		const handleLogout = () => {
			removeUserSession();
			history.push(`/${baseURL}login`);
		};

		const userData = () => (
			<>
				<span>{user}</span>
				<Img src="img/user.png" alt="user" className="img-fluid user-logo" />
			</>
		);

		return (
			<>
				<Navbar variant="dark" expand="lg">
					<Navbar.Brand href={`/${baseURL}`}>
						<Img src="img/todo.png" className="logo img-fluid" alt="front-logo" />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="navbar-nav ml-auto nav-users">
							<NavDropdown title={userData()} id="basic-nav-dropdown" alignRight>
								<NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</>
		);
	})
);

Menu.wrappedComponent.propTypes = {
	ExpenceStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default Menu;
