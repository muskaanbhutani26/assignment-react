
import React, { Component } from 'react';
class Suggestions extends Component {

    render() {

        return (
            this.props.ships.map((ship, index) => 
            <div key={index}  className="row">
            <div className="col-xs-5 my-3">
              <div className="p-3 border bg-light">{ship.name}</div>
            </div>
            </div>
          )
        )

      }

    }
export default Suggestions