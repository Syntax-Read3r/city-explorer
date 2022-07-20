import React from "react";

export default class Location extends React.Component {


    render() {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>Location:</td>
                            <td>{this.props.location.display_name}</td>
                        </tr>
                        <tr>
                            <td>Latitude:</td>
                            <td>{this.props.location.lat}</td>
                        </tr>
                        <tr>
                            <td>Longitude:</td>
                            <td>{this.props.location.lon}</td>
                        </tr>
                    </tbody>

                </table>
            </div>
        );
    }
}