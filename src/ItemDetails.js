import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import Seller from './seller.js'
import { withRouter } from 'react-router'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import Checkout from './Checkout.js'



class ItemDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: {}
        }
        this.handleClick = this.handleClick.bind(this)
        this.backToHome = this.backToHome.bind(this)
    }
    componentDidMount() {
        let callBack = function (response) {
            let parsed = JSON.parse(response)
            this.setState({
                item: parsed.result
            })
        }
        callBack = callBack.bind(this)
        fetch('/itemDetails', {
            method: 'POST',
            body: JSON.stringify({
                itemID: this.props.itemID
            })
        }).then(function (x) {
            return x.text()
        }).then(callBack)
    }

    getSellerDetail() {
        let callBack = function (response) {
            let parsed = JSON.parse(response)
            this.props.dispatch({
                type: "setSessionId",
                id: parsed.id
            })
        }
        callBack = callBack.bind(this)
        fetch('/sellerDetail', {
            method: 'GET',

        }).then(function (x) {
            return x.text()
        }).then(callBack)

    }
    handleClick(event) {
        event.preventDefault();
        if (this.props.sessionID) {
            this.props.dispatch({
                type: "addToCart",
                itemID :this.props.itemID,
                name: this.state.item.name,
                description: this.state.item.description,
                price: this.state.item.price,
                image: this.state.item.image

            })
            this.props.history.push('/cart/')
        } else {
            alert('Please login to add an item to the shopping cart.')
        }

    }

    backToHome(){
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="ItemDetails">

                <div>Item Details:</div>
                <div>
                    <img src={'/' + this.state.item.image}></img>
                  
                </div>
                <div>Title:{this.state.item.name}</div>
                <div>Price:{this.state.item.price}</div>
                <div>Details:{this.state.item.description}</div>
                <div>Seller:<Link to={"/seller/" + this.state.item.username}>{this.state.item.username}</Link> </div>
                <form>
                    <div className="button">
                        <input type="submit" value="Add to cart" onClick={this.handleClick} />
                    </div>
                </form>
                <button onClick={this.backToHome}>Back to Shopping</button>
                
            </div>)
    }
}


let connectedItemDetails = connect(function (store) {
    return {
        sessionID: store.session
    }
})(withRouter(ItemDetails))
export default connectedItemDetails