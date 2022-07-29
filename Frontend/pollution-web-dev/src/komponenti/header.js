import React, {Fragment} from 'react';
import { Navbar} from 'react-bootstrap';
import { Tooltip } from '@material-ui/core';
import AutoCompleteText from './AutoComplete'
import { geolocated,GeolocatedProps } from "react-geolocated";
import ErrDiv from './errorMsg'



class Header extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            firstTime: true,
            errMSGVisible:false,
            errorText:"",
        }
    }



    openSidePanel=()=>{
        this.props.activateSidePanel()
    };


    openGpsLocationDetails = () =>{
        if (!this.props.isGeolocationEnabled){
            this.setState({
                errMSGVisible:true,
                errorText:"Дозволете и пристап на апликацијата кон вашата локација!",
            });
            return;
        }

        let s = '/' + this.props.coords.latitude.toFixed(4) + '/' + this.props.coords.longitude.toFixed(4) + '/details';
        window.history.pushState({"html": "", "pageTitle": ""}, "", s);
        this.props.detailsStateUpdate(this.props.coords.latitude, this.props.coords.longitude);

    };



    closeErrDiv=()=>{
        this.setState({
            errMSGVisible:false
        })
    };


    render() {


        return (
            <div className="NavDivStyle">

                {this.state.errMSGVisible && <ErrDiv errorMessage={this.state.errorText} closeErrDiv={this.closeErrDiv} />}

                <Navbar className="nav navigation" bg="dark" variant="dark" expand="xs">

                    <Navbar.Brand>
                        <Navbar.Toggle onClick={this.openSidePanel} aria-controls="basic-navbar-nav">
                            <Tooltip title={'Отвори мени'} enterDelay={1600}>
                                <i className="fas fa-bars"></i>
                            </Tooltip>
                        </Navbar.Toggle>
                    </Navbar.Brand>

                    <div className="App-Component searchBox">
                        <AutoCompleteText></AutoCompleteText>
                    </div>

                    <div className="findGpsButtonDiv" onClick={this.openGpsLocationDetails}>
                        <Tooltip title={'Вашата локација'}>
                            <i className="fas fa-map-marker-alt"></i>
                        </Tooltip>
                    </div>

                </Navbar>
            </div>
        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Header);
