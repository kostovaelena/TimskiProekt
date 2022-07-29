import React, { Component } from 'react';
import "./daily4days.css";
import moment from 'moment';
import Axios from "axios";

export default class Daily4days extends React.Component {

    constructor(props){
        super(props);
        this.state={
            loadingData:true,
            pollutantID:this.props.match.params.pollutantID,
            todayminVal:'',
            todaymaxVal:'',
            day1minVal:'',
            day1maxVal:'',
            day2minVal:'',
            day2maxVal:'',
            day3minVal:'',
            day3maxVal:'',
            locationMode:(this.props.match.params.municipalityID ==0) ? true : false
        }
    }

    async fetchData(lat,lng){

        let data = {};
        let todaymin=99999;
        let day1min=99999;
        let day2min=99999;
        let day3min=99999;
        let todaymax=0;
        let day1max=0;
        let day2max=0;
        let day3max=0;


        let max=0;

        await Axios.get('https://aqf-data.finki.ukim.mk/rest/predictions/pollutant/' + this.state.pollutantID + '/daysplus/3/daysminus/0/location/lat/' + lat + '/lng/' + lng+'/')
            .then(res => {
                data = res.data
            });

        for (let i=0;i<data.length;i++){
            if (i<24){
                if (data[i].val<todaymin){
                    todaymin=data[i].val
                }

                if (data[i].val>todaymax){
                    todaymax=data[i].val
                }
            }else if (i>23 && i<48){
                if (data[i].val<day1min){
                    day1min=data[i].val
                }

                if (data[i].val>day1max){
                    day1max=data[i].val
                }
            }else if(i>47 && i<72){
                if (data[i].val<day2min){
                    day2min=data[i].val
                }

                if (data[i].val>day2max){
                    day2max=data[i].val
                }
            }else if(i>71 && i<96){
                if (data[i].val<day3min){
                    day3min=data[i].val
                }

                if (data[i].val>day3max){
                    day3max=data[i].val
                }
            }

        }

        if (this.state.pollutantID ==1 || this.state.pollutantID ==2 ){
            this.setState({
                todayminVal: Math.round(todaymin),
                todaymaxVal: Math.round(todaymax),
                day1minVal: Math.round(day1min),
                day1maxVal: Math.round(day1max),
                day2minVal: Math.round(day2min),
                day2maxVal: Math.round(day2max),
                day3minVal: Math.round(day3min),
                day3maxVal: Math.round(day3max),
            })
        }else if (this.state.pollutantID ==3 || this.state.pollutantID ==4){
            this.setState({
                todayminVal: Math.round(todaymin*100)/100,
                todaymaxVal: Math.round(todaymax*100)/100,
                day1minVal: Math.round(day1min*100)/100,
                day1maxVal: Math.round(day1max*100)/100,
                day2minVal: Math.round(day2min*100)/100,
                day2maxVal: Math.round(day2max*100)/100,
                day3minVal: Math.round(day3min*100)/100,
                day3maxVal: Math.round(day3max*100)/100,
            })
        }

        this.setState({
            loadingData: false,
            pm25Visible: this.props.match.params.pollutantID ==='2' ? true : false,
            pm10Visible: this.props.match.params.pollutantID ==='1' ? true : false,
            noVisible: this.props.match.params.pollutantID ==='3' ? true : false,
            so2Visible: this.props.match.params.pollutantID ==='4' ? true : false,

        })


    }

    async fetchDataUserLocation(){

        let data = {};
        let todaymin=9999;
        let day1min=9999;
        let day2min=9999;
        let day3min=9999;
        let todaymax=0;
        let day1max=0;
        let day2max=0;
        let day3max=0;


        await Axios.get('https://aqf-data.finki.ukim.mk/rest/predictions/pollutant/' + this.state.pollutantID + '/daysplus/3/daysminus/0/location/lat/' + this.props.match.params.latitude + '/lng/' + this.props.match.params.longitude+'/')
            .then(res => {
                data = res.data
            });

        for (let i=0;i<data.length;i++){
            if (i<24){
                if (data[i].val<todaymin){
                    todaymin=data[i].val
                }

                if (data[i].val>todaymax){
                    todaymax=data[i].val
                }
            }else if (i>23 && i<48){
                if (data[i].val<day1min){
                    day1min=data[i].val
                }

                if (data[i].val>day1max){
                    day1max=data[i].val
                }
            }else if(i>47 && i<72){
                if (data[i].val<day2min){
                    day2min=data[i].val
                }

                if (data[i].val>day2max){
                    day2max=data[i].val
                }
            }else if(i>71 && i<96){
                if (data[i].val<day3min){
                    day3min=data[i].val
                }

                if (data[i].val>day3max){
                    day3max=data[i].val
                }
            }

        }

        if (this.state.pollutantID ==1 || this.state.pollutantID ==2 ){
            this.setState({
                todayminVal: Math.round(todaymin),
                todaymaxVal: Math.round(todaymax),
                day1minVal: Math.round(day1min),
                day1maxVal: Math.round(day1max),
                day2minVal: Math.round(day2min),
                day2maxVal: Math.round(day2max),
                day3minVal: Math.round(day3min),
                day3maxVal: Math.round(day3max),
            })
        }else if (this.state.pollutantID ==3 || this.state.pollutantID ==4){
            this.setState({
                todayminVal: Math.round(todaymin*100)/100,
                todaymaxVal: Math.round(todaymax*100)/100,
                day1minVal: Math.round(day1min*100)/100,
                day1maxVal: Math.round(day1max*100)/100,
                day2minVal: Math.round(day2min*100)/100,
                day2maxVal: Math.round(day2max*100)/100,
                day3minVal: Math.round(day3min*100)/100,
                day3maxVal: Math.round(day3max*100)/100,
            })
        }

        this.setState({
            loadingData: false,
            pm25Visible: this.props.match.params.pollutantID ==='2' ? true : false,
            pm10Visible: this.props.match.params.pollutantID ==='1' ? true : false,
            noVisible: this.props.match.params.pollutantID ==='3' ? true : false,
            so2Visible: this.props.match.params.pollutantID ==='4' ? true : false,

        })


    }


    componentWillMount=()=>{
        if(!this.state.locationMode){
            this.fetchData(source[this.props.match.params.municipalityID].lat,source[this.props.match.params.municipalityID].lng);
        }else{
            this.fetchDataUserLocation();
        }
    }


    render() {
        let todayDate = moment().format('DD.MM.YYYY');
        let tomorrow = moment().add(1,'days').format('DD.MM.YYYY');
        let tomorrowPlus1 = moment().add(2,'days').format('DD.MM.YYYY');
        let tomorrowPlus2 = moment().add(3,'days').format('DD.MM.YYYY');


        return(

            <div className="dailyContainerToday4days">

                <div className="innerContainerToday4days">

                    <div className="firstRowToday4days">
                        <p className="municipalityNameToday4days">{source[this.props.match.params.municipalityID].title}</p>
                        { this.state.pm25Visible && <p className="dateToday4days">PM<sub>2.5</sub> µg/m<sup>3</sup></p>}
                        { this.state.pm10Visible && <p className="dateToday4days">PM<sub>10</sub> µg/m<sup>3</sup></p>}
                        { this.state.noVisible && <p className="dateToday4days">NO µg/m<sup>3</sup></p>}
                        { this.state.so2Visible && <p className="dateToday4days">SO<sub>2</sub> µg/m<sup>3</sup></p>}
                    </div>

                    <div className="secondRowToday4days">

                        <div className="minmaxDivToday4days">

                            <div className="minDivToday4days">
                                <div className="minUpperToday4days">
                                    <p>Min</p>
                                </div>

                                <div className="minLowerToday4days">
                                    <p className="minValueToday4days">{this.state.todayminVal}</p>
                                </div>
                            </div>

                            <div className="maxDivToday4days">
                                <div className="maxUpperToday4days">
                                    <p>Max</p>
                                </div>
                                <div className="maxLowerToday4days">
                                    <p className="maxValueToday4days">{this.state.todaymaxVal}</p>
                                </div>
                            </div>

                        </div>

                        <div className="pollTypeAndUnitDivToday4days">

                            <div className="pollTypeDivToday4days">
                                <p className="pollTypeToday4days">{todayDate}</p>
                            </div>
                            <div className="pollUnitDivToday4days">
                                {/*<p className="unitToday">µg/m<sup>3</sup></p>*/}
                            </div>

                        </div>


                    </div>

                    <div className="secondRowToday4days">

                        <div className="minmaxDivToday4days">

                            <div className="minDivToday4days">
                                <div className="minUpperToday4days">
                                    <p>Min</p>
                                </div>

                                <div className="minLowerToday4days">
                                    <p className="minValueToday4days">{this.state.day1minVal}</p>
                                </div>
                            </div>

                            <div className="maxDivToday4days">
                                <div className="maxUpperToday4days">
                                    <p>Max</p>
                                </div>
                                <div className="maxLowerToday4days">
                                    <p className="maxValueToday4days">{this.state.day1maxVal}</p>
                                </div>
                            </div>

                        </div>

                        <div className="pollTypeAndUnitDivToday4days">

                            <div className="pollTypeDivToday4days">
                                <p className="pollTypeToday4days">{tomorrow}</p>
                            </div>
                            <div className="pollUnitDivToday4days">
                                {/*<p className="unitToday">µg/m<sup>3</sup></p>*/}
                            </div>

                        </div>


                    </div>

                    <div className="secondRowToday4days">

                        <div className="minmaxDivToday4days">

                            <div className="minDivToday4days">
                                <div className="minUpperToday4days">
                                    <p>Min</p>
                                </div>

                                <div className="minLowerToday4days">
                                    <p className="minValueToday4days">{this.state.day2minVal}</p>
                                </div>
                            </div>

                            <div className="maxDivToday4days">
                                <div className="maxUpperToday4days">
                                    <p>Max</p>
                                </div>
                                <div className="maxLowerToday4days">
                                    <p className="maxValueToday4days">{this.state.day2maxVal}</p>
                                </div>
                            </div>

                        </div>

                        <div className="pollTypeAndUnitDivToday4days">

                            <div className="pollTypeDivToday4days">
                                <p className="pollTypeToday4days">{tomorrowPlus1}</p>
                            </div>
                            <div className="pollUnitDivToday4days">
                                {/*<p className="unitToday">µg/m<sup>3</sup></p>*/}
                            </div>

                        </div>


                    </div>

                    <div className="secondRowToday4days">

                        <div className="minmaxDivToday4days">

                            <div className="minDivToday4days">
                                <div className="minUpperToday4days">
                                    <p>Min</p>
                                </div>

                                <div className="minLowerToday4days">
                                    <p className="minValueToday4days">{this.state.day3minVal}</p>
                                </div>
                            </div>

                            <div className="maxDivToday4days">
                                <div className="maxUpperToday4days">
                                    <p>Max</p>
                                </div>
                                <div className="maxLowerToday4days">
                                    <p className="maxValueToday4days">{this.state.day3maxVal}</p>
                                </div>
                            </div>

                        </div>

                        <div className="pollTypeAndUnitDivToday4days">

                            <div className="pollTypeDivToday4days">
                                <p className="pollTypeToday4days">{tomorrowPlus2}</p>
                            </div>
                            <div className="pollUnitDivToday4days">
                                {/*<p className="unitToday">µg/m<sup>3</sup></p>*/}
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
        title: "Аеродром",
        lat: 41.985796,
        lng: 21.466245,

    },
    {
        title: "Кисела Вода",
        lat: 41.979424,
        lng: 21.442537,

    },
    {
        title: "Ново Лисиче",
        lat: 41.984446,
        lng: 21.477134,

    },
    {
        title: "Центар",
        lat: 41.996017,
        lng: 21.431912,

    },
    {
        title: "Карпош",
        lat: 42.001638,
        lng: 21.397008,

    },
    {
        title: "Ѓорче Петров",
        lat: 42.006905,
        lng: 21.352042,

    },
    {
        title: "Сарај",
        lat: 41.995137,
        lng: 21.248611,

    },
    {
        title: "Чаир",
        lat: 42.013391,
        lng: 21.444487,

    },
    {
        title: "Бутел",
        lat: 42.031024,
        lng: 21.446324,

    },
    {
        title: "Радишани",
        lat: 42.061486,
        lng: 21.451677,

    },
    {
        title: "Шуто Оризари",
        lat: 42.039261,
        lng: 21.425303,

    },
    {
        title: "Драчево",
        lat: 41.939068,
        lng: 21.520799,

    },
    {
        title: "Арачиново",
        lat: 42.025041,
        lng: 21.563963,

    },
    {
        title: "Илинден",
        lat: 41.995601,
        lng: 21.571903,

    },
    {
        title: "Гази Баба",
        lat: 42.012448,
        lng: 21.459916,

    },
    {
        title: "Битола",
        lat: 41.029491,
        lng: 21.332481,

    },
    {
        title: "Берово",
        lat: 41.705759,
        lng: 22.854574,

    },
    {
        title: "Дебар",
        lat: 41.522532,
        lng: 20.525827,

    },
    {
        title: "Делчево",
        lat: 41.967415,
        lng: 22.773498,

    },
    {
        title: "Демир Хисар",
        lat: 41.220608,
        lng: 21.202996,

    },
    {
        title: "Демир Капија",
        lat: 41.220608,
        lng: 22.243365,

    },
    {
        title: "Гевгелија",
        lat: 41.142886,
        lng: 22.501711,

    },
    {
        title: "Гостивар",
        lat: 41.796328,
        lng: 20.913000,

    },
    {
        title: "Кавадарци",
        lat: 41.433324,
        lng: 22.012609,

    },
    {
        title: "Кичево",
        lat: 41.514182,
        lng: 20.958642,

    },
    {
        title: "Кочани",
        lat: 41.918202,
        lng: 22.411659,

    },
    {
        title: "Кратово",
        lat: 42.079900,
        lng: 22.177386,

    },
    {
        title: "Крива Паланка",
        lat: 42.203240,
        lng: 22.333654,

    },
    {
        title: "Крушево",
        lat: 41.369997,
        lng: 21.248814,

    },
    {
        title: "Куманово",
        lat: 42.134702,
        lng: 21.718708,

    },
    {
        title: "Македонска Каменица",
        lat: 42.021026,
        lng: 22.588042,

    },
    {
        title: "Македонски Брод",
        lat: 41.512355,
        lng: 21.216477,

    },
    {
        title: "Неготино",
        lat: 41.483190,
        lng: 22.091830,

    },
    {
        title: "Охрид",
        lat: 41.112971,
        lng: 20.800376,

    },
    {
        title: "Пехчево",
        lat: 41.762523,
        lng: 22.887566,

    },
    {
        title: "Прилеп",
        lat: 41.346074,
        lng: 21.553592,

    },
    {
        title: "Пробиштип",
        lat: 41.996689,
        lng: 22.184791,

    },
    {
        title: "Ресен",
        lat: 41.089628,
        lng: 21.013337,

    },
    {
        title: "Штип",
        lat: 41.741851,
        lng: 22.199179,

    },
    {
        title: "Струга",
        lat: 41.177781,
        lng: 20.678494,

    },
    {
        title: "Струмица",
        lat: 41.437600,
        lng: 22.642890,

    },
    {
        title: "Свети Николе",
        lat: 41.865170,
        lng: 21.940711,

    },
    {
        title: "Тетово",
        lat: 42.007929,
        lng: 20.969445,

    },
    {
        title: "Валандово",
        lat: 41.317625,
        lng: 22.560747,

    },
    {
        title: "Велес",
        lat: 41.715320,
        lng: 21.771945,

    },
    {
        title: "Вевчани",
        lat: 41.240787,
        lng: 20.591865,

    },
    {
        title: "Виница",
        lat: 41.882423,
        lng: 22.508594,

    },
    {
        title: "Дојран",
        lat: 41.218407,
        lng: 22.704459,

    },
    {
        title: "Богданци",
        lat: 41.203609,
        lng: 22.576217,

    }

];