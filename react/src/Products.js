import React, {PureComponent} from 'react';
import { Row, Col } from 'react-bootstrap';
import Cardholder from './Cardholder';
import axios from 'axios'

export default class Products extends PureComponent{
	constructor(props) {
		super(props);
		this.state = { items: [] };
		if (!localStorage.getItem('Username')) {
			this.props.history.push('/login')
		}

	}


	componentDidMount() {
	//	let self = this;
		axios.get('http://localhost:8080/getallproducts')
			.then(res => {
				console.log(res.data.data)
				this.setState({ items: res.data.data })


			}).catch(function (error) {
				// handle error

				console.log(error)



			})
		}
			
	render(){

		const products = this.state.items;

		return(
			<div>
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

