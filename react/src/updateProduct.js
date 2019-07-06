import React, { Component } from 'react';
import './new.css';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert'



class AddProduct extends Component {
    constructor() {
        super();
        this.state = {
            description: '',
            name: '',
            image:'',
            uuid:'',
            error: '',
            show: false,
        };

        this.handleDescription = this.handleDescription.bind(this);
        this.handleImage = this.handleImage.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dismissError = this.dismissError.bind(this);
        this.onConfirm = this.onConfirm.bind(this);

        if (!localStorage.getItem('Username')) {
            this.props.history.push('/login')
        }

    }

    onConfirm() {
        this.setState({
            show: false,
        });
    }

    dismissError() {
        this.setState({ error: '' });
    }
    componentDidMount(){

        const payload = {
            "uuid": this.props.match.params.uuid,
        };
        console.log(payload)
        
      //  let self = this;
        axios.post('http://localhost:8080/product', payload)
            .then(res => {
               console.log(res)
                this.setState({image: res.data.data.image})
                this.setState({ description: res.data.data.description })
                this.setState({ name: res.data.data.name })
                this.setState({ uuid: res.data.data.uuid })



            }).catch(function (error) {
                // handle error

                console.log(error.response);
                


            })
    }

    handleSubmit(evt) {
        console.log('here')
        evt.preventDefault();
        if (!this.state.name) {
            return this.setState({ error: 'Name is required' });
        }

        if (!this.state.description) {
            return this.setState({ error: 'Description is required' });
        }
        if (!this.state.image) {
            return this.setState({ error: 'Image is required' });
        }
        console.log(this.state)

        const payload = {
            "name": this.state.name,
            "image": this.state.image,
            "description": this.state.description,
            "uuid":this.state.uuid


        };
        let self = this;
        axios.post('http://localhost:8080/updateproduct', payload)
            .then(res => {
                this.setState({
                    show: true,
                });


            }).catch(function (error) {
                // handle error

                console.log(error.response.data.errors);
                return self.setState({ error: error.response.data.errors });


            })

       



    }

    handleImage(evt) {
        this.setState({
            image: evt.target.value,
        });
    };
    handleDescription(evt) {
        this.setState({
            description: evt.target.value,
        });
       
    };

    handleName(evt) {
        this.setState({
            name: evt.target.value,
        });
   

    }

    render() {
        // NOTE: I use data-attributes for easier E2E testing
        // but you don't need to target those (any css-selector will work)

        return (
            <div className="wrapper">
                <form className="form-signin" onSubmit={this.handleSubmit}>
                    {
                        this.state.error &&
                        <h3 data-test="error" onClick={this.dismissError}>
                            <button onClick={this.dismissError}>✖</button>
                            {this.state.error}
                        </h3>
                    }
                    <SweetAlert
                        success
                        show={this.state.show}
                        title=""
                        onConfirm={this.onConfirm}

                    >
                        Successfully updated product
 </SweetAlert>


                    <input type="text" className="form-control" value={this.state.name} name="name" placeholder="Product Name" autoFocus onChange={this.handleName} />
                    <br />
                    <input type="text" className="form-control" value={this.state.image} name="image" placeholder="Image Address" autoFocus onChange={this.handleImage} />
                    <br />
                     <textarea className="form-control" value={this.state.description} name="description" placeholder="Description" autoFocus onChange={this.handleDescription} />
                    <br />

                    <input type="submit" value="Update Product" data-test="submit" className="btn btn-lg btn-primary btn-block" />
                    <br />
                 
                </form>

            </div>
        );
    }
}

export default AddProduct;