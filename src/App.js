import React from "react";
import axios from "axios";
import Location from './Location/Location'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      location: {},
      longitude: 0,
      latitude: 0
    };
  }

  handleChange = (event) => {
    this.setState({
      searchQuery: event.target.value,
    });
    console.log(this.state.searchQuery);
  };

  getLocation = async () => {
    console.log(process.env.REACT_APP_API_KEY)
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_API_KEY}&q=${this.state.searchQuery}&format=json`;
    const res = await axios.get(API);
    console.log(res);

     this.setState({ 
      location: res.data[0],
      longitude: res.data[0].lon,
      latitude: res.data[0].lat,
    });
    console.log(this.state);
  };

  handleMap = async () => {
    const API = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${this.state.latitude},${this.state.longitude}&zoom=7`;
    console.log(API);
    const res = await axios.get(API);
    console.log(res);
  }



  render() {
    return (
      <>
        <input
          onChange={this.handleChange}
          placeholder="Serch for a city"
        ></input>
        <button onClick={this.getLocation}>Explore!</button>
        <button onClick={this.handleMap}>Get Map</button>
        {/* conditionally show the name of the place */}
        {this.state.location.display_name && (
          <Location location={this.state.location} />
        )}
      </>
    );
  }
}

export default App;