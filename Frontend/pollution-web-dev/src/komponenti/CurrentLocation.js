import React from 'react';
import {geolocated} from 'react-geolocated';

class CurrentLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstTime: true

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.coords !==null){
            if(this.state.firstTime){
                this.props.getCoords(this.props.coords);
                this.setState({firstTime:false})
            }
        }
    }



    render() {

        return !this.props.isGeolocationAvailable
            ? <div>Your browser does not support Geolocation</div>
            : !this.props.isGeolocationEnabled
                ? <div>Geolocation is not enabled</div>
                : this.props.coords
                    ? <table>
                        <tbody>
                        <tr><td>latitude</td><td>{this.props.coords.latitude}</td><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
                        </tbody>
                    </table>
                    : <div>Getting the location data&hellip; </div>;
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(CurrentLocation);
