import React, { Component } from 'react'
import PubNubReact from 'pubnub-react';
import Cards from './Cards'
import {
	Button
} from 'reactstrap';
import { Row, Col } from 'react-bootstrap';
import Cardholder from './AdminCardHolder';
import axios from'axios';
import { Route } from 'react-router-dom';
export default class Dashboard extends Component {
	constructor(props) {
    	super(props);
			this.state = {highest: 0, people: 0, items:[]};
			//this.last_message = 0;
    	this.pubnub = new PubNubReact({
            publishKey: 'pub-c-172db584-ca6b-4e9c-80a7-4e4d982bcf65',
            subscribeKey: 'sub-c-07e8b65a-78c9-11e8-bf64-d6949d01620d'
        });
    	this.pubnub.init(this);
			// this.state = { highest : 0 };
			console.log({ pubnub: this.pubnub });
		console.log('herere '+localStorage.getItem('Username'))

		if(!localStorage.getItem('Username')){
		this.props.history.push('/login')
		}

    }

		componentWillMount() {
			this.pubnub.subscribe({
					channels: ['art1'],
					withPresence: true
			});
			this.pubnub.getMessage('art1', (msg) => {
					console.log('***'+msg.message);
					//this.last_message = msg.message;
					this.setState ({
						highest: msg.message
					});
			});
			this.pubnub.hereNow({
				channels: ["art1"],
				includeState: true
			},(status,response)=> {
				console.log(response.totalOccupancy);
				this.setState ({
					people: response.totalOccupancy
				});
			});

		}
	componentDidMount() {
	//	let self = this;
		axios.get('http://localhost:8080/getallproducts')
			.then(res => {
			console.log(res.data.data)
			this.setState({items: res.data.data})


			}).catch(function (error) {
				// handle error

				console.log(error)
				


			})




	}

	render() {
		const messages = this.pubnub.getMessage('art1');
		const presence = this.pubnub.hereNow('art1');

		const products = this.state.items;

	    return (
	    		<div>
						<Cards data={messages.length} highest={this.state.highest} people={this.state.people}/>

<br/>
			<div><Route render={({ history }) => (
					<Button style={{marginLeft: 45+'%',width:200+'px',height:50+'px'}} className="btn btn-success" onClick={() => {

						history.push('addproduct/');
					}}>
						Add an item
              </Button>
				)} /></div>	
<hr/>
<Row>
					{
						products.map((value, index) => {
						return (<Col md={4}>
							<Cardholder name={value.name} uuid={value.uuid} description={value.description} image={value.image} />
						
						</Col>
						)
					})}
				</Row>
    </div>
   






				);
	}
}
