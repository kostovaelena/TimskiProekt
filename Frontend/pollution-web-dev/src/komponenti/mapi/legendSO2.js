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

                        <Col className="text-center legendTabs">0.04</Col>

                        <Col className="text-center legendTabs">0.08</Col>

                        <Col className="text-center legendTabs">0.38</Col>

                        <Col className="text-center legendTabs">0.8</Col>

                        <Col className="text-center legendTabs">1.6</Col>

                        <Col className="text-center legendTabs">2</Col>

                    </Row>}

                </Container>





        );}}

