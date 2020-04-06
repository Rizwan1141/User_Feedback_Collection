// this file would handle all payment related stuff
// you can name it like stripe wraper etc

import React, { Component } from  'react'
import StripeCheckout from  'react-stripe-checkout'
import { connect } from 'react-redux'
import * as actions from '../actions'

//amount property on StripeCheckout  below needs clarity, as i am in US, amount means Dollars to me, if you are from different country like england would refer to pounds
//Stripe Checkout by default uses US Dollars, if we want different currency you can use, but here we would be using US Dollars
//if we want to pay/ask 5 dollars we would set 500, ie cents, 1 dollar is 10 cents
//the other poorly named prop is token,it expects, call back function after we have received authorized token from stripe
//stripeKey is publishable key
class Payments extends Component{
    render(){
        //debugger;
        return(
            <StripeCheckout 
                name="Emaily"
                description="$5 for 5 email Credits"
                amount={500}
                token={token => this.props.handleToken(token)//console.log(token)
                        }
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">
                    Add Credits
                </button>
            </StripeCheckout>
        )
    }
}

export default connect(null, actions) (Payments);