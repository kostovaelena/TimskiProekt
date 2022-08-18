import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import { Tooltip } from '@material-ui/core';
// import MultiSwitch from 'react-multi-switch-toggle'
import { Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'





export default class Pollutants extends React.Component {

    constructor(props){
        super(props);
        this.state={
            PM10isActive:true,
            THUNDERSTORMisActive:false,
            PM25isActive:false,
            NOisActive:false,
            SO2isActive:false
        }
    }

    THUNDERSTORMisClicked=()=>{
      this.setState({
          THUNDERSTORMisActive:true,
          PM25isActive:false,
          PM10isActive:false,
          NOisActive:false,
          SO2isActive:false,
          currentActive:"THDR"
      })
      this.props.changePollutantFun("THDR");
    };

    PM25IsClicked=()=>{
        this.setState({
            PM25isActive:true,
            THUNDERSTORMisActive:false,
            PM10isActive:false,
            NOisActive:false,
            SO2isActive:false,
            currentActive:"PM25"
        })
        this.props.changePollutantFun("PM25");
    };
    PM10IsClicked=()=>{
        this.setState({
            PM25isActive:false,
            THUNDERSTORMisActive:false,
            PM10isActive:true,
            NOisActive:false,
            SO2isActive:false,
            currentActive:"PM10"
        })
        this.props.changePollutantFun("PM10");
    };
    NOIsClicked=()=>{
        this.setState({
            PM25isActive:false,
            THUNDERSTORMisActive:false,
            PM10isActive:false,
            NOisActive:true,
            SO2isActive:false,
            currentActive:"NO"
        })
        this.props.changePollutantFun("NO");
    };
    SO2IsClicked=()=>{
        this.setState({
            PM25isActive:false,
            THUNDERSTORMisActive:false,
            PM10isActive:false,
            NOisActive:false,
            SO2isActive:true,
            currentActive:"SO2"
        })
        this.props.changePollutantFun("SO2");
    };


    render() {

        return (

            <div className="selectPollutantSwitch">
                <Button.Group>
                    <Button active = {this.state.THUNDERSTORMisActive} onClick={this.THUNDERSTORMisClicked}>THUNDERSTORMS</Button>
                    <Button.Or text=""/>
                    <Button active={this.state.PM10isActive} onClick={this.PM10IsClicked}>PM<sub>10</sub></Button>
                    <Button.Or text=""/>
                    <Button active={this.state.PM25isActive} onClick={this.PM25IsClicked}>PM<sub>2.5</sub></Button>
                    <Button.Or text=""/>
                    <Button active={this.state.NOisActive} onClick={this.NOIsClicked}>NO</Button>
                    <Button.Or text=""/>
                    <Button active={this.state.SO2isActive} onClick={this.SO2IsClicked}>SO<sub>2</sub></Button>
                </Button.Group>
            </div>
        );

    }
}
