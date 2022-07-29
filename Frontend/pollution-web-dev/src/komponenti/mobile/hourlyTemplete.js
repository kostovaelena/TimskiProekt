import React, { Component } from 'react'
import "./hourlyTempleteStyle.css"
import { CircularProgressbarWithChildren,buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import VisibilitySensor from "react-visibility-sensor";
// import moment from 'moment';

export default class HourlyTemplete extends React.Component {

    constructor(props){
        super(props);

        this.state={
            loadingData:true,
            pm25Value:0,
            pm10Value:0,
            noValue:0,
            so2Value:0,
            chartPM25Color:"green",
            chartPM10Color:"green",
            chartNOColor:"green",
            chartSO2Color:"green",
            firstLoad: this.props.pollHour === 0 ? true : false
        }
    }




    async componentDidMount(){
        await this.getPM25Color(this.props.pollValue[1]);
        await this.getPM10Color(this.props.pollValue[0]);
        await this.getNOColor(this.props.pollValue[2]);
        await this.getSO2Color(this.props.pollValue[3]);

    }


    getPM25Color=(val)=>{

        if (val<12.1) {
            this.setState({
                chartPM25Color:"green"
            })
        } else if (val<35.5) {
            this.setState({
                chartPM25Color:"#e8e801"
            })
        } else if (val<55.5) {
            this.setState({
                chartPM25Color:"orange"
            })
        } else if (val<150.5) {
            this.setState({
                chartPM25Color:"red"
            })
        } else if (val<250.5) {
            this.setState({
                chartPM25Color:"blueviolet"
            })
        } else{
            this.setState({
                chartPM25Color:"brown"
            })
        }
    };

    getPM10Color=(val)=>{

        if (val<54) {
            this.setState({
                chartPM10Color:"green"
            })
        } else if (val<154) {
            this.setState({
                chartPM10Color:"#e8e801"
            })
        } else if (val<254) {
            this.setState({
                chartPM10Color:"orange"
            })
        } else if (val<354) {
            this.setState({
                chartPM10Color:"red"
            })
        } else if (val<500) {
            this.setState({
                chartPM10Color:"blueviolet"
            })
        } else{
            this.setState({
                chartPM10Color:"brown"
            })
        }
    };

    getNOColor=(val)=>{

        if (val<0.04) {
            this.setState({
                chartNOColor:"green"
            })
        } else if (val<0.08) {
            this.setState({
                chartNOColor:"#e8e801"
            })
        } else if (val<0.18) {
            this.setState({
                chartNOColor:"orange"
            })
        } else if (val<0.28) {
            this.setState({
                chartNOColor:"red"
            })
        } else if (val<0.4) {
            return this.setState({
                chartNOColor:"blueviolet"
            })
        } else{
            this.setState({
                chartNOColor:"brown"
            })
        }
    };

    getSO2Color=(val)=>{

        if (val<0.04) {
            this.setState({
                chartSO2Color:"green"
            })
        } else if (val<0.08) {
            this.setState({
                chartSO2Color:"#e8e801"
            })
        } else if (val<0.38) {
            this.setState({
                chartSO2Color:"orange"
            })
        } else if (val<0.8) {
            this.setState({
                chartSO2Color:"red"
            })
        } else if (val<1.6) {
            this.setState({
                chartSO2Color:"blueviolet"
            })
        } else{
            this.setState({
                chartSO2Color:"brown"
            })
        }
    };


    render() {
        // let today = moment().format('DD.MM.YYYY');


        return(


                <div className="hourlyInnerContainerTemplete">

                    <div className="hourlyFirstRowTemplete">
                        {this.state.firstLoad &&<p className="hourlyMunicipalityNameTemplete"></p>}
                        {this.state.firstLoad &&<p className="hourlyDateTemplete">{this.props.pollHour}:00 часот</p>}
                        {!this.state.firstLoad &&<p className="hourlyMunicipalityNameTemplete"></p>}
                        {!this.state.firstLoad &&<p className="hourlyDateAfterTemplete">{this.props.pollHour}:00 часот</p>}
                    </div>

                    <div className="hourlySecondRowTemplete">

                        <div className="pm25DivTemplete">
                            <div className="pmChartTemplete">

                                <VisibilitySensor>
                                    {({ isVisible }) => {
                                        const percentage = true ? Math.round(this.props.pollValue[1]) : 0;
                                        return (
                                                <CircularProgressbarWithChildren
                                                    minValue={0}
                                                    maxValue={250.5}
                                                    value={percentage}
                                                    circleRatio={0.75}
                                                    strokeWidth={12}
                                                    styles={buildStyles({
                                                        rotation: 1 / 2 + 1 / 8,
                                                        strokeLinecap: "round",
                                                        trailColor: "#eee",
                                                        textSize: '16px',
                                                        pathColor:this.state.chartPM25Color


                                                    })}>
                                                    <div className="hourlyPollutantChartValueDivTemplete">
                                                        <p className="hourlyPollutantChartParValTemplete">{percentage}</p>
                                                        <p className="hourlyPollutantChartParUnitTemplete">µg/m<sup>3</sup></p>
                                                    </div>

                                                </CircularProgressbarWithChildren>
                                        );
                                    }}
                                </VisibilitySensor>

                            </div>

                            <div className="hourlyPollTypeDivTemplete">
                                <p>PM<sub>2.5</sub></p>
                            </div>
                        </div>

                        <div className="pm10DivTemplete">
                            <div className="pmChartTemplete">

                                <VisibilitySensor>
                                    {({ isVisible }) => {
                                        const percentage = true ? Math.round(this.props.pollValue[0]) : 0;
                                        return (
                                            <CircularProgressbarWithChildren
                                                minValue={0}
                                                maxValue={500}
                                                value={percentage}
                                                // text={`${percentage}`}
                                                circleRatio={0.75}
                                                strokeWidth={12}
                                                // µg/m³
                                                styles={buildStyles({
                                                    rotation: 1 / 2 + 1 / 8,
                                                    strokeLinecap: "round",
                                                    trailColor: "#eee",
                                                    textSize: '16px',
                                                    pathColor:this.state.chartPM10Color

                                                })}>
                                                <div className="hourlyPollutantChartValueDivTemplete">
                                                    <p className="hourlyPollutantChartParValTemplete">{percentage}</p>
                                                    <p className="hourlyPollutantChartParUnitTemplete">µg/m<sup>3</sup></p>
                                                </div>

                                            </CircularProgressbarWithChildren>
                                        );
                                    }}
                                </VisibilitySensor>

                            </div>
                            <div className="hourlyPollTypeDivTemplete">
                                <p>PM<sub>10</sub></p>
                            </div>
                        </div>

                        <div className="noDivTemplete">
                            <div className="pmChartTemplete">

                                <VisibilitySensor>
                                    {({ isVisible }) => {
                                        const percentage = true ? Math.round(this.props.pollValue[2]*100)/100 : 0;
                                        return (
                                            <CircularProgressbarWithChildren
                                                minValue={0}
                                                maxValue={0.4}
                                                value={percentage}
                                                // text={`${percentage}`}
                                                circleRatio={0.75}
                                                strokeWidth={12}
                                                // µg/m³
                                                styles={buildStyles({
                                                    rotation: 1 / 2 + 1 / 8,
                                                    strokeLinecap: "round",
                                                    trailColor: "#eee",
                                                    textSize: '16px',
                                                    pathColor:this.state.chartNOColor

                                                })}>
                                                <div className="hourlyPollutantChartValueDivTemplete">
                                                    <p className="hourlyPollutantChartParValTemplete">{percentage}</p>
                                                    <p className="hourlyPollutantChartParUnitTemplete">µg/m<sup>3</sup></p>
                                                </div>

                                            </CircularProgressbarWithChildren>
                                        );
                                    }}
                                </VisibilitySensor>

                            </div>
                            <div className="hourlyPollTypeDivTemplete">
                                <p>NO</p>
                            </div>
                        </div>

                        <div className="so2DivTemplete">
                            <div className="pmChartTemplete">

                                <VisibilitySensor>
                                    {({ isVisible }) => {
                                        const percentage = true ? Math.round(this.props.pollValue[3]*100)/100: 0;
                                        return (
                                            <CircularProgressbarWithChildren
                                                minValue={0}
                                                maxValue={1.6}
                                                value={percentage}
                                                // text={`${percentage}`}
                                                circleRatio={0.75}
                                                strokeWidth={12}
                                                // µg/m³
                                                styles={buildStyles({
                                                    rotation: 1 / 2 + 1 / 8,
                                                    strokeLinecap: "round",
                                                    trailColor: "#eee",
                                                    textSize: '16px',
                                                    pathColor:this.state.chartSO2Color

                                                })}>
                                                <div className="hourlyPollutantChartValueDivTemplete">
                                                    <p className="hourlyPollutantChartParValTemplete">{percentage}</p>
                                                    <p className="hourlyPollutantChartParUnitTemplete">µg/m<sup>3</sup></p>
                                                </div>

                                            </CircularProgressbarWithChildren>
                                        );
                                    }}
                                </VisibilitySensor>

                            </div>
                            <div className="hourlyPollTypeDivTemplete">
                                <p>SO<sub>2</sub></p>
                            </div>
                        </div>

                    </div>

                </div>

        );
    }
}