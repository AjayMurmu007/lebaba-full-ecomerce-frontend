import React, { useEffect, useState } from 'react';

const LoadingDots = ({ text = 'Loading', speed = 300, maxDots = 5 }) => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= maxDots ? '' : prev + '.'));
        }, speed);

        return () => clearInterval(interval);
    }, [speed, maxDots]);

    return (
        <div className="text-black text-xl font-semibold text-center py-6">
            {text}
            <span>{dots}</span>
        </div>
    );
};

export default LoadingDots;
