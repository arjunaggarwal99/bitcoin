import logo from './logo.svg';
import React, { Component } from "react"
import { connect } from 'react-redux'
import './App.css';
import { useEffect } from "react";
const axios = require('axios')

export class App extends React.Component {
  render() {
    return(
      <div>
        <h1>
          This is my Second Redux App
        </h1>
        <h2>
          Real-time Bitcoin price
        </h2>
        <p>
          USD
        </p>
        <p>
          {this.props.tweets}
        </p>
        <button className="vertical-center" onClick={this.props.buttonClick}>Click to fetch price</button>
      </div>
    )
  }
}




// this is used to retrieve the store state
const mapStateToProps = (state) => {
  // if(state) {
  //   const JSONval = JSON.parse(state.bpi)
  //   console.log(JSONval)
  // }
  return({tweets: state?state.tweets:[]})
}

// const QuoteChanger = props => {
//   useEffect(() => {
//     const timer = setTimeout(
//       () => props.dispatch({ fetchTweets }),
//       20000
//     );
//     return () => clearTimeout(timer);
//   });
// }

// Thunk Async action
const fetchTweets = () => {
  return function(dispatch) {
    dispatch({type: "FETCH_TWEETS_REQUEST"})
    axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then(response => {
      // response.data is an array of trending tweets
      const tweets = response.data.bpi.USD.rate
      dispatch({type: "FETCH_TWEETS_SUCCESS", payload: tweets})
    })
    .catch(error => {
      // error.message is the error description
      dispatch({type: "FETCH_TWEETS_FAILURE", payload: error.message})
    })
  }
}

// this is used to retrieve the actions and dispatch them to the store
const mapDispatchToProps = (dispatch) => {
  return {
    buttonClick: () => {
    dispatch(fetchTweets())
    }
  }
}

// Adding mapStateToProps and mapDispatchToProps into connect function
const AppContainer = connect(
  // QuoteChanger,
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default AppContainer;