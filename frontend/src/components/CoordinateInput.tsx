import React, {useState} from "react";
import { Form, Button, Container, Col} from "react-bootstrap";
import "../App.css";
import initialGif from "./default.gif";
type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

export function CoordinateInput(): JSX.Element {
    const [points, setPoints] = useState<string>("0 0 2 0 0 2");
    const [gif, setGif] = useState<string>(initialGif);

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
                    const objURL = URL.createObjectURL(blob) as string;
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
        <Container style={{ display: "flex" }} fluid>
            <Col style={{ width: "100%", height: "100%", textAlign: "center", fontFamily:"monospace" }}>
                <p>
                Input some coordinates and watch the magic happen.
                    <br/>
                Every <b>2</b> white-space seperated
                numbers will be considered a 2D-point.
                </p>
                <Form.Group
                    className="align-items-start"
                    controlId="pointsTextarea"
                >
                    <Form.Label>
                    Points:
                    </Form.Label>
                    <br/>
                    <Form.Control 
                        as="textarea"
                        value={points}
                        onChange={handleChange}
                        size="lg"
                        style={{ resize: "none" }}
                        required
                    
                    />
                    <br/>
                    <Button onClick={handleSubmit}>Submit</Button>
                </Form.Group>
            </Col>
            <Col style={{ width: "100%", height: "100%" }}>
                <div className="box" style={{height: "100%"}}>
                    <img src={gif} alt="Finished Rendering" style={{ width: "100%", height: "100%" }}/>
                </div>
            </Col>
        </Container>
    );
}
