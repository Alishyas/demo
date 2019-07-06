import React, { Component } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import Img from 'react-image'
import Countdown from 'react-countdown-now';
import PubNubReact from 'pubnub-react';
import { ListGroup, ListGroupItem } from 'reactstrap';
export default class Art1 extends Component {
	constructor(props) {
    	super(props);
		this.state = { isCompleted: false, imageName: localStorage.getItem('imageArt'), artName: this.props.match.params.art}
    	this.pubnub = new PubNubReact({
			publishKey: 'pub-c-5981e5ab-f883-440d-9b89-9d85e4068296',
			subscribeKey: 'sub-c-20f36950-90d4-11e9-8da6-aad0a85e15ac'
        });
    	this.pubnub.init(this);
    	this.handleChange = this.handleChange.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
	
  	}

  	handleChange(event) {
    	this.setState({value: event.target.value});
  	}

  	handleSubmit(event) {
			var startingBid = 30;
  		var data =localStorage.getItem('Username');
  		console.log('localStorage'+data);
  		var message = data+" : "+this.state.value;
			if(data != null) {
			if(this.state.value > startingBid && this.state.value < 1000000) {
				this.pubnub.publish({
	                message: message,
	                channel: this.state.artName
	        });
			} else {
				alert("Enter value between Starting Bid and 1000000!");
			}
		}else {
			alert("Enter username!");
		}
    	event.preventDefault();
  	}

		componentWillMount() {
         this.pubnub.subscribe({
			 channels: [this.state.artName],
			 triggerEvents: true,
			 withPresence: true,
			 autoload: 2
		 });
			this.pubnub.getMessage(this.state.artName, (msg) => {
         	var data = localStorage.getItem('username');
             console.log('this.last_message 1'+msg);
		 });
		 
		

		
     }

	render() {
		const messages = this.pubnub.getMessage(this.state.artName);
		let isCompleted = this.state.isCompleted;
		let chatbox;

		const renderer = ({ hours, minutes, seconds, completed }) => {
			if (completed) {
				// Render a complete state
				isCompleted =true;
				return <span>{messages.map(m=>m.message).pop().split(":")[0]} won the bidding by {messages.map(m=>m.message).pop().split(":")[1]} $</span>
			} else {
				// Render a countdown
				return <span>Bidding ends on {minutes}:{seconds}</span>;
			}
		};

		if (!isCompleted) {
		chatbox = <ListGroup>{messages.map((m, index) => <ListGroupItem><h1 key={'message' + index}>{m.message}</h1></ListGroupItem>)}</ListGroup>
					
		} else {
			chatbox= <span>Complete</span>
		}
	
	    return (
	    	<div>
	
					<Row>
						<Col md={6}>
				    	<Img height={360} width={636} src={this.state.imageName}/>
				    	<br/>
				    	<br/>
				    	<form onSubmit={this.handleSubmit} style={{marginLeft: 10 + 'em'}}>
									<h2> Starting bid: $30 </h2>
			        		<label>
			          			<FormControl type="number" pattern="[0-9]*" inputMode="numeric" value={this.state.value} onChange={this.handleChange} />
			        		</label>
			        		<Button className="btn btn-info btn-lg" type="submit" value="Submit" style={{marginLeft: 10 + 'px'}}>Place Bid</Button>
			      	</form>
						</Col>
				
				<Col md={6}>
						 <Countdown date={Date.now() + 30 * 1000} renderer={renderer}>
						</Countdown>
						<br/>
					
					{chatbox}	
					</Col>
					</Row>
      	</div>
	    );
	}
}
