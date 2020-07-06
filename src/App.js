import React, { Component } from 'react';

import { connect } from 'react-redux';

import { getMovies, getNewMovies } from './redux';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

 require('./App.css')


export class App extends Component {
  state = {
     query: 'war',
     pageNumber :1,
     loading: false,
     prevY: 0,
     show: false,
    title:"",
    poster:"",
    year:0
    };

  componentDidMount() {
    this.updatemovieList(this.state.query,this.state.pageNumber);

    var options = {
      root: null, // Page as root
      rootMargin: "20px"
    };
    // Create an observer
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this), //callback
      options
    );
    //Observe the `lazy_loadingRef`
    this.observer.observe(this.lazy_loadingRef);
  }

  handleObserver(entities, observer) {
const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
        const _page = this.state.pageNumber + 1;
        this.updatemovieList(this.state.query, _page)
        this.setState({pageNumber: _page})
    }
    this.setState({ prevY: y });
  }

  updatemovieList = (query, pageNumber) => this.props.getMovies(query,pageNumber);

  newMovieList= (query, pageNumber) =>  this.props.getNewMovies(query,1);


  showModal = (m,y,p) => {
    console.log("SHOW")
    this.setState({ 
      show: true, 
      title:m,
      poster:p,
      year:y },()=>{console.log(this.state.show)});
  };

  onClose=()=> {
    console.log("CLOSE")
    this.setState({ show: false });
  };

  toggleModal = () => {
    this.setState({
      show: !this.state.isOpen
    })}

  render() {
    const loadingCSS = {
      height: "100px",
      margin: "30px"
    };
    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };
    

    // The modal "window"

    return (
      <div className="_divMainStyle">
        <h1>MOVIE SERACH IMDB </h1>
        <div>

        <div class="input-group mb-3">
            <input type="text" class="form-control" 
              aria-describedby="button-addon2"
              type="text"
                  value={this.state.query}
                  onChange={ev => this.setState({ query: ev.target.value })}
                  placeholder="Enter Movie Name" />
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" 
                  onClick={() => this.newMovieList(this.state.query,1)}> Search</button>
            </div>
          </div>
        </div>
        <div className="row col-sm-12" >
           <div class="col-sm-4"></div>
          <div class="col-sm-4">
          {
          this.props.movies ? this.props.movies.map((movie, index) => (
            <div className="col-sm-12">
              <br />
                <div class="card" >
                  
                    <img class="card-img-top" src={movie.Poster} alt={movie.Title} />
                    <div>
                      <p class="card-text">{movie.Title}</p>
                      <p class="card-text">{movie.Year}</p>
                      <button type="button"  class="btn btn-primary btn-primary-custom" 

                        onClick={()=>this.showModal(movie.Title, movie.Year, movie.Poster)}
                      >View Big</button>
                    </div>                  
                </div>
            </div>
           )):""
           } 
          </div>

        <div class="col-sm-3"></div>
        </div>


        <div ref={lazy_loadingRef => (this.lazy_loadingRef = lazy_loadingRef)}
          style={loadingCSS}
        >
          <span style={loadingTextCSS}>Loading...</span>
        </div>
        <div>
        {
                      this.state.show == true?
                      <div className="backdropStyle" >

                      <div className="modalStyle">
                      <button onClick={this.onClose} className="btn btn-primary btn-primary-custom closeButton">
                            Return to home
                          </button>
                      <div className="col-sm-12">
                            <br />
                              <div  >
                                
                                  <img class="card-img-top-new" src={this.state.poster} alt={this.state.title} />
                                  <div>
                                    <p class="card-text">Movie Name : {this.state.title}</p>
                                    <p class="card-text">Year : {this.state.year}</p>
                                    
                                  </div>                  
                              </div>
                          </div>
              
                        <div className="footer">
                          <button onClick={this.onClose} className="btn btn-danger closeButton">
                            Close
                          </button>
                        </div>
                      </div>
                    </div>:""
                    }
        </div>
      </div>
    );
  }
}

// AppContainer.js
const mapStateToProps = (state, ownProps) => ({ movies: state.movie, totalResults : state.totalResults });
const mapDispatchToProps = { getMovies, getNewMovies };
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
