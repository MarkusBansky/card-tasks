import {Col, Container, Row} from "react-bootstrap";
import React from "react";
import Footer from "./Footer";

export default function Page (props: {children: any}) {
    return (
        <div className={'application'}>
            <Container>
                <Row className="justify-content-md-center">
                    <Col lg={6}>
                        {props.children}
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}