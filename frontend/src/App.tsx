import "./App.css";
import React from "react";
import { CoordinateInput } from "./components/CoordinateInput";

function App (): JSX.Element{
    return (
        <div className="App">
            <header className="App-header"><h1>Graham Scan Visualizer</h1></header>
            <p>Input some coordinates and watch the magic happen. Every <b>2</b> white-space seperated
                numbers will be considered a 2D-point.
            </p>
            <CoordinateInput/>
        </div>
    );
}

export default App;