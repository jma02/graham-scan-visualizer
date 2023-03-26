import React, {useState} from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "../App.css";
type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

export function CoordinateInput(): JSX.Element {
    const [points, setPoints] = useState<string>("0 0 2 0 0 2");
    const [gif, setGif] = useState<string>("./default.gif");

    function handleChange (event: ChangeEvent) {
        const re = /^[0-9\b\s\n\r]+$/;
        if (event.target.value === "" || re.test(event.target.value)) {
            setPoints(event.target.value);
        }
    }

    async function postRequest (){
        const arr = points.replace(/\s+/g, " ").trim().split(" ").map((x)=>Number(x));
        if (arr.length % 2 === 0) {
            const apiPost: {vals: number[]} = {vals: []};
            apiPost.vals = [...arr];
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
                    setGif(objURL);
                });
        } else {
            alert("You must enter an even number of values!");
        }
    }
    
    function handleSubmit(){
        postRequest();
    }

    return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Form.Group className="align-items-start" controlId="pointsTextarea">
                                <Form.Label>
                                Points:
                                </Form.Label>
                                <br></br>
                                <Form.Control type="textarea"
                                    value={points}
                                    onChange={handleChange}
                                    required />
                                <br></br>
                                <Button onClick={handleSubmit}>Submit</Button>
                            </Form.Group>
                        </Col>
                        <Col>
                            <div className="card">
                                <img src={gif} alt="Finished Rendering"></img>
                            </div></Col>
                    </Row>
                </Container>
            </div>
        );
    }
