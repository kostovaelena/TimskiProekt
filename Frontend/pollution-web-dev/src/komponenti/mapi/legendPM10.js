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

                        <Col className="text-center legendTabs">54</Col>

                        <Col className="text-center legendTabs">154</Col>

                        <Col className="text-center legendTabs">254</Col>

                        <Col className="text-center legendTabs">354</Col>

                        <Col className="text-center legendTabs">500</Col>

                        <Col className="text-center legendTabs">1200</Col>

                    </Row>}

                </Container>





        );}}

