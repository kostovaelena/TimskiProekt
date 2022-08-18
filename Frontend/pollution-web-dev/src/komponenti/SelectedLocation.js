import React from 'react'
import Axios from 'axios';
import './SelectedLocation.css'
import {Spinner} from 'react-bootstrap'
import ErrDiv from './errorMsg'


export default class SelectedLocation extends React.Component {

    constructor(props){
        super(props)
        let hours = [...Array(24).keys(), ...Array(24).keys(), ...Array(24).keys(), ...Array(24).keys()]
        let date = new Date()
        let weekday = ["Недела", "Понеделник", "Вторник", "Среда", "Четврток", "Петок", "Сабота"];
        let fullDate = weekday[date.getDay()] + " " +date.getDate()
        let days = []
        days.push(fullDate)
        for(let i = 1; i <= 3; i++){
            date.setDate(date.getDate() + 1)
            days.push(weekday[date.getDay()] + " " +date.getDate())
        }
        this.state = {
            days: days,
            data: {},
            hours: hours,
            loadingData: true,
            currHour: this.props.hour,
            errMSGVisible:false,
            errorText:""
        };

        this.fetchData = this.fetchData.bind(this)
    }

    componentDidMount(){
        this.fetchData();
        // this.scrollValues();

    }

    async fetchData(){
        let data = {}
        await Axios.get('https://aqf-data.finki.ukim.mk/rest/spot/daysplus/3/daysminus/0/lat/' + this.props.location.latitude.toFixed(4) + '/lng/' + this.props.location.longitude.toFixed(4) + '/')
        .then(res => {
            data = res.data
        });

        if (data.length===0){

            this.props.openErrDivDetails()
        }

        this.setState({ data : data, loadingData: false})
    }




    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.location.latitude !== prevProps.location.latitude || this.props.location.longitude !== prevProps.location.longitude){
            this.setState({loadingData: true});
            this.fetchData();
        }

    }
    getPM25Color=(val)=>{

        if (val<12.1) {
            return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(32,255,23,1) 70%)';
        } else if (val<35.5) {
            return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,248,23,1) 70%)';
        } else if (val<55.5) {
            return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,165,0,1) 70%)';
        } else if (val<150.5) {
            return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,34,23,1) 70%)';
        } else if (val<250.5) {
            return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,14,100,1) 70%)';
        } else{
            return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(218,78,18,1) 70%)'
        }
    };

    getPM10Color=(val)=>{

        if (val<54) {
            return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(32,255,23,1) 70%)';
        } else if (val<154) {
            return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,248,23,1) 70%)';
        } else if (val<254) {
            return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,165,0,1) 70%)';
        } else if (val<354) {
            return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,34,23,1) 70%)';
        } else if (val<500) {
            return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,14,100,1) 70%)';
        } else{
            return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(218,78,18,1) 70%)'
        }
    };

    getNOColor=(val)=>{

        if (val<0.04) {
            return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(32,255,23,1) 70%)';
        } else if (val<0.08) {
            return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,248,23,1) 70%)';
        } else if (val<0.18) {
            return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,165,0,1) 70%)';
        } else if (val<0.28) {
            return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,34,23,1) 70%)';
        } else if (val<0.4) {
            return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,14,100,1) 70%)';
        } else{
            return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(218,78,18,1) 70%)'
        }
    };

    getSO2Color=(val)=>{

        if (val<0.04) {
            return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(32,255,23,1) 70%)';
        } else if (val<0.08) {
            return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,248,23,1) 70%)';
        } else if (val<0.38) {
            return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,165,0,1) 70%)';
        } else if (val<0.8) {
            return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,34,23,1) 70%)';
        } else if (val<1.6) {
            return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,14,100,1) 70%)';
        } else{
            return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(218,78,18,1) 70%)'
        }
    };

    getTHDRColor=(val)=>{ // tuka treba da se proverat vrednostite uste ednas
      if (val<1) {
          return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(32,255,23,1) 70%)';
      } else if (val<2) {
          return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,248,23,1) 70%)';
      } else if (val<3) {
          return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,165,0,1) 70%)';
      } else if (val<4) {
          return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,34,23,1) 70%)';
      } else if (val<5) {
          return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,14,100,1) 70%)';
      } else{
          return 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(218,78,18,1) 70%)'
      }
    };

    renderHours(){
        let res = []
        let hours = this.state.hours
        for(let i = 0; i < hours.length; i++){
            if(hours[i] === 23){
                res.push(<td className="hours-end" key={i}>{hours[i]}</td>)
            }
            else res.push(<td  className="hours" key={i}>{hours[i]}</td>)
        }
        return res
    }

    renderItems(pollutant){
        let values = []
        if(pollutant === 0){
            for(let i = 1; i <= 96; i++){
                let val = Math.floor(Math.random() * 90) + 20;
                values.push(<td width={30} className="pm25" key={i}><img src={"https://www.airvisual.com/assets/aqi/ic-face-green.svg"}
                 alt="" style={{backgroundColor: "lightgreen", width: "30px", height: "30px", borderRadius: 15}}/></td>)
            }
        }
        else{

            let data = this.state.data;
            let tdID = 0;
            let scrollElement = document.getElementById('scroll-table');

            for(let i = pollutant - 1; i < data.length; i+=4){
                let pollutantValues = data[i].val
                for(let j = 0; j < pollutantValues.length; j++, tdID++){
                    if(pollutant === 1){
                        if(j === 23) values.push(<td className="pollutant-td" style={{background: this.getPM10Color(pollutantValues[j])}}  key={tdID}>{Math.floor(pollutantValues[j])}</td>)
                        else values.push(<td width={30} className="pollutant-td" style={{background: this.getPM10Color(pollutantValues[j])}}  key={tdID}>{Math.floor(pollutantValues[j])}</td>)
                    }
                    else if(pollutant === 2){
                        if(j === 23) values.push(<td className="pollutant-td" style={{background: this.getPM25Color(pollutantValues[j])}}  key={tdID}>{Math.floor(pollutantValues[j])}</td>)
                        else values.push(<td width={30} className="pollutant-td" style={{background: this.getPM25Color(pollutantValues[j])}}  key={tdID}>{Math.floor(pollutantValues[j])}</td>)
                    }
                    else if (pollutant === 3){
                        if(j === 23) values.push(<td className="pollutant-td" style={{background: this.getNOColor(pollutantValues[j])}}  key={tdID}>{Math.round(pollutantValues[j]*100)/100}</td>)
                        else values.push(<td width={30} className="pollutant-td" style={{background: this.getNOColor(pollutantValues[j])}}  key={tdID}>{Math.round(pollutantValues[j]*100)/100}</td>)
                    }
                    else if (pollutant === 4){
                        if(j === 23) values.push(<td className="pollutant-td" style={{background: this.getSO2Color(pollutantValues[j])}}  key={tdID}>{Math.round(pollutantValues[j]*100)/100}</td>)
                        else values.push(<td width={30} className="pollutant-td" style={{background: this.getSO2Color(pollutantValues[j])}}  key={tdID}>{Math.round(pollutantValues[j]*100)/100}</td>)
                    }
                    else if (pollutant === 5){
                      if(j === 23) values.push(<td className="pollutant-td" style={{background: this.getTHDRColor(pollutantValues[j])}}  key={tdID}>{Math.round(pollutantValues[j]*100)/100}</td>)
                      else values.push(<td width={30} className="pollutant-td" style={{background: this.getTHDRColor(pollutantValues[j])}}  key={tdID}>{Math.round(pollutantValues[j]*100)/100}</td>)
                    }


                }
            }
        }
        return values
    }

    scrollValues=()=>{
        let test=this.state.currHour;
        window.onload += function() {
        document.getElementById('scroll-table').scrollLeft=40;
        console.log(document.getElementById('scroll-table').scrollLeft);}
    };

    closeErrDiv=()=>{
        this.setState({
            errMSGVisible:false
        })
    };

    render(){
        return(
           <div className="detailContainer" >

                    {this.state.loadingData && <div className="spinner">
                        <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner>
                        <Spinner animation="grow" role="status"><span className="sr-only" >Loading...</span></Spinner>
                        <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner></div>}
                    {!this.state.loadingData &&
                    <div style={{height: 100 + "%"}}>
                        <div className="legend">

                            <div className="legendItemBox">
                                <div className="legendHoursDiv"><span className="legendSpan">Час</span></div>
                                {/*<div className="legendItem" style={{height: "32px", lineHeight: "32px"}}><span className="legendSpan" >AQI</span></div>*/}
                                <div className="legendItem" style={{marginTop: "10px"}}><span className="legendSpan">PM<sub>10</sub></span><p className="legendSpanUnit">µg/m<sup>3</sup></p></div>
                                <div className="legendItem" ><span className="legendSpan">PM<sub>2.5</sub></span>µg/m<sup>3</sup></div>
                                <div className="legendItem" ><span className="legendSpan">NO</span>µg/m<sup>3</sup></div>
                                <div className="legendItem" ><span className="legendSpan">SO<sub>2</sub></span>µg/m<sup>3</sup></div>
                                <div className="legendItem" ><span className="legendSpan">THDR</span>Category</div>
                            </div>
                        </div>

                        <div onScroll={this.scrollValues()} className="div-table" id="scroll-table" style={{"overflow-y":"scroll;"}}>
                            <table style={{ width: 1000}}>
                                <tbody>
                                <tr>
                                    {this.state.days.map(function(day, index){
                                        return <td style={{ borderRight: "1px solid gray", height:"30px", fontSize:"14px" }} colSpan={24} key={index}>{day}</td>})}
                                </tr>
                                <tr>{this.renderHours()}</tr>
                                {/*<tr>{this.renderItems(0)}</tr>*/}
                                <tr height={4}></tr>
                                <tr>{this.renderItems(1)}</tr>
                                <tr>{this.renderItems(2)}</tr>
                                <tr>{this.renderItems(3)}</tr>
                                <tr>{this.renderItems(4)}</tr>
                                <tr>{this.renderItems(5)}</tr>
                                </tbody>
                            </table>
                        </div>
                    </div>}
                </div>
        );
    }
}
