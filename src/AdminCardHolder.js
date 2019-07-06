import React, { PureComponent } from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert'
import { Route } from 'react-router-dom';

export default class AdminCardholder extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };

        this.deleteItem = this.deleteItem.bind(this);
   
        this.onConfirm = this.onConfirm.bind(this);
     
    }

    onConfirm() {
        this.setState({
            show: false,
        });
        window.location.reload();
    

    }


    deleteItem(uuid) {

        const payload = {
            "uuid": uuid,
        };

        console.log(payload)
      //  let self = this;
        axios.post('http://localhost:8080/deleteproduct', payload)
            .then(res => {
                this.setState({
                    show: true,
                });
               


            }).catch(function (error) {
                // handle error

                console.log(error.response.data.errors);
                


            })
    }
    
    render() {
        const imageRes = {
            height: '170px',
            width: 'auto'
        }

       
        return (
            <div>
                <SweetAlert
                    success
                    show={this.state.show}
                    title=""
                    onConfirm={this.onConfirm}

                >
                    Successfully added product
 </SweetAlert>
                <Card>
                    <CardImg style={imageRes} top width="10%" src={this.props.image} alt="Card image cap" />
                    <CardBody>
                        <CardTitle><strong>{this.props.name}</strong></CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>{this.props.description}</CardText>
                      
                        <Button className="btn btn-danger" onClick={() => {
                            this.deleteItem(this.props.uuid);
                            
                        }}>Delete Item </Button>

                        <Route render={({ history }) => (
                            <Button style={{marginLeft:5+"%"}} className="btn btn-info" onClick={() => {
                                history.push('updateproduct/' + this.props.uuid)
                            }}>
                                Update Item
              </Button>
                        )} />
                                
           
                        
             


                    </CardBody>
                </Card>
            </div>
        );
    }
}


AdminCardholder.propTypes = {
    uuid: PropTypes.string
};

AdminCardholder.propTypes = {
    name: PropTypes.string
};

AdminCardholder.propTypes = {
    description: PropTypes.string
};

AdminCardholder.propTypes = {
    image: PropTypes.string
};

AdminCardholder.propTypes = {
    click: PropTypes.string
};
