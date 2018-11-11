import React, { Component } from "react";
import { connect } from 'react-redux'
import Checkout from './Checkout'
import { withRouter } from 'react-router'

class ShoppingCart extends Component {
    
   
    constructor() {
        super()
        this.state = {
            
        }
    //     this.increaseItem = this.increaseItem.bind(this)
    //     this.decreaseItem = this.decreaseItem.bind(this)
        this.getTotal = this.getTotal.bind(this)
        this.backToHome = this.backToHome.bind(this)
    }
    // increaseItem(event) {
    //     event.preventDefault()
    //     let newQuantity = this.state.quantity + 1
    //     this.setState({ quantity: newQuantity })

    // }
    // decreaseItem(event) {
    //     event.preventDefault()
    //     let newQuantity = this.state.quantity - 1
    //     this.setState({ quantity: newQuantity })
    // }
   
    getTotal(){
        let total =0
        this.props.items.forEach(function(item){
            let price =parseInt(item.price)
            total += price
        });
        return `${total} $`
        // for(let i=0; i<items.length; i++){
        //     total += items[i].price
        //     return total
    
}
backToHome(){
    this.props.history.push('/')
}
    showItems(item) {
      
       
        return(<div>
            <img src={'/' + item.image}></img>
            <div>Name: {item.name}</div>
            <div>Description: {item.description}</div>
            <div>Price: {item.price}$</div>

            
            </div>)
    }
    render() {
        return (<div className="shoppingCart">
            <div>{this.props.items.map(this.showItems)}</div>
            {/* <input type="submit" value="+" onClick={this.increaseItem} />
            <input type="submit" value="-" onClick={this.decreaseItem} /> */}
            <div>Total price:{this.getTotal(this.props.items)}</div>
            <button onClick={this.backToHome}>Back to Shopping</button>
            <Checkout />
        </div>)
    }
}
const mapStateToProps = (state) => {
    return { items: state.cartItems }
}

let connectedMapStateToStore = connect(mapStateToProps)(withRouter(ShoppingCart))
export default connectedMapStateToStore;
