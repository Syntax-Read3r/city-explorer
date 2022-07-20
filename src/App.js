import React from "react";
import axios from "axios";
import Location from "./Location/Location";
import ErrorMsg from "./ErrorMsg/ErrorMsg";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      location: {},
      longitude: 0,
      latitude: 0,
      mapUrl: "",
      apiError: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      searchQuery: event.target.value,
    });
    console.log(this.state.searchQuery);
  };

  getLocation = async () => {
    try {
      const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_API_KEY}&q=${this.state.searchQuery}&format=json`;
      const res = await axios.get(API);
      console.log(res);

      // map
      const map_url = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${res.data[0].lat},${res.data[0].lon}&zoom=14`;

      this.setState({
        location: res.data[0],
        longitude: res.data[0].lon,
        latitude: res.data[0].lat,
        mapUrl: map_url,
        apiError: "",
      });
    } catch (err) {
      this.setState({
        apiError: err.message,
        location: {},
        longitude: 0,
        latitude: 0,
        mapUrl: "",
      });
    }
  };

  render() {
    return (
      <>
      <div className="firstInput">
        
        <Form.Control
          onChange={this.handleChange}
          placeholder="Serch for a city"
           size="lg"
        ></Form.Control>
        <Button onClick={this.getLocation} variant='info'>Explore!</Button>
        
        </div>
      <div className="secondInput">
        {/* conditionally show the name of the place */}
        <div className="fourInput">
        {this.state.location.display_name && (
          <>
            <Location location={this.state.location} />
            <img src={this.state.mapUrl} alt="map" />
          </>
        )}
        </div>
        <div className="thirdInput">
        {this.state.apiError && <ErrorMsg message={this.state.apiError} />}
        </div>
      </div>
      </>
    );
  }
}

export default App;
