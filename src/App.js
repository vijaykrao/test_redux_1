import React, { Component } from 'react';

import { connect } from 'react-redux';

import { getMovies } from './redux';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const _styles = require('./App.css')
// App.js

export class App extends Component {
  state = { query: 'war',pageNumber :1};

  componentDidMount() {
    this.updateRepoList(this.state.query,this.state.pageNumber);
  }

  updateRepoList = (query, pageNumber) => this.props.getMovies(query,pageNumber);

  render() {
    {console.log("MOVIES PROPS",this.props.movies )}
    return (
      <div className="_divMainStyle">
        <h1>TEST 1 </h1>
        <div className="marginForButtonAndSearch">
        <input
          type="text"
          value={this.state.query}
          onChange={ev => this.setState({ query: ev.target.value })}
          placeholder="Movie Name"
        />
        <button onClick={() => this.updateRepoList(this.state.query,this.state.pageNumber)}>
          SEARCH
       </button>
        </div>
        <div >
           {
          this.props.movies.map((movie, index) => (
            // <li key={index}>
            //   <p>{movie.Title}</p>
            // </li>
            <div className="col-sm-2 _divStyleSub">
              <br />
                <div>
                  <Card>
                    <CardImg top width="20%" src={movie.Poster} alt={movie.Title} />
                    <CardBody>
                      <CardTitle>{movie.Title}</CardTitle>
                      <CardSubtitle>{movie.Year}</CardSubtitle>
                      {/* <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText> */}
                      <Button>View Big</Button>
                    </CardBody>
                  </Card>
                </div>
            </div>
          
           ))
           }  
        </div>
        
      </div>
    );
  }
}

// AppContainer.js
const mapStateToProps = (state, ownProps) => ({ movies: state.movie });
const mapDispatchToProps = { getMovies };
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
