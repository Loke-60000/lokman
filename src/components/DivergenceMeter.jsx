import React, { useState, useEffect, useRef } from 'react';
import '../styles/nixie.css';
import tubeImage from '../assets/images/divergence_meter_tube.png';

function Divergencemeter() {
    const [time, setTime] = useState(new Date());
    const animationFrameId = useRef();

    const updateClock = () => {
        setTime(new Date());
        animationFrameId.current = requestAnimationFrame(updateClock);
    };

    useEffect(() => {
        animationFrameId.current = requestAnimationFrame(updateClock);
        return () => cancelAnimationFrame(animationFrameId.current);
    }, []);

    const formattedTime = [
        time.getHours().toString().padStart(2, '0'),
        time.getMinutes().toString().padStart(2, '0'),
        time.getSeconds().toString().padStart(2, '0'),
        time.getMilliseconds().toString().padStart(3, '0')
    ];

    return (
        <div className="nixie__wrapper">
            <div className="nixie__mesh"></div>
            <div className="nixie__value">
                {formattedTime.map((segment, index) => (
                    <React.Fragment key={index}>
                        {segment.split('').map((digit, digitIndex) => (
                            <span key={digitIndex} className="nixie__digit-container">
                                <span className="nixie__digit">{digit}</span>
                                <span className="nixie__number-background" style={{ backgroundImage: `url(${tubeImage})` }}></span>
                            </span>
                        ))}
                        {index < formattedTime.length - 1 && (
                            <span className="nixie__digit-container">
                                <span className="nixie__number-background" style={{ backgroundImage: `url(${tubeImage})` }}></span>
                                <span className="nixie__dot">.</span>
                            </span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default Divergencemeter;