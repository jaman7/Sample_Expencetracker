import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import AccuntDefaults from '../Layout/AccuntDefaults';
import P from '../Layout/P';

const Home = inject('ExpenceStore')(
	observer((props) => {
		const { ExpenceStore } = props;
		const { baseURL } = ExpenceStore;

		return (
			<>
				<div className="container-fluid auth">
					<div className="row">
						<div className="col-12">
							<div className="d-flex justify-content-center vh-100 align-items-center flex-column">
								<h1 className="text-center">Expence tracker app</h1>

								<P className="lead text-center">
									Aby się zalogować proszę kliknąć poniższy przycisk.
								</P>
								<Link to={`/${baseURL}login`} className="btn btn-lg btn-success">
									Login
								</Link>

								<P className="lead mt-3 text-center">Dane logowania:</P>

								<P className="lead d-flex flex-column text-center">
									<AccuntDefaults />
								</P>

								<P className="lead text-center">Lub utwórz konto</P>

								<Link to={`/${baseURL}signup`} className="btn btn-lg btn-success">
									Register
								</Link>

								<P className="small text-center mt-5">
									W aplikacji dwukrotne kliknięcie umożliwia edycję elementu.
									Aplikacja w języku angielskim.
								</P>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	})
);

Home.wrappedComponent.propTypes = {
	ExpenceStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default Home;
