import React, { Component } from 'react'
import "./hourlyStyle.css"
import 'react-circular-progressbar/dist/styles.css';
import Axios from "axios";
import HourlyTemplete from './hourlyTemplete'
import moment from 'moment';
import CircularProgress from "@material-ui/core/CircularProgress";


export default class Hourly extends React.Component {

    constructor(props){
        super(props);
        this.state={
            loadingData:true,
            day0PollObject:[],
            day1PollObject:[],
            day2PollObject:[],
            day3PollObject:[],
            firstLoad:true,
            locationMode:(this.props.match.params.municipalityID ==0) ? true : false

        }
    }

    async fetchData(lat,lng) {
        let data = {};

        await Axios.get('https://aqf-data.finki.ukim.mk/rest/spot/daysplus/3/daysminus/0/lat/' + lat + '/lng/' + lng + '/')
            .then(res => {
                data = res.data
            });
        for (let i = 0; i < 24; i++) {
            let o = []
            o.push(data[0].val[i])
            o.push(data[1].val[i])
            o.push(data[2].val[i])
            o.push(data[3].val[i])

            this.state.day0PollObject.push(o)
        }

        for (let i = 0; i < 24; i++) {
            let o = []
            o.push(data[4].val[i])
            o.push(data[5].val[i])
            o.push(data[6].val[i])
            o.push(data[7].val[i])

            this.state.day1PollObject.push(o)
        }

        for (let i = 0; i < 24; i++) {
            let o = []
            o.push(data[8].val[i])
            o.push(data[9].val[i])
            o.push(data[10].val[i])
            o.push(data[11].val[i])

            this.state.day2PollObject.push(o)
        }

        for (let i = 0; i < 24; i++) {
            let o = []
            o.push(data[12].val[i])
            o.push(data[13].val[i])
            o.push(data[14].val[i])
            o.push(data[15].val[i])

            this.state.day3PollObject.push(o)
        }

        this.setState({
            loadingData: false
        });
    }

    async fetchDataUserLocation(){
        let data = {};

        await Axios.get('https://aqf-data.finki.ukim.mk/rest/spot/daysplus/3/daysminus/0/lat/' + this.props.match.params.latitude + '/lng/' + this.props.match.params.longitude + '/')
            .then(res => {
                data = res.data
            });
        for (let i = 0; i < 24; i++) {
            let o = []
            o.push(data[0].val[i])
            o.push(data[1].val[i])
            o.push(data[2].val[i])
            o.push(data[3].val[i])

            this.state.day0PollObject.push(o)
        }

        for (let i = 0; i < 24; i++) {
            let o = []
            o.push(data[4].val[i])
            o.push(data[5].val[i])
            o.push(data[6].val[i])
            o.push(data[7].val[i])

            this.state.day1PollObject.push(o)
        }

        for (let i = 0; i < 24; i++) {
            let o = []
            o.push(data[8].val[i])
            o.push(data[9].val[i])
            o.push(data[10].val[i])
            o.push(data[11].val[i])

            this.state.day2PollObject.push(o)
        }

        for (let i = 0; i < 24; i++) {
            let o = []
            o.push(data[12].val[i])
            o.push(data[13].val[i])
            o.push(data[14].val[i])
            o.push(data[15].val[i])

            this.state.day3PollObject.push(o)
        }

        this.setState({
            loadingData: false
        });
    }


     componentWillMount=()=>{
        if(!this.state.locationMode){
            this.fetchData(source[this.props.match.params.municipalityID].lat, source[this.props.match.params.municipalityID].lng);
        }else{
            this.fetchDataUserLocation();
        }

    };


    render() {

        let today = moment().format('DD.MM.YYYY');
        let tomorrow = moment().add(1,'days').format('DD.MM.YYYY');
        let tomorrowPlus1 = moment().add(2,'days').format('DD.MM.YYYY');
        let tomorrowPlus2 = moment().add(3,'days').format('DD.MM.YYYY');

        return(
            <>
                {this.state.loadingData && <CircularProgress className="hourlyLoadCircle" />}
                {!this.state.loadingData && <div className="hourlyContainer">

                    {!this.state.loadingData && <div className="hourlyDateDiv"><p className="hourlyDateTextStyle">{today}</p></div>}
                    {!this.state.loadingData && this.state.day0PollObject.map((value, key) => {
                        return <HourlyTemplete pollValue={value} pollHour={key} municipalityName={source[this.props.match.params.municipalityID].title} date={today} />
                        })
                    }
                    {!this.state.loadingData && <div className="hourlyDateDiv"><p className="hourlyDateTextStyle">{tomorrow}</p></div>}
                    {!this.state.loadingData && this.state.day1PollObject.map((value, key) => {
                        return <HourlyTemplete pollValue={value} pollHour={key} municipalityName={source[this.props.match.params.municipalityID].title} date={tomorrow} />
                        })
                    }
                    {!this.state.loadingData && <div className="hourlyDateDiv"><p className="hourlyDateTextStyle">{tomorrowPlus1}</p></div>}
                    {!this.state.loadingData && this.state.day2PollObject.map((value, key) => {
                        return <HourlyTemplete pollValue={value} pollHour={key} municipalityName={source[this.props.match.params.municipalityID].title} date={tomorrowPlus1} />
                    })
                    }
                    {!this.state.loadingData && <div className="hourlyDateDiv"><p className="hourlyDateTextStyle">{tomorrowPlus2}</p></div>}
                    {!this.state.loadingData && this.state.day3PollObject.map((value, key) => {
                        return <HourlyTemplete pollValue={value} pollHour={key} municipalityName={source[this.props.match.params.municipalityID].title} date={tomorrowPlus2} />
                    })
                    }

            </div>}
            </>
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
        lat: 41.984390,
        lng: 21.476563,

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