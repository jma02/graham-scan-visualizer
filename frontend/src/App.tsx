import "./App.css";
import React, { useEffect, useState } from "react";
import { CoordinateInput } from "./components/CoordinateInput";

function App (): JSX.Element{
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const handleOrientationChange = () => {
            setIsMobile(window.innerWidth < window.innerHeight);
        };
    
        handleOrientationChange(); // Check initial orientation
    
        window.addEventListener("resize", handleOrientationChange);
    
        return () => {
            window.removeEventListener("resize", handleOrientationChange);
        };
    }, []);
  
    return (
        <div className="App">
            <header className="App-header"><h1>Graham Scan Visualizer</h1></header>
            <CoordinateInput/>
            {isMobile && (
                <div className="mobile-message">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-phone-landscape" viewBox="0 0 16 16">
                        <path d="M1 4.5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-6zm-1 6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v6z"/>
                        <path d="M14 7.5a1 1 0 1 0-2 0 1 1 0 0 0 2 0z"/>
                    </svg>
                    <p>Please rotate your device horizontally for a better viewing experience.</p>
                </div>
            )}
        </div>
    );
}

export default App;