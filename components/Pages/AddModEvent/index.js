import { Component } from 'preact';
import { Image, Icon, Card, CardBody, CardHeader } from 'preact-fluid';
import DatePicker from '../../DatePicker';
import { Grid, Cell } from '../../Grid';

const TextArea = ({ children, style, name, onChange }) => (
	<textarea style={{ ...style, ...styles.textArea }} onChange={(e) => onChange(name, e.target.value)}>
		{children}
	</textarea>
);

const EventInfo = ({ label, children }) => (
	<div style={styles.card.cardInfoWrapper}>
		<span style={styles.card.cardInfoDesc}>{label}</span>
		{children && (
			<div>{ children }</div>
		)}
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

const EventHeader = ({ title, children, image, bodyWidth, onChange }) => (
	<div style={styles.header.headerWrapper}>
		<div style={{
			position: bodyWidth > 500 ? 'absolute' : 'static',
			...styles.header.coverWrapper
		}}
		>
			{title}
			{children}
		</div>
		<label for="backgroundInput">
			<div
				style={{
					...styles.header.headerImage,
					backgroundImage: `url('${image}')`
				}}
			/>
		</label>
		<input type="file" id="backgroundInput" style={{ display: 'none' }} onChange={onChange} />
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
		<div>
			{children}
		</div>
	</div>
);

class AddModEvent extends Component {
	setBodyWidth = () => {
		this.setState({ bodyWidth: document.body.offsetWidth });
	}

	constructor(props) {
		super(props);

		this.state = {
			bodyWidth: document.body.offsetWidth,
			file: null
		};
	}

	componentDidMount() {
		window.addEventListener('resize', this.setBodyWidth);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.setBodyWidth);
	}

	render(props, { bodyWidth }) {
		return (
			<div className="container">
				<EventHeader
					bodyWidth={bodyWidth}
					title={<TextArea style={styles.header.coverHeader} name="name" onChange={props.onChange}>
						{props.name}
					</TextArea>}
					image={props.file ? URL.createObjectURL(props.file) : props.photoUrl}
					onChange={props.backgroundChange}
				>
					<TextArea style={{ color: 'white' }} name="shortDescription" onChange={props.onChange}>
						{props.shortDescription}
					</TextArea>
				</EventHeader>
				<Grid gap={5} breakpoint={800}>
					<Cell size={1}>
						<Card middle center>
							<CardBody>
								<EventInfo
									label="Start date: "
								>
									<DatePicker
										style={{ ...styles.card.cardInfoText, border: 0, width: 120 }}
										options={{ disableMobile: true }}
										value={props.startTime}
										onChange={(val) => props.onChange('startTime', val)}
										theme="material_blue"
										className="datePicker"
									/>
								</EventInfo>
								<EventInfo
									label="End date: "
								>
									<DatePicker
										style={{ ...styles.card.cardInfoText, border: 0, width: 120 }}
										options={{ disableMobile: true }}
										name="endTime"
										value={props.endTime}
										onChange={(val) => props.onChange('endTime', val)}
										theme="material_blue"
										className="datePicker"
									/>
								</EventInfo>
								<EventInfo
									label="Address:"
								>
									<TextArea
										style={{ ...styles.card.cardInfoText, resize: 'none' }}
										name="address"
										onChange={props.onChange}
									>
										{props.address}
									</TextArea>
								</EventInfo>
								<EventInfo
									label="Contact details:"
								>
									<TextArea
										style={{ ...styles.card.cardInfoText, resize: 'none' }}
										name="contactDetails"
										onChange={props.onChange}
									>
										{props.contactDetails}
									</TextArea>
								</EventInfo>
								<EventOwnerDetails
									avatarUrl={props.organizerAvatarUrl}
									userName={props.organizer}
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
				<SectionWithHeader title="Description">
					<TextArea style={{ ...styles.eventSection.body, minHeight: 300 }} name="description" onChange={props.onChange}>
						{props.description}
					</TextArea>
				</SectionWithHeader>
				<div style={styles.fab}>
					<Icon
						name="plus"
						size="large"
						onClick={props.onConfirm}
						color="white"
					/>
				</div>
			</div>
		);
	}
}

const styles = {
	fab: {
		padding: '10px',
		borderRadius: '50%',
		background: '#5A33A7',
		position: 'fixed',
		bottom: 10,
		right: 10
	},
	textArea: {
		background: 'rgba(240,240,240,.3)',
		maxWidth: '100%',
		minWidth: '100%'
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
			fontSize: '32px',
			fontWeight: 500,
			color: '#FFF',
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

export default AddModEvent;