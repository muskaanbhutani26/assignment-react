
import React, { Component } from 'react';
import Suggestions from './suggestions'
import Header from './header'
import {debounce} from 'lodash';
var MagnifyingGlass = require('../assets/magnifying-glass.svg');
var cross = require('../assets/cross.svg');


class Search extends Component {
    state = {
      query: '',
      ships: []
    }  
    
    getInfo = (queryText) => {
        fetch('api/ships/'+queryText)
        .then(res => res.json())
          .then( (data ) => {
            this.setState({
             ships: data                             
            });
          })
      }

      clearSearchInput= () => {
        this.search.value='';
        this.setState({
            query: '',
            ships : []
        });
      }

      handleEnter = (event) => {
        if(event.keyCode === 13){
            event.preventDefault();
            this.getInfo(this.search.value);
        }
      }


   
    handleInputChange = debounce(() => {
      this.setState({
        query: this.search.value
      }, () => {
          if(this.state.query){
            this.getInfo(this.state.query);
          } else {
            this.setState({
                ships: []                             
            });
          }
            
      })
    }, 600);
   
    render() {
      return (
        <div>
            <Header/>
            <div className="container">
                <div className="row">
                    <form onSubmit={e => { e.preventDefault(); }}>
                        <div className="col-xs-9 search">
                            <input className="form-control" type="search"
                            placeholder="Search for..."
                            ref={input => this.search = input}
                            onChange={this.handleInputChange} onKeyUp={this.handleEnter}
                            />
                        <span className="col-xs-1 icon-search">
                                { this.state.query ? <img src={cross} height="30" onClick={this.clearSearchInput} /> : <img src={MagnifyingGlass} height="30"/> }
                            </span>
                            
                        </div>
                    </form>
                </div>
                { this.state.ships.length > 0 ? <Suggestions ships={this.state.ships} /> : <h4 className="my-3">No results Found</h4> }
                <Suggestions ships={this.state.ships} />
            </div>
        </div>
      )
    }
   }
   
export default Search