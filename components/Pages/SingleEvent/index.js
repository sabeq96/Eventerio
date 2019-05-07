import { Component } from 'preact';
import { Button, Image, Icon, Animate, Card, CardBody, CardHeader } from 'preact-fluid';
import { Grid, Cell } from '../../Grid';
import 'style';

const JoinButton = () => (
	<div style={styles.joinButton}>
		<Animate
			component={
				<Button rounded>
					<Icon name="check" size="xsmall" />
					<span>Dołącz do eventu!</span>
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
					style={`height: 80px; width: 80px`}
					rounded
				/>
			</Cell>
			<Cell center>
				<CardHeader
					title={userName}
					subtitle="Organizator"
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
			<Button primary left={<Icon name="check" size="xsmall" />}>DOŁĄCZ</Button>
		</div>
		<div
			style={{
				...styles.header.headerImage,
				backgroundImage: `url('${image}')`
			}}
		/>
	</div>
);

const EventMap = ({ url }) => (
	<iframe src={url} width="100%" height="350px" frameborder="0" style="border:0" allowfullscreen />
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

class Home extends Component {
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

	render(props, state) {
		return (
			<div className="container">
				<EventHeader
					bodyWidth={this.state.bodyWidth}
					title="Ekstremalna wyprawa w góry"
					image="https://upload.wikimedia.org/wikipedia/commons/4/4d/Kralicky-Sneznik-04.jpg"
				>
					Krotki opis Irish girl and Irish boy. Is all you need to break toys. That's all you need. That's all you want.
				</EventHeader>
				<Grid gap={5} breakpoint={800}>
					<Cell size={1}>
						<Card middle center>
							<CardBody>
								<EventInfo
									content="17 maj 2019"
									label="Data: "
								/>
								<EventInfo
									content="ul. Warszawska 18, Zakopane"
									label="Adres:"
								/>
								<EventOwnerDetails
									avatarUrl="https://avatars1.githubusercontent.com/u/1182600?s=460&v=4"
									userName="Miroslaw Ticktack"
								/>
							</CardBody>
						</Card>
					</Cell>
					<Cell size={2}>
						<Card>
							<CardBody>
								<EventMap
									url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83296.89012681483!2d19.903836073576464!3d49.275870133474875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4715f29294ef3939%3A0xdf8d87a1716ba6a0!2sZakopane!5e0!3m2!1spl!2spl!4v1556994611817!5m2!1spl!2spl"
								/>
							</CardBody>
						</Card>
					</Cell>
				</Grid>
				<SectionWithHeader title="Szczegółowy opis">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sapien purus, vestibulum vitae massa sed, ornare consequat massa. Nam pharetra sagittis faucibus. Vivamus commodo consectetur euismod. Nulla mollis orci justo, sed placerat enim volutpat non. Cras in ultrices nibh. Ut varius erat eget leo hendrerit, vel placerat mauris rutrum. Nunc venenatis felis nec sollicitudin aliquam. Aliquam erat volutpat.<br /><br />
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo euismod orci vitae tempus. Sed tempus gravida varius. Suspendisse eget urna purus. Phasellus et turpis eros. Donec maximus dolor ac tempus ornare. Vestibulum orci erat, faucibus nec enim aliquet, vestibulum interdum libero. Pellentesque quis dolor vel lacus pretium malesuada auctor a magna. Cras ut condimentum nisi. In id dapibus nulla.<br /><br />
					Donec nisl velit, laoreet a hendrerit non, dapibus non risus. Pellentesque ac lectus dui. Fusce massa orci, tempus sit amet lectus at, commodo finibus dolor. Ut posuere eu metus non vestibulum. Maecenas semper, orci mollis scelerisque tincidunt, erat justo interdum elit, eget porta lorem tellus id elit. Praesent luctus neque ac vestibulum venenatis. In justo sem, aliquam ut ligula sed, aliquam feugiat nisl. Sed sagittis sapien ex, ac tincidunt velit pellentesque a. Morbi elit arcu, imperdiet fringilla condimentum sed, vulputate a sapien. Etiam gravida ullamcorper libero, et consectetur neque rhoncus ut. Vivamus nunc erat, convallis nec lectus sit amet, ullamcorper maximus mauris. Etiam tempus est id convallis cursus.
					<JoinButton />
				</SectionWithHeader>
				<SectionWithHeader title="Komentarze">
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
		width: '100%',
		margin: '20px'
	},
	card: {
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

export default Home;