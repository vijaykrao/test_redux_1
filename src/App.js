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
  state = {
     query: 'war',
     pageNumber :1,
     loading: false,
     prevY: 0
    };

  componentDidMount() {
    this.updateRepoList(this.state.query,this.state.pageNumber);

    var options = {
      root: null, // Page as root
      rootMargin: "20px",
      // threshold: 1.0
    };
    // Create an observer
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this), //callback
      options
    );
    //Observ the `loadingRef`
    this.observer.observe(this.loadingRef);
  }

  handleObserver(entities, observer) {

    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      const _page = this.state.pageNumber + 1;
      this.updateRepoList(this.state.query, _page)
      this.setState({pageNumber: _page})
      // this.updateRepoList(this.state.query, this.state.PageNumber + 1)
    }
    this.setState({ prevY: y });
  }

  updateRepoList = (query, pageNumber) => this.props.getMovies(query,pageNumber);

  render() {
    const loadingCSS = {
      height: "100px",
      margin: "30px"
    };
    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };
    // {console.log("MOVIES PROPS",this.props.movies )}
    return (
      <div className="_divMainStyle">
        <h1>TEST 1 </h1>
        <div className="marginForButtonAndSearch">
        <input
          type="text"
          value={this.state.query}
          onChange={ev => this.setState({ query: ev.target.value })}
          placeholder="Enter Movie Name"
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

        <div ref={loadingRef => (this.loadingRef = loadingRef)}
          style={loadingCSS}
        >
          <span style={loadingTextCSS}>Loading...</span>
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
