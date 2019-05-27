import { Component } from 'preact';
import { Button, Image, Icon, Animate, Card, CardBody, CardHeader, CardFooter } from 'preact-fluid';
import { Grid, Cell } from '../../Grid';
import 'style';


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
                    <a href={link} style={styles.event.eventLink}>
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
                                style={{marginRight: '10px'}}
                            />
                            {date}
                        </div>
                    </Cell>
                    <Cell width={1}>
                        <div>
                            <Icon
                                name="map"
                                size="xsmall"
                                style={{marginRight: '10px'}}
                            />
                            {address}
                        </div>
                    </Cell>
                    <Cell width={1} style={{textAlign: bodyWidth > 800 ? 'right' : 'left'}}>
                        <Button 
                                primary
                                left={
                                    <Icon
                                        name="arrow-right"
                                        size="xsmall"
                                    />
                                }
                            >
                            Zobacz
                        </Button>
                    </Cell>
                </Grid>    
            </div>
        </Cell>
    </Grid>
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
                
                <h2> Lista eventow </h2>

                <EventPost
                    bodyWidth={this.state.bodyWidth}
                    title="Ekstremalna wyprawa w góry"
                    shortDesc="Krotki opis Irish girl and Irish boy. Is all you need to break toys. That's all you need. That's all you want."
                    image="https://upload.wikimedia.org/wikipedia/commons/4/4d/Kralicky-Sneznik-04.jpg"
                    date="17 wrzesień 2019"
                    address="Zakopane"
                    link="#"
                ></EventPost>
            
                <EventPost
                    bodyWidth={this.state.bodyWidth}
                    title="Szalony koncert nad Bałtykiem"
                    shortDesc=" That's all you want. Krotki opis Irish girl and Irish boy. That's all you need. Is all you need to break toys."
                    image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/POL_2007_08_04_Jaroslawiec_zachodniopomorskie_02.JPG/1024px-POL_2007_08_04_Jaroslawiec_zachodniopomorskie_02.JPG"
                    date="29 grudzień 2019"
                    address="Jarosławiec"
                    link="#"
                ></EventPost>
            
                <EventPost
                    bodyWidth={this.state.bodyWidth}
                    title="Dzika balanga na Sacharze - długa  dziwna noc"
                    shortDesc="Krotki opis Irish girl and Irish boy. Is all you need to break toys. That's all you need. That's all you want."
                    image="https://upload.wikimedia.org/wikipedia/commons/c/c5/Morocco_Africa_Flickr_Rosino_December_2005_84514010_edited_by_Buchling.jpg"
                    date="1 styczeń 2020"
                    address="Maroko"
                    link="#"
                ></EventPost>

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

export default Home;