import { Component } from 'preact';
import { Button, Image, Icon, Animate, Card, CardBody, CardHeader } from 'preact-fluid';
import { Grid, Cell } from '../../Grid';
import GoogleMap from '../../GoogleMap';
import 'style';

const JoinButton = () => (
	<div style={styles.joinButton}>
		<Animate
			component={
				<Button rounded left={<Icon name="check" size="xsmall" />}>
					<span>Join us !</span>
				</Button>
			}
			animation={{
				name: 'pulseShadow',
				duration: '3s',
				iterationCount: 'infinite',
				timingFunction: 'linear'
			}}
		/>
	</div>
);

const EventInfo = ({ label, content }) => (
	<div style={styles.card.cardInfoWrapper}>
		<span style={styles.card.cardInfoDesc}>{label}</span>
		<p style={styles.card.cardInfoText}>{content}</p>
	</div>
);

const EventOwnerDetails = ({ avatarUrl, userName }) => (
	<Card>
		<Grid style={{ minHeight: 100 }} alignItems="center">
			<Cell center>
				<Image
					src={avatarUrl}
					style={styles.card.avatarImage}
					rounded
				/>
			</Cell>
			<Cell center>
				<CardHeader
					title={userName}
					subtitle="Event organizer"
				/>
			</Cell>
		</Grid>
	</Card>
);

const EventHeader = ({ title, children, image, bodyWidth }) => (
	<div style={styles.header.headerWrapper}>
		<div style={{
			position: bodyWidth > 500 ? 'absolute' : 'static',
			...styles.header.coverWrapper
		}}
		>
			<h1 style={styles.header.coverHeader}>{title}</h1>
			<p> {children} </p>
			<Button primary left={<Icon name="check" size="xsmall" />}>JOIN!</Button>
		</div>
		<div
			style={{
				...styles.header.headerImage,
				backgroundImage: `url('${image}')`
			}}
		/>
	</div>
);

const SectionWithHeader = ({ children, title }) => (
	<div style={styles.eventSection.wrapper}>
		<div style={styles.eventSection.title}>
			{title}
		</div>
		<div style={styles.eventSection.line} />
		<div style={styles.eventSection.body}>
			{children}
		</div>
	</div>
);

class SingleEvent extends Component {
	setBodyWidth = () => {
		this.setState({ bodyWidth: document.body.offsetWidth });
	}
	
	constructor(props) {
		super(props);

		this.state = {
			bodyWidth: document.body.offsetWidth
		};
	}

	componentDidMount() {
		window.addEventListener('resize', this.setBodyWidth);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.setBodyWidth);
	}

	render({ name, photoUrl, shortDescription, startTime, address, organizerAvatarUrl, organizer, coordinates, description }) {
		return (
			<div className="container">
				<EventHeader
					bodyWidth={this.state.bodyWidth}
					title={name}
					image={photoUrl}
				>
					{shortDescription}
				</EventHeader>
				<Grid gap={5} breakpoint={800}>
					<Cell size={1}>
						<Card middle center>
							<CardBody>
								<EventInfo
									content={startTime}
									label="Date: "
								/>
								<EventInfo
									content={address}
									label="Address:"
								/>
								<EventOwnerDetails
									avatarUrl={organizerAvatarUrl}
									userName={organizer}
								/>
							</CardBody>
						</Card>
					</Cell>
					<Cell size={2}>
						<Card>
							<CardBody>
								<GoogleMap
									latitude={coordinates.latitude}
									longitude={coordinates.longitude}
								/>
							</CardBody>
						</Card>
					</Cell>
				</Grid>
				<SectionWithHeader title="Description">
					{description}
					<JoinButton />
				</SectionWithHeader>
				<SectionWithHeader title="Comments">
					Tak lub nie?
				</SectionWithHeader>

			</div>
		);
	}
}

const styles = {
	joinButton: {
		display: 'flex',
		justifyContent: 'center',
		margin: '20px'
	},
	card: {
		avatarImage: {
			height: '80px',
			width: '80px'
		},
		cardInfoWrapper: {
			marginBottom: '15px'
		},
		cardInfoText: {
			fontSize: '20px',
			lineHeight: '32px',
			fontWeight: 500,
			color: '#454d5d',
			margin: 0
		},
		cardInfoDesc: {
			fontSize: '14px',
			lineHeight: '18px',
			fontWeight: 300,
			color: '#acb3c2',
			margin: 0
		}
	},
	header: {
		headerWrapper: {
			position: 'relative',
			marginBottom: '25px'
		},
		headerImage: {
			height: '450px',
			backgroundSize: 'cover',
			border: '8px solid #FF3776'
		},
		coverWrapper: {
			top: '30px',
			left: 0,
			maxWidth: '450px',
			padding: '25px',
			color: '#FFF',
			backgroundImage: 'linear-gradient(to right, #ff3776, #e42388, #c02198, #932aa3, #5a33a7)'
		},
		coverHeader: {
			margin: '10px',
			fontSize: '32px',
			fontWeight: 500,
			textShadow: '0 0 12px #000'
		}
	},
	eventSection: {
		wrapper: {
			margin: '30px 0 40px 0'
		},
		title: {
			color: '#ff3776',
			fontSize: '36px',
			fontWeight: 300
		},
		line: {
			background: '#ff3776',
			width: '50px',
			height: '2px',
			content: '',
			display: 'block',
			margin: '15px 0 0 0'
		},
		body: {
			fontSize: '20px',
			lineHeight: '32px',
			fontWeight: 500,
			color: '#454d5d',
			margin: '10px 0'
		}
	}
};

export default SingleEvent;