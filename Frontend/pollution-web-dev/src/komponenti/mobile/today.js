import React, { Component } from 'react';
import "./today.css";
import moment from 'moment';
import Axios from "axios";

export default class Today extends React.Component {

    constructor(props){
        super(props);
        this.state={
            loadingData:true,
            pm25minValue:'',
            pm25maxValue:'',
            pm10minValue:'',
            pm10maxValue:'',
            nominValue:'',
            nomaxValue:'',
            so2minValue:'',
            so2maxValue:'',
            municipalityNameToday:source[this.props.match.params.municipalityID].title,
            locationMode:(this.props.match.params.municipalityID ==0) ? true : false

        }
    }

    async fetchData(lat,lng){

        let data = {};
        let min=99999;
        let max=0;

        await Axios.get('https://aqf-data.finki.ukim.mk/rest/spot/daysplus/0/daysminus/0/lat/'+lat+'/lng/'+lng+'/')
            .then(res => {
                data = res.data
            });

        data.map((value,key)=>{
            if (key ===0){
                this.setState({
                    pm10minValue: Math.round(Math.min(...value.val)),
                    pm10maxValue: Math.round(Math.max(...value.val))
                })
            }else if (key ===1){
                this.setState({
                    pm25minValue: Math.round(Math.min(...value.val)),
                    pm25maxValue: Math.round(Math.max(...value.val))
                })
            }else if (key ===2){
                this.setState({
                    nominValue: Math.round(Math.min(...value.val)*100)/100,
                    nomaxValue: Math.round(Math.max(...value.val)*100)/100
                })
            }else if (key ===3){
                this.setState({
                    so2minValue: Math.round(Math.min(...value.val)*100)/100,
                    so2maxValue: Math.round(Math.max(...value.val)*100)/100
                })
            }


        });

        this.setState({
            loadingData: false
        })
    }


    async fetchDataUserLocation(){

        let data = {};
        let min=99999;
        let max=0;

        await Axios.get('https://aqf-data.finki.ukim.mk/rest/spot/daysplus/0/daysminus/0/lat/'+this.props.match.params.latitude+'/lng/'+this.props.match.params.longitude+'/')
            .then(res => {
                data = res.data
            });

        data.map((value,key)=>{
            if (key ===0){
                this.setState({
                    pm10minValue: Math.round(Math.min(...value.val)),
                    pm10maxValue: Math.round(Math.max(...value.val))
                })
            }else if (key ===1){
                this.setState({
                    pm25minValue: Math.round(Math.min(...value.val)),
                    pm25maxValue: Math.round(Math.max(...value.val))
                })
            }else if (key ===2){
                this.setState({
                    nominValue: Math.round(Math.min(...value.val)*100)/100,
                    nomaxValue: Math.round(Math.max(...value.val)*100)/100
                })
            }else if (key ===3){
                this.setState({
                    so2minValue: Math.round(Math.min(...value.val)*100)/100,
                    so2maxValue: Math.round(Math.max(...value.val)*100)/100
                })
            }


        });

        this.setState({
            loadingData: false
        })
    }

    componentWillMount=()=>{
        if (!this.state.locationMode){
            this.fetchData(source[this.props.match.params.municipalityID].lat, source[this.props.match.params.municipalityID].lng);
        }else{
            this.fetchDataUserLocation();
        }


    }


    render() {
        let todayDate = moment().format('DD.MM.YYYY');
        console.log(this.props.match.params.municipalityID);


        return(

            <div className="dailyContainerToday">

                <div className="innerContainerToday">

                    <div className="firstRowToday">
                        <p className="municipalityNameToday">{this.state.municipalityNameToday}</p>
                        <p className="dateToday">{todayDate}</p>
                    </div>

                    <div className="secondRowToday">

                        <div className="minmaxDivToday">

                            <div className="minDivToday">
                                <div className="minUpperToday">
                                    <p>Min</p>
                                </div>

                                <div className="minLowerToday">
                                    <p className="minValueToday">{this.state.pm25minValue}</p>
                                </div>
                            </div>

                            <div className="maxDivToday">
                                <div className="maxUpperToday">
                                    <p>Max</p>
                                </div>
                                <div className="maxLowerToday">
                                    <p className="maxValueToday">{this.state.pm25maxValue}</p>
                                </div>
                            </div>

                        </div>

                        <div className="pollTypeAndUnitDivToday">

                            <div className="pollTypeDivToday">
                                <p className="pollTypeToday">PM<sub>2.5</sub></p>
                            </div>
                            <div className="pollUnitDivToday">
                                <p className="unitToday">??g/m<sup>3</sup></p>
                            </div>

                        </div>


                    </div>

                    <div className="secondRowToday">

                        <div className="minmaxDivToday">

                            <div className="minDivToday">
                                <div className="minUpperToday">
                                    <p>Min</p>
                                </div>

                                <div className="minLowerToday">
                                    <p className="minValueToday">{this.state.pm10minValue}</p>
                                </div>
                            </div>

                            <div className="maxDivToday">
                                <div className="maxUpperToday">
                                    <p>Max</p>
                                </div>
                                <div className="maxLowerToday">
                                    <p className="maxValueToday">{this.state.pm10maxValue}</p>
                                </div>
                            </div>

                        </div>

                        <div className="pollTypeAndUnitDivToday">

                            <div className="pollTypeDivToday">
                                <p className="pollTypeToday">PM<sub>10</sub></p>
                            </div>
                            <div className="pollUnitDivToday">
                                <p className="unitToday">??g/m<sup>3</sup></p>
                            </div>

                        </div>


                    </div>

                    <div className="secondRowToday">

                        <div className="minmaxDivToday">

                            <div className="minDivToday">
                                <div className="minUpperToday">
                                    <p>Min</p>
                                </div>

                                <div className="minLowerToday">
                                    <p className="minValueToday">{this.state.nominValue}</p>
                                </div>
                            </div>

                            <div className="maxDivToday">
                                <div className="maxUpperToday">
                                    <p>Max</p>
                                </div>
                                <div className="maxLowerToday">
                                    <p className="maxValueToday">{this.state.nomaxValue}</p>
                                </div>
                            </div>

                        </div>

                        <div className="pollTypeAndUnitDivToday">

                            <div className="pollTypeDivToday">
                                <p className="pollTypeToday">NO</p>
                            </div>
                            <div className="pollUnitDivToday">
                                <p className="unitToday">??g/m<sup>3</sup></p>
                            </div>

                        </div>


                    </div>

                    <div className="secondRowToday">

                        <div className="minmaxDivToday">

                            <div className="minDivToday">
                                <div className="minUpperToday">
                                    <p>Min</p>
                                </div>

                                <div className="minLowerToday">
                                    <p className="minValueToday">{this.state.so2minValue}</p>
                                </div>
                            </div>

                            <div className="maxDivToday">
                                <div className="maxUpperToday">
                                    <p>Max</p>
                                </div>
                                <div className="maxLowerToday">
                                    <p className="maxValueToday">{this.state.so2maxValue}</p>
                                </div>
                            </div>

                        </div>

                        <div className="pollTypeAndUnitDivToday">

                            <div className="pollTypeDivToday">
                                <p className="pollTypeToday">SO<sub>2</sub></p>
                            </div>
                            <div className="pollUnitDivToday">
                                <p className="unitToday">??g/m<sup>3</sup></p>
                            </div>

                        </div>


                    </div>

                </div>


            </div>
        );
    }
}


const source =[
    {
        title: "???????????? ????????????????"
    },
    {
        title: "????????????????",
        lat: 41.985796,
        lng: 21.466245,

    },
    {
        title: "???????????? ????????",
        lat: 41.979424,
        lng: 21.442537,

    },
    {
        title: "???????? ????????????",
        lat: 41.984446,
        lng: 21.477134,

    },
    {
        title: "????????????",
        lat: 41.996017,
        lng: 21.431912,

    },
    {
        title: "????????????",
        lat: 42.001638,
        lng: 21.397008,

    },
    {
        title: "?????????? ????????????",
        lat: 42.006905,
        lng: 21.352042,

    },
    {
        title: "??????????",
        lat: 41.995137,
        lng: 21.248611,

    },
    {
        title: "????????",
        lat: 42.013391,
        lng: 21.444487,

    },
    {
        title: "??????????",
        lat: 42.031024,
        lng: 21.446324,

    },
    {
        title: "????????????????",
        lat: 42.061486,
        lng: 21.451677,

    },
    {
        title: "???????? ??????????????",
        lat: 42.039261,
        lng: 21.425303,

    },
    {
        title: "??????????????",
        lat: 41.939068,
        lng: 21.520799,

    },
    {
        title: "??????????????????",
        lat: 42.025041,
        lng: 21.563963,

    },
    {
        title: "??????????????",
        lat: 41.995601,
        lng: 21.571903,

    },
    {
        title: "???????? ????????",
        lat: 42.012448,
        lng: 21.459916,

    },
    {
        title: "????????????",
        lat: 41.029491,
        lng: 21.332481,

    },
    {
        title: "????????????",
        lat: 41.705759,
        lng: 22.854574,

    },
    {
        title: "??????????",
        lat: 41.522532,
        lng: 20.525827,

    },
    {
        title: "??????????????",
        lat: 41.967415,
        lng: 22.773498,

    },
    {
        title: "?????????? ??????????",
        lat: 41.220608,
        lng: 21.202996,

    },
    {
        title: "?????????? ????????????",
        lat: 41.220608,
        lng: 22.243365,

    },
    {
        title: "??????????????????",
        lat: 41.142886,
        lng: 22.501711,

    },
    {
        title: "????????????????",
        lat: 41.796328,
        lng: 20.913000,

    },
    {
        title: "??????????????????",
        lat: 41.433324,
        lng: 22.012609,

    },
    {
        title: "????????????",
        lat: 41.514182,
        lng: 20.958642,

    },
    {
        title: "????????????",
        lat: 41.918202,
        lng: 22.411659,

    },
    {
        title: "??????????????",
        lat: 42.079900,
        lng: 22.177386,

    },
    {
        title: "?????????? ??????????????",
        lat: 42.203240,
        lng: 22.333654,

    },
    {
        title: "??????????????",
        lat: 41.369997,
        lng: 21.248814,

    },
    {
        title: "????????????????",
        lat: 42.134702,
        lng: 21.718708,

    },
    {
        title: "???????????????????? ????????????????",
        lat: 42.021026,
        lng: 22.588042,

    },
    {
        title: "???????????????????? ????????",
        lat: 41.512355,
        lng: 21.216477,

    },
    {
        title: "????????????????",
        lat: 41.483190,
        lng: 22.091830,

    },
    {
        title: "??????????",
        lat: 41.112971,
        lng: 20.800376,

    },
    {
        title: "??????????????",
        lat: 41.762523,
        lng: 22.887566,

    },
    {
        title: "????????????",
        lat: 41.346074,
        lng: 21.553592,

    },
    {
        title: "??????????????????",
        lat: 41.996689,
        lng: 22.184791,

    },
    {
        title: "??????????",
        lat: 41.089628,
        lng: 21.013337,

    },
    {
        title: "????????",
        lat: 41.741851,
        lng: 22.199179,

    },
    {
        title: "????????????",
        lat: 41.177781,
        lng: 20.678494,

    },
    {
        title: "????????????????",
        lat: 41.437600,
        lng: 22.642890,

    },
    {
        title: "?????????? ????????????",
        lat: 41.865170,
        lng: 21.940711,

    },
    {
        title: "????????????",
        lat: 42.007929,
        lng: 20.969445,

    },
    {
        title: "??????????????????",
        lat: 41.317625,
        lng: 22.560747,

    },
    {
        title: "??????????",
        lat: 41.715320,
        lng: 21.771945,

    },
    {
        title: "??????????????",
        lat: 41.240787,
        lng: 20.591865,

    },
    {
        title: "????????????",
        lat: 41.882423,
        lng: 22.508594,

    },
    {
        title: "????????????",
        lat: 41.218407,
        lng: 22.704459,

    },
    {
        title: "????????????????",
        lat: 41.203609,
        lng: 22.576217,

    }

];