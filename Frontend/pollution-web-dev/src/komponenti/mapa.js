import React from 'react'
import L from 'leaflet'
import {Map, TileLayer, ImageOverlay, Popup,CircleMarker} from 'react-leaflet';
import Header from "./header";
import Legend from './mapi/legend'
import LegendPM10 from './mapi/legendPM10'
import LegendNO from './mapi/legendNO'
import LegendSO2 from './mapi/legendSO2'
import Pollutants from "./selectPollutant";
import SidePanel from './sidePanel';
import ErrDiv from './errorMsg'
import {Container, Row, Col, Button} from "react-bootstrap";
import Axios from "axios";
import moment from 'moment';
import {geolocated} from "react-geolocated";
import disiKvalitetnoLogo from  "./logo/disiKvalitetno_Logo.png"
import _ from 'lodash'
import CircularProgress from '@material-ui/core/CircularProgress';
import {Slider, Tooltip} from '@material-ui/core';
import SelectedLocation from './SelectedLocation.js';
import SliderTooltip from './SliderTooltip'


let interval = null;


class Mapa extends React.Component {

     async fetchPollutantValue(pollutantType, latitude, longitude) {
         if(this.state.pollutantValue24.length !==0){
             this.setState({
                 pollutantValue24:[]
             })
         }
         await Axios.get('https://aqf-data.finki.ukim.mk/rest/predictions/pollutant/' + pollutantType + '/daysplus/3/daysminus/0/location/lat/' + latitude.toFixed(4) + '/lng/' + longitude.toFixed(4) +'/')
            .then(res => {
                var threeDaysData=res.data
                var airq = _.reduce(res.data, function(hash, value) {
                    var key = value['cas'];
                    hash[key] = value;
                    return hash;
                }, {});
                this.setState({
                    pollutantValue: threeDaysData[this.state.hour].val,
                    pollutantValue24:threeDaysData,
                    loadingData: false
                });
            })
        .catch((error) => {

            if(error.message==="Network Error"){

                this.setState({
                    errMSGVisible:true,
                    errorText:"Поврзувањето е неуспешно!"
                });
                this.closePopup();
                this.closeDetails();
            }
         });

         if (this.state.pollutantValue24.length===0){
             this.openErrDivDetails()
         }

    };

    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
        this.corner1 = L.latLng(39.681086, 19.678524);
        this.corner2 = L.latLng(43.049166, 23.850713);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.player = this.player.bind(this);
        this.pausePlayer = this.pausePlayer.bind(this);
        this.changeHour = this.changeHour.bind(this);
        this.closeDetails = this.closeDetails.bind(this);
        this.state = {
            bound: L.latLngBounds(this.corner1, this.corner2),
            zoom: 8.5,
            selId: 0,
            selIme: '',
            hour: new Date().getHours(),
            started: true,
            startDate: new Date().setHours(0),
            currentDate: new Date(),
            searchId: this.props.searchId,
            searchCity: this.props.searchCity,
            popupLatLng: (this.props.match.params.lat && this.props.match.params.lng) ? {
                "lat": parseFloat(this.props.match.params.lat),
                "lng": parseFloat(this.props.match.params.lng)
            } : null,
            popupVisible: (this.props.match.params.lat && this.props.match.params.lng && !this.props.match.params.details) ? true : false,
            showLocationDetails: (this.props.match.params.lat && this.props.match.params.lng && this.props.match.params.details=='details') ? true : false,
            selectedLocation: (this.props.match.params.lat && this.props.match.params.lng) ? {
                "latitude": parseFloat(this.props.match.params.lat),
                "longitude": parseFloat(this.props.match.params.lng)
            } : null,
            circleVisible: (this.props.match.params.lat && this.props.match.params.lng) ? true : false,
            pollutantValue: 0,
            pollutantValue24:[],
            pollutantType: 1,
            urlLat: this.props.match.params.lat,
            urlLng: this.props.match.params.lng,
            loadingData: true,
            isPlaying:false,
            pollutantName:'PM10',
            PM10isActive:true,
            PM25isActive:false,
            NOisActive:false,
            SO2isActive:false,
            sidePanelVisible:false,
            errMSGVisible:false,
            errorText:"",
        }
    }

    isDetailsActive = (e) => {
        let s = '/' + e.latlng.lat.toFixed(4) + '/' + e.latlng.lng.toFixed(4);
        window.history.pushState({"html": "", "pageTitle": ""}, "", s);
        this.setState({
            selectedLocation: {"latitude": e.latlng.lat, "longitude": e.latlng.lng},
            popupLatLng: {"lat": e.latlng.lat, "lng": e.latlng.lng}
        })
        if (this.state.showLocationDetails) {
            this.openDetails(e);
            this.setState({
                popupVisible: false,
                // selectedLocation: {"latitude": e.latlng.lat, "longitude": e.latlng.lng}
            })

        } else {
            this.addPopup(e);
        }

    };



      changePollutant=(poll)=> {
          this.setState({
            pollutantName:poll
        });


        if(poll == "PM25"){
             this.setState({
                pollutantType: 2,
                PM25isActive:true,
                PM10isActive:false,
                NOisActive:false,
                SO2isActive:false
            },this.checkforPopup)

        }

        if (poll == "PM10"){
             this.setState({
                pollutantType: 1,
                PM25isActive:false,
                PM10isActive:true,
                NOisActive:false,
                SO2isActive:false
            },this.checkforPopup)

        }

        if (poll == 'NO'){
             this.setState({
                pollutantType: 3,
                PM25isActive:false,
                PM10isActive:false,
                NOisActive:true,
                SO2isActive:false
            },this.checkforPopup)

        }

        if (poll == 'SO2'){
             this.setState({
                pollutantType: 4,
                PM25isActive:false,
                PM10isActive:false,
                NOisActive:false,
                SO2isActive:true
            },this.checkforPopup)

        }

    };

    checkforPopup=()=>{
        if (this.state.popupVisible){
            this.addPopup();
        }
    };


    setCurrentLocation = () => {
        let s = '/' + this.props.coords.latitude.toFixed(4) + '/' + this.props.coords.longitude.toFixed(4);
        window.history.pushState({"html": "", "pageTitle": ""}, "", s);
        this.setState({
            selectedLocation: {"latitude": this.props.coords.latitude, "longitude": this.props.coords.longitude},
            popupLatLng: {"lat": this.props.coords.latitude, "lng": this.props.coords.longitude}
        })
        if (this.state.showLocationDetails) {
            this.openDetails();
            this.setState({
                popupVisible: false,
                // selectedLocation: {"latitude": e.latlng.lat, "longitude": e.latlng.lng}
            })

        } else {

            this.addPopup();
        }

    };

    dateToUrl = (date) => {
        const dateF = moment(date).subtract(1,"hours").format('YYYY-MM-DD_HH:00:00');
        return "https://aqf.finki.ukim.mk/images/"+this.state.pollutantName+"/wrfout_d01_" + dateF + ".png";


    };

    addPopup = () => {
        this.fetchPollutantValue(this.state.pollutantType, this.state.popupLatLng.lat, this.state.popupLatLng.lng);
        this.setState({
            popupVisible: true,
            loadingData: true,
            circleVisible:true
        });
    };

    closePopup = () => {
        window.history.pushState({"html": "", "pageTitle": ""}, "", '../../');
        this.setState({
            popupVisible: false,
            circleVisible:false,
            loadingData: true
        })
        console.log(this.state.pollutantValue24);

    }

    openDetails = () => {
        let s = '/' + this.state.popupLatLng.lat.toFixed(4) + '/' + this.state.popupLatLng.lng.toFixed(4) + '/details';
        window.history.pushState({"html": "", "pageTitle": ""}, "", s);
        this.setState({showLocationDetails: true, popupVisible: false, circleVisible: true})
    }


    closeDetails = () => {
        window.history.replaceState({"html": "", "pageTitle": ""}, "", '../../');
        this.setState({showLocationDetails: false, circleVisible: false})
    }

    detailsStateUpdateVisible=(lat,lng)=>{
        this.setState({
            showLocationDetails:true,
            selectedLocation: {"latitude": lat, "longitude": lng},
            popupLatLng: {"lat": lat, "lng": lng},
            circleVisible: true,
            popupVisible: false,
        })
    };


    getPM25Color = (id) => {
        let val = this.state.vrednostiOpstini[id];
        if (val < 12.1) {
            return 'green';
        } else if (val < 35.5) {
            return 'yellow';
        } else if (val < 55.5) {
            return '#orange';
        } else if (val < 150.5) {
            return 'red';
        } else if (val < 250.5) {
            return 'blueviolet';
        } else {
            return 'darkviolet'
        }
    };


    getCurrentDate = () => {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;
        return dateTime

    };


    //Heat map 24 hours player
    player() {
        this.setState({
            isPlaying:true
        })
        if (this.state.started) {
            interval = setInterval(this.changeHour, 500);
        }
    }

    async changeHour() {

        if (this.state.hour >= 95) {
            this.setState({
                hour: 0,
                currentDate: this.state.startDate
            })
        }

         await this.setState({
            hour: this.state.hour+1,
            currentDate: moment(this.state.startDate).add(this.state.hour, 'hours'),
            started: false


        });

        if(this.state.pollutantValue24.length!=0){
            console.log(this.state.hour);
            this.setState({
                pollutantValue:this.state.pollutantValue24[this.state.hour].val
            })
        }

    }

    pausePlayer() {
        this.setState({
            started: true,
            isPlaying:false
        });
        clearInterval(interval);
    }

    //Manual hour change on player
    handleOnChange = (event, value) => {

        if (this.state.pollutantValue24.length ==0){
            this.setState({
                hour: value,
                currentDate: new Date().setHours( value),
            });
        }else{
            this.setState({
                hour: value,
                currentDate: new Date().setHours( value),
                pollutantValue:this.state.pollutantValue24[value].val,
            });
            console.log(this.state.hour)
        }
    };

    openSidePanel=()=>{
        this.setState({sidePanelVisible:true})

    }

    closeSidePanel=()=>{
        this.setState({sidePanelVisible:false})
    };

    closeErrDiv=()=>{
        this.setState({
            errMSGVisible:false
        })
    };

    openErrDivDetails=()=>{
        console.log("inside!")
      this.setState({
          errMSGVisible:true,
          errorText:"Нема податоци за избраната локација!"

      });
        this.closePopup();
        this.closeDetails();
    };

    render() {
        let lat = 41.6086;
        let lng = 21.7453;

        let maxZoom = 15;
        let minZoom = this.state.zoom;
        let zoomSnap = 0.5;

        const position = [lat, lng];

        let today = new Date();
        let date = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();


        let tomorrowDate = new Date()
        tomorrowDate.setDate(today.getDate() + 1);
        let tomorrow = tomorrowDate.getDate() + '.' + (tomorrowDate.getMonth() + 1) + '.' + tomorrowDate.getFullYear();

        let dayTwoDate = new Date()
        dayTwoDate.setDate(today.getDate() + 2);
        let dayTwo = dayTwoDate.getDate() + '.' + (dayTwoDate.getMonth() + 1) + '.' + dayTwoDate.getFullYear();

        let dayThreeDate = new Date()
        dayThreeDate.setDate(today.getDate() + 3);
        let dayThree = dayThreeDate.getDate() + '.' + (dayThreeDate.getMonth() + 1) + '.' + dayThreeDate.getFullYear();


        let time = today.getHours();
        let dateTime = date + ' ' + time;

        const marks = [
            {
                value: 0,
                label: date,
            },
            {
                value: 24,
                label: tomorrow,
            },
            {
                value: 48,
                label: dayTwo,
            },
            {
                value: 72,
                label: dayThree,
            },
            {
                value: 95,
                label: '',
            }

        ];


        return (
            <Container fluid>

                {this.state.sidePanelVisible && <SidePanel sidePanelvisible={this.closeSidePanel} />}

                <Header detailsStateUpdate={this.detailsStateUpdateVisible} activateSidePanel={this.openSidePanel}/>
                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

                {this.state.errMSGVisible && <ErrDiv errorMessage={this.state.errorText} closeErrDiv={this.closeErrDiv} />}


                <Map ref={this.mapRef} className="mapa" center={position} zoom={minZoom} zoomControl={false}
                     maxZoom={maxZoom} minZoom={minZoom} trackResize={true} zoomSnap={zoomSnap}
                     maxBounds={this.state.bound} fitBounds={true} onClick={this.isDetailsActive} closePopupOnClick>

                    <TileLayer className="attribution"
                               attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                               url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png"
                    />

                    <ImageOverlay url={this.dateToUrl(this.state.currentDate)}
                                  bounds={[[34.997355, 14.27128], [48.0604156, 28.479352]]}
                                  opacity={0.5}
                    />

                    {/*<ImageOverlay url={Green}*/}
                    {/*              bounds={[[0.0, 0], [40.00728, 40.354553]]}*/}
                    {/*              opacity={0.5}*/}
                    {/*/>*/}

                    {/*<ImageOverlay url={Green}*/}
                    {/*              bounds={[[40.00728, 0], [45.00728, 19.394553]]}*/}
                    {/*              opacity={0.5}*/}
                    {/*/>*/}

                    {/*<ImageOverlay url={Green}*/}
                    {/*              bounds={[[0.08275, 23.487429], [43.08275, 45.539429]]}*/}
                    {/*              opacity={0.5}*/}
                    {/*/>*/}

                    {/*<ImageOverlay url={Green}*/}
                    {/*              bounds={[[43.08275, 0.539429], [45.08275, 45.539429] ]}*/}
                    {/*              opacity={0.5}*/}
                    {/*/>*/}



                    {this.state.popupVisible && <Popup position={this.state.popupLatLng} onClose={this.closePopup} onOpen={this.addPopup}>
                        <Tooltip title={'Повеќе информации'} placement={"top"}>
                            <Button className="moreInfoButton" onClick={this.openDetails} onLoad={this.openDetails }>
                                <i className="fas fa-chevron-circle-down"></i>
                            </Button>
                        </Tooltip>

                        {this.state.PM25isActive && <span>PM<sub>2.5</sub></span>}
                        {this.state.PM10isActive && <span>PM<sub>10</sub></span>}
                        {this.state.NOisActive && <span>NO</span>}
                        {this.state.SO2isActive && <span>SO<sub>2</sub></span>}<span>&nbsp;&nbsp;&nbsp;
                          {this.state.loadingData && <CircularProgress color="primary" size='15px' className="selectedPollutantLoadingCircle" />}
                          {!this.state.loadingData && this.state.pollutantValue.toFixed(2)}
                        µg/m<sup>3</sup></span>


                    </Popup>}

                    {this.state.circleVisible &&
                    <CircleMarker className="circlePointer" center={this.state.popupLatLng} radius={5} color="#8B0000" fillColor="#8B0000"
                                  opacity="0.6" fillOpacity="0.6" weight="0" ></CircleMarker>}

                </Map>


                <div className="logosSpan">
                        <img src={disiKvalitetnoLogo} className="pmAlarmLogoStyle" />
                </div>

                <Pollutants changePollutantFun={this.changePollutant}/>

                {!this.state.showLocationDetails &&
                <Container fluid className="legendNplayer ">

                    <Row className="rangeSlider">

                        <Col md="12" lg="10">
                            {!this.state.isPlaying &&
                            <button className="btn btn-secondary btnPlayer" onClick={this.player}><i className="fas fa-play"></i></button>}
                            {this.state.isPlaying &&
                            <button className="btn btn-secondary btnPlayer" onClick={this.pausePlayer}><i className="fas fa-pause"></i></button>}
                            <Slider
                                min={0}
                                max={95}
                                marks={marks}
                                ValueLabelComponent={SliderTooltip}
                                value={this.state.hour}
                                onChange={this.handleOnChange}
                                orientation="horizontal"
                                valueLabelDisplay="on"
                            />
                        </Col>
                        <Col  md="12" lg="2">
                            {this.state.PM25isActive && <Legend displayLegend={true}/>}
                            {this.state.PM10isActive && <LegendPM10 displayLegend={true}/>}
                            {this.state.NOisActive && <LegendNO displayLegend={true}/>}
                            {this.state.SO2isActive && <LegendSO2 displayLegend={true}/>}
                        </Col>
                    </Row>
                </Container>}

                {this.state.showLocationDetails && <button onClick={this.closeDetails} className="closeBtn"><i className="fa fa-close detailsCloseX"></i></button>}
                {this.state.showLocationDetails && <SelectedLocation location={this.state.selectedLocation} hour={this.state.hour} openErrDivDetails={this.openErrDivDetails}/>}
            </Container>
        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Mapa);