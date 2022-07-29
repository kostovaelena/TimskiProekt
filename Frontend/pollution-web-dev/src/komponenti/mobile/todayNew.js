import React, { Component } from 'react';
import "./todayNew.css";
import moment from 'moment';
import Axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import {green} from "@material-ui/core/colors";


export default class TodayNew extends React.Component {

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
            locationMode:(this.props.match.params.municipalityID ==0) ? true : false,


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
                this.getPM25Color(this.state.pm25minValue,this.state.pm25maxValue)
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

    componentDidMount=()=>{
        if (!this.state.locationMode){
            this.fetchData(source[this.props.match.params.municipalityID].lat, source[this.props.match.params.municipalityID].lng);
        }else{
            this.fetchDataUserLocation();
        }

    };



    getPM25Color=(val)=>{

        if (val<12.1) {
                return '#2A7821'
        } else if (val<35.5) {
                return '#e8e801'
        } else if (val<55.5) {
                return 'orange'
        } else if (val<150.5) {
                return 'red'
        } else if (val<250.5) {
                return 'blueviolet'
        } else{
            return 'brown'
        }
    };

    getPM10Color=(val)=>{

        if (val<54) {
                return '#2A7821'
        } else if (val<154) {
                return '#e8e801'
        } else if (val<254) {
                return 'orange'
        } else if (val<354) {
                return 'red'
        } else if (val<500) {
                return 'blueviolet'
        } else{
                return 'brown'
        }
    };

    getNOColor=(val)=>{

        if (val<0.04) {
                return '#2A7821'
        } else if (val<0.08) {
                return '#e8e801'
        } else if (val<0.18) {
                return 'orange'
        } else if (val<0.28) {
                return 'red'
        } else if (val<0.4) {
                return 'blueviolet'
        } else{
                return 'brown'
        }
    };

    getSO2Color=(val)=>{

        if (val<0.04) {
                return '#2A7821'
        } else if (val<0.08) {
                return '#e8e801'
        } else if (val<0.38) {
                return 'orange'
        } else if (val<0.8) {
                return 'red'
        } else if (val<1.6) {
                return 'blueviolet'
        } else{
                return 'brown'
        }
    };



    render() {
        let todayDate = moment().format('DD.MM.YYYY');


        return(
            <>
            {this.state.loadingData && <CircularProgress className="todayNewLoadCircle" />}

            {!this.state.loadingData && <div className="dailyContainerTodayNew">

                <div className="innerContainerTodayNew">

                    <div className="firstRowTodayNew">
                        <p className="municipalityNameTodayNew">{this.state.municipalityNameToday}</p>
                        <p className="dateTodayNew">{todayDate}</p>
                    </div>


                {/*pm2.5*/}
                    <div className="secondRowTodayNew">
                        <div className="minmaxUpperNew">
                            <p>PM<sub>2.5</sub></p>
                        </div>

                        <div className="minmaxLowerNew">
                            <div className="minDivTodayNew">
                                <p className="minValueTodayNew" style={{color:this.getPM25Color(this.state.pm25minValue)}} >{this.state.pm25minValue}</p>
                            </div>

                            <div className="minmaxBarDivTodayNew">
                                <div className="minmaxBarTodayNew" style={{background: "-webkit-gradient(linear, left top, right top, from("+this.getPM25Color(this.state.pm25minValue)+"), to("+this.getPM25Color(this.state.pm25maxValue)+"))"}}>
                                    <p className="textMiddleTodayNewMin">min</p>
                                    <p className="textMiddleTodayNewMax">max</p>
                                </div>
                            </div>

                            <div className="maxDivTodayNew">
                                <p className="maxValueTodayNew" style={{color:this.getPM25Color(this.state.pm25maxValue)}} >{this.state.pm25maxValue}</p>
                            </div>
                        </div>
                    </div>

                    {/*PM10*/}
                    <div className="secondRowTodayNew">
                        <div className="minmaxUpperNew">
                            <p>PM<sub>10</sub></p>
                        </div>

                        <div className="minmaxLowerNew">
                            <div className="minDivTodayNew">
                                <p className="minValueTodayNew" style={{color:this.getPM10Color(this.state.pm10minValue)}} >{this.state.pm10minValue}</p>
                            </div>

                            <div className="minmaxBarDivTodayNew">
                                <div className="minmaxBarTodayNew" style={{background: "-webkit-gradient(linear, left top, right top, from("+this.getPM10Color(this.state.pm10minValue)+"), to("+this.getPM10Color(this.state.pm10maxValue)+"))"}}>
                                    <p className="textMiddleTodayNewMin">min</p>
                                    <p className="textMiddleTodayNewMax">max</p>
                                </div>
                            </div>

                            <div className="maxDivTodayNew">
                                <p className="maxValueTodayNew" style={{color:this.getPM10Color(this.state.pm10maxValue)}} >{this.state.pm10maxValue}</p>
                            </div>
                        </div>
                    </div>

                {/*NO*/}
                    <div className="secondRowTodayNew">
                        <div className="minmaxUpperNew">
                            <p>NO</p>
                        </div>

                        <div className="minmaxLowerNew">
                            <div className="minDivTodayNew">
                                <p className="minValueTodayNew" style={{color:this.getNOColor(this.state.nominValue)}} >{this.state.nominValue}</p>
                            </div>

                            <div className="minmaxBarDivTodayNew">
                                <div className="minmaxBarTodayNew" style={{background: "-webkit-gradient(linear, left top, right top, from("+this.getNOColor(this.state.nominValue)+"), to("+this.getNOColor(this.state.nomaxValue)+"))"}}>
                                    <p className="textMiddleTodayNewMin">min</p>
                                    <p className="textMiddleTodayNewMax">max</p>
                                </div>
                            </div>

                            <div className="maxDivTodayNew">
                                <p className="maxValueTodayNew" style={{color:this.getNOColor(this.state.nomaxValue)}} >{this.state.nomaxValue}</p>
                            </div>
                        </div>
                    </div>

                  {/*SO2   */}
                    <div className="secondRowTodayNew">
                        <div className="minmaxUpperNew">
                            <p>SO<sub>2</sub></p>
                        </div>

                        <div className="minmaxLowerNew">
                            <div className="minDivTodayNew">
                                <p className="minValueTodayNew" style={{color:this.getSO2Color(this.state.so2minValue)}} >{this.state.so2minValue}</p>
                            </div>

                            <div className="minmaxBarDivTodayNew">
                                <div className="minmaxBarTodayNew" style={{background: "-webkit-gradient(linear, left top, right top, from("+this.getSO2Color(this.state.so2minValue)+"), to("+this.getSO2Color(this.state.so2maxValue)+"))"}}>
                                    <p className="textMiddleTodayNewMin">min</p>
                                    <p className="textMiddleTodayNewMax">max</p>
                                </div>
                            </div>

                            <div className="maxDivTodayNew">
                                <p className="maxValueTodayNew" style={{color:this.getSO2Color(this.state.so2maxValue)}} >{this.state.so2maxValue}</p>
                            </div>
                        </div>
                    </div>


                </div>


            </div>}
    </>
        );
    }
}


const source =[
    {
        title: "Вашата локација"
    },
    {
        title: "Аеродром",
        lat: 41.985796,
        lng: 21.466245,

    },
    {
        title: "Кисела Вода",
        lat: 41.984390,
        lng: 21.476563,

    },
    {
        title: "Ново Лисиче",
        lat: 41.984390,
        lng: 21.476563,

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