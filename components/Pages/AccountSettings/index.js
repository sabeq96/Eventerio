import { Component } from 'preact';
import { Button, Card, CardBody, CardHeader, TextField } from 'preact-fluid';
import linkstate from 'linkstate';

import AvatarSection from './AvatarSection';

class AccountSettings extends Component {

	onSubmit = () => {
		this.props.onSubmit(this.state);
	}

	constructor(props) {
		super(props);

		this.state = {
			avatarUrl: '',
			name: '',
			surname: '',
			email: '',
			city: '',
			settings: {
				eventsMaxDistance: 0
			},
			file: null
		};
	}

	componentWillReceiveProps({ avatarUrl, name, surname, email, city, settings, error }) {
		this.setState({ avatarUrl, name, surname, email, city, settings, error });
	}

	render({ onAvatarFileChange, onChangePasswordButtonClick }, { avatarUrl, name, surname, email, city, settings }) {
		return (
			<div className="container">
				<Card middle center>
					<CardHeader title="Account settings" />
					<AvatarSection avatarUrl={avatarUrl} onChange={onAvatarFileChange} />
					<div style={styles.cardWrapper}>
						<CardBody>
							<div style={styles.textFieldWrapper}>
								<TextField label="Name" effect="line" value={name} onChange={linkstate(this, 'name')} />
							</div>
							<div style={styles.textFieldWrapper}>
								<TextField label="Surname" effect="line" value={surname} onChange={linkstate(this, 'surname')} />
							</div>
							<div style={styles.textFieldWrapper}>
								<TextField label="Email" effect="line" value={email} onChange={linkstate(this, 'email')} />
							</div>
							<div style={styles.textFieldWrapper}>
								<TextField label="City" effect="line" value={city} onChange={linkstate(this, 'city')} />
							</div>
							<div style={styles.slider} className="acc-slider">
								<div style={{ textAlign: 'center' }}>Events max distance: <strong>{settings.eventsMaxDistance}</strong></div>
								<input
									type="range"
									min={1}
									max={100}
									value={settings.eventsMaxDistance}
									onChange={linkstate(this, 'settings.eventsMaxDistance')}
									styles={styles.slider}
								/>
							</div>
						</CardBody>
					</div>
					<div style={styles.footer}>
						<Button onClick={onChangePasswordButtonClick} style={styles.button}>Change password</Button>
						<Button primary onClick={this.onSubmit} style={styles.button}>Save</Button>
					</div>
				</Card>
			</div>
		);
	}
}

const styles = {
	cardWrapper: {
		margin: '0 auto',
		maxWidth: '350px'
	},
	textFieldWrapper: {
		paddingBottom: '30px'
	},
	slider: {
		display: 'flex',
		flexDirection: 'column',
		alignContent: 'center',
		margin: '50px 20px'
	},
	footer: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		margin: '50px'
	},
	button: {
		minWidth: '160px',
		marginBottom: '20px'
	}
};

export default AccountSettings;