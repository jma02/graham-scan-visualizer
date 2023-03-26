import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import initial from "../gifs/default.gif";
let gscan = initial;
export class CoordinateInput extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            value: "0 0 2 0 0 2"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (event) {
        this.setState({ value: event.target.value });
    }

    async handleSubmit (event) {
        event.preventDefault();
        const arr = this.state.value.replace(/\s+/g, " ").trim().split(" ");
        if (arr.length % 2 === 0) {
            const apiPost = {};
            apiPost.vals = arr;
            await fetch("/api/addsubmission",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(apiPost)
                })
                .then(response => response.blob())
                .then(blob => {
                    const objURL = URL.createObjectURL(blob);
                    gscan = objURL;
                });
        } else {
            alert("You must enter an even number of values!");
        }
        this.setState({ value: this.state.value });
    }

    handleKeyPress (event) {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        const regex = /^[0-9\s\n\r]+$/; // regex to match numbers and spaces only
        if (!regex.test(keyValue)) {
            event.preventDefault();
        }
    };

    render () {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="pointsTextarea">
                                <Form.Label>
                    Points:
                                </Form.Label>
                                <br></br>
                                <Form.Control type="textarea" pattern="[0-9\s\n\r]+"
                                    value={this.state.value}
                                    onKeyPress={this.handleKeyPress}
                                    onChange={this.handleChange}
                                    style={{ height: "500px", width: "400px", fontSize: "40px" }}
                                    required />
                                <br></br>
                                <Button onClick={this.handleSubmit}>Submit</Button>
                            </Form.Group>
                        </Col>
                        <Col><img src={gscan} alt={"Finished Rendering"}></img></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
