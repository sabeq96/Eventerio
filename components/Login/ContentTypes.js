import { TextField } from 'preact-fluid';


const ContentTypes = ({ contentType, onChange, values: { email, oldPassword, password, confirmPassword, error } }) => {
	switch (contentType) {
		case 'LOGIN' : {
			return (
				<div>
					<TextField
						type="email"
						label="email"
						onChange={onChange('email')}
						value={email}
					/>
					<TextField
						type="password"
						label="password"
						onChange={onChange('password')}
						value={password}
						style={{ marginTop: '20px' }}
					/>
					{error && (
						<div style={styles.error}>
							{error}
						</div>
					)}
				</div>
			);
		}

		case 'SIGNIN' : {
			return (
				<div>
					<TextField
						type="email"
						label="email"
						onChange={onChange('email')}
						value={email}
					/>
					<TextField
						type="password"
						label="password"
						onChange={onChange('password')}
						value={password}
						style={{ marginTop: '20px' }}
					/>
					<TextField
						type="password"
						label="confirm password"
						onChange={onChange('confirmPassword')}
						value={confirmPassword}
						style={{ marginTop: '20px' }}
					/>
					{error && (
						<div style={styles.error}>
							{error}
						</div>
					)}
				</div>
			);
		}

		case 'CHANGE_PASSWORD' : {
			return (
				<div>
					<TextField
						type="password"
						label="old password"
						onChange={onChange('oldPassword')}
						value={oldPassword}
						style={{ marginTop: '20px' }}
					/>
					<TextField
						type="password"
						label="password"
						onChange={onChange('password')}
						value={password}
						style={{ marginTop: '20px' }}
					/>
					<TextField
						type="password"
						label="confirm password"
						onChange={onChange('confirmPassword')}
						value={confirmPassword}
						style={{ marginTop: '20px' }}
					/>
					{error && (
						<div style={styles.error}>
							{error}
						</div>
					)}
				</div>
			);
		}

		case 'RESET_PASSWORD' : {
			return (
				<div>
					<TextField
						type="email"
						label="email"
						onChange={onChange('email')}
						value={email}
						style={{ marginTop: '20px' }}
					/>
					{error && (
						<div style={styles.error}>
							{error}
						</div>
					)}
				</div>
			);
		}
    
		default: {
			return null;
		}
	}
};

const styles = {
	error: {
		color: '#F00',
		textAlign: 'center'
	}
};

export default ContentTypes;