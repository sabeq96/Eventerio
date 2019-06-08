import { Component } from 'preact';
import { Button, Icon, Link } from 'preact-fluid';
import { Grid, Cell } from '../../Grid';
import _map from 'lodash/map';
import 'style';
import { route } from 'preact-router';


const EventPost = ({ title, shortDesc, image, date, address, link, bodyWidth }) => (
	<Grid gap={10} breakpoint={800} style={styles.event.eventPost}>
		<Cell size={1}>
			<div
				style={{
					...styles.event.eventImage,
					backgroundImage: `url('${image}')`
				}}
			/>
		</Cell>
		<Cell size={2}>
			<div>
				<h2 style={styles.event.eventTitle}>
					<a href={`/events/${link}`} style={styles.event.eventLink}>
						{title}
					</a>
				</h2>
				<div style={styles.event.eventLine} />
				<p>{shortDesc}</p>
    
				<Grid gap={5} breakpoint={800} columns={2} style={styles.event.eventInfo}>
					<Cell width={1}>
						<div>
							<Icon
								name="clock"
								size="xsmall"
								style={{ marginRight: '10px' }}
							/>
							{new Date(date).toLocaleDateString()}
						</div>
					</Cell>
					<Cell width={1}>
						<div>
							<Icon
								name="map"
								size="xsmall"
								style={{ marginRight: '10px' }}
							/>
							{address}
						</div>
					</Cell>
					<Cell width={1} style={{ textAlign: bodyWidth > 800 ? 'right' : 'left' }}>
						<Link
							href={link}
							onClick={() => { // eslint-disable-line
								route(`/events/${link}`);
							}}
						>
							<Button
								primary
								left={
									<Icon
										name="arrow-right"
										size="xsmall"
									/>
								}
							>
							View
							</Button>
						</Link>
					</Cell>
				</Grid>
			</div>
		</Cell>
	</Grid>
);


class EventList extends Component {
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
				<h2>Events list</h2>
				{_map(props.eventList, (event, key) => (
					<EventPost
						key={key}
						bodyWidth={state.bodyWidth}
						title={event.name}
						shortDesc={event.shortDescription}
						image={event.photoUrl}
						date={event.startTime}
						address={event.address}
						link={key}
					/>
				))}
			</div>
		);
	}
}

const styles = {
	event: {
		eventPost: {
			margin: '20px 0',
			background: '#f8f8f8',
			borderRadius: '5px',
			padding: '8px'
		},
		eventImage: {
			height: '100%',
			minHeight: '150px',
			width: '100%',
			backgroundSize: 'cover',
			backgroundPosition: '50% 50%'
		},
		eventTitle: {
			margin: '10px 0 0',
			fontSize: '24px'
		},
		eventLink: {
			color: '#FF3776',
			textDecoration: 'none'
		},
		eventLine: {
			background: '#ff3776',
			width: '50px',
			height: '2px',
			content: '',
			display: 'block',
			margin: '10px 0 0 0'
		},
		eventInfo: {
			padding: '15px 0',
			color: '#5A33A7'
		}
	}
};

export default EventList;