import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"

export default class Legend extends React.Component {
    render() {
        return (




                <Container fluid className="legenda">
                    {this.props.displayLegend &&
                    <Row>

                        <Col className="text-center legendTabs">12</Col>

                        <Col className="text-center legendTabs">35</Col>

                        <Col className="text-center legendTabs">55</Col>

                        <Col className="text-center legendTabs">150</Col>

                        <Col className="text-center legendTabs">300</Col>

                        <Col className="text-center legendTabs">500</Col>

                    </Row>}

                </Container>





        );}}

