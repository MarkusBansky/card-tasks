import React from 'react';
import {Col, Row} from "react-bootstrap";
import '../styles/Footer.scss';

export default function Footer () {
    return (
        <Row className={'footer'}>
            <Col>
                <p>Created with love by Markiian Benovskyi © 2020 - {new Date().getFullYear()}</p>
            </Col>
        </Row>
    )
}