import "./App.css";
import React from "react";
import { CoordinateInput } from "./components/CoordinateInput.js";

export default function MyApp () {
    return (
        <div>
            <h1>Graham Scan Visualizer</h1>
            <p>Input some coordinates and watch the magic happen.</p>
            <p>Every two space seperated values will be considered a 2D point.</p>
            <CoordinateInput/>
        </div>
    );
}
