import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import AccuntDefaults from '../Layout/AccuntDefaults';

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
								<h1>Expence tracker app</h1>

								<p className="lead">
									Aby się zalogować proszę kliknąć poniższy przycisk.
								</p>
								<Link to={`/${baseURL}login`} className="btn btn-lg btn-success">
									Login
								</Link>

								<p className="lead mt-3">Dane logowania:</p>
								<p className="lead d-flex flex-column text-center">
									<AccuntDefaults />
								</p>

								<p className="lead">Lub utwórz konto</p>

								<Link to={`/${baseURL}signup`} className="btn btn-lg btn-success">
									Register
								</Link>

								<p className="small mt-5">
									W aplikacji dwukrotne kliknięcie umożliwia edycję elementu.
									Aplikacja w języku angielskim.
								</p>
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
