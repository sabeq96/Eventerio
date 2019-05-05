import { h, Component } from 'preact';
import { Button, Grid, Image, Cell, Icon, Animate, Card, CardBody, CardFooter, CardImage, List, ListHeader } from 'preact-fluid';
import 'style';


class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render(props, state) {
		return (
            <section className="mainWrapper">
			  <div className="container">
            
            
                <div className="event__Head">
                    <h1>Ekstremalna wyprawa w góry</h1>
                    <p className="event__Head--description">
                        Krotki opis Irish girl and Irish boy. Is all you need to break toys. That's all you need. That's all you want.
                    </p>
                    <Button primary left={<Icon name="check" size="xsmall" /> }>DOŁĄCZ</Button>
                </div>
            
                <div 
                    className="event__BigImage" 
                    style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/4/4d/Kralicky-Sneznik-04.jpg')">
                </div>
                
            
                <div className="cardContainer">
                    <Grid columns="repeat(auto-fit, minmax(250px, 1fr))" gap="8px" >
                        <Cell width={1}>
                            <Card>
                                 <CardBody>
            
                                    <div className="card_Container--info">
                                        <span>Data:</span>
                                        <h3>17 wrzesień 2019</h3>
                                    </div>
            
                                    <div className="card_Container--info">
                                        <span>Adres:</span>
                                        <h3>
                                            ul. Warszawska 18<br/> 
                                            Zakopane
                                        </h3>
                                    </div>
            
                                    <Grid columns="repeat(auto-fit, minmax(250px, 1fr))" gap="20px">
                                        <Cell width={1}>
                                            <List>
                                                <ListHeader custom={
                                                    customHeaderProfile
                                                }/>
                                            </List>
                                        </Cell>
                                    </Grid>
                                 </CardBody>
                            </Card>
                        </Cell>
                        <Cell width={2}>
                            <Card>
                                 <CardBody>
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83296.89012681483!2d19.903836073576464!3d49.275870133474875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4715f29294ef3939%3A0xdf8d87a1716ba6a0!2sZakopane!5e0!3m2!1spl!2spl!4v1556994611817!5m2!1spl!2spl" width="100%" height="250" frameborder="0" style="border:0" allowfullscreen></iframe>
                                 </CardBody>
                            </Card>
                        </Cell>
                    </Grid>
                </div>
                
                <div className="event__Full">
                    <h2>Szczegółowy opis</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sapien purus, vestibulum vitae massa sed, ornare consequat massa. Nam pharetra sagittis faucibus. Vivamus commodo consectetur euismod. Nulla mollis orci justo, sed placerat enim volutpat non. Cras in ultrices nibh. Ut varius erat eget leo hendrerit, vel placerat mauris rutrum. Nunc venenatis felis nec sollicitudin aliquam. Aliquam erat volutpat.<br/><br/>

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo euismod orci vitae tempus. Sed tempus gravida varius. Suspendisse eget urna purus. Phasellus et turpis eros. Donec maximus dolor ac tempus ornare. Vestibulum orci erat, faucibus nec enim aliquet, vestibulum interdum libero. Pellentesque quis dolor vel lacus pretium malesuada auctor a magna. Cras ut condimentum nisi. In id dapibus nulla.<br/><br/>
            
                    Donec nisl velit, laoreet a hendrerit non, dapibus non risus. Pellentesque ac lectus dui. Fusce massa orci, tempus sit amet lectus at, commodo finibus dolor. Ut posuere eu metus non vestibulum. Maecenas semper, orci mollis scelerisque tincidunt, erat justo interdum elit, eget porta lorem tellus id elit. Praesent luctus neque ac vestibulum venenatis. In justo sem, aliquam ut ligula sed, aliquam feugiat nisl. Sed sagittis sapien ex, ac tincidunt velit pellentesque a. Morbi elit arcu, imperdiet fringilla condimentum sed, vulputate a sapien. Etiam gravida ullamcorper libero, et consectetur neque rhoncus ut. Vivamus nunc erat, convallis nec lectus sit amet, ullamcorper maximus mauris. Etiam tempus est id convallis cursus.</p>
                </div>
            
            
                <Grid columns={1}>
                    <Cell center middle height={4}>
                        <Animate component={JoinButton} animation={{
                            name: 'pulseShadow',
                            duration: '3s',
                            iterationCount: 'infinite',
                            timingFunction: 'linear'
                        }} />
                    </Cell>
                </Grid>
               
                <div className="event__Full event__Coments">
                    <h2>Komentarze</h2>
                    <p>Tak lub nie?</p>
                </div>

              </div>
            </section>
            
		);
	}
}



const customHeaderProfile = (
    <div>
        <div style={{float: 'left', margin: '0px'}}>
            <Image
                src="https://avatars1.githubusercontent.com/u/1182600?s=460&v=4"
                style={`height: 60px; width: 60px;float: left; margin-right: 20px;`}
                inline
                rounded
            />
        </div>
        <h3 style={{float: 'left', margin: '0px'}}>
            <small style="font-size:0.6em;">Organizator</small><br/>
            Ajain Vivek
        </h3>
    </div>
);

const JoinButton = (
      <Button rounded 
        style={'padding: 10px; height: 50px; width: 240px; border-radius: 4px;'}>
        <Icon name="check" size="small" /> <span style='font-size: 20px; margin: 0 0 0 10px;'>Dołącz do eventu!</span>
      </Button>
);


export default Home;