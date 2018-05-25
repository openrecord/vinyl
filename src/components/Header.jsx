import React from 'react';

 export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          apiHealthy: null
        };

        this._apiHealthcheck()
    }

    render(){
        return(
        <div className="header">
            <h1>Open Record</h1>
            <p>API Health: {this.state.apiHealthy ? 'true' : 'false'}</p>
        </div>
        )
    }

    async _apiHealthcheck() {
      // const url = 'http://localhost:3000/healthcheck';
      const url = 'https://iefvy6bi21.execute-api.us-east-1.amazonaws.com/dev/healthcheck';
      const response = await fetch(url);
      const health = await response.json();
      this.setState({apiHealthy: health.healthy})
    }
 }