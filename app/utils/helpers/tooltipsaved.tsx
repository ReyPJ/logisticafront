import React, { useState, ReactNode } from 'react';

interface TooltipIconProps {
    tooltipText: string;
    children: ReactNode;
}

const TooltipIcon: React.FC<TooltipIconProps> = ({ tooltipText, children }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className="relative inline-block" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
            {children}
            {showTooltip && (
                <div className="opacity-100 bg-blue-600 text-white text-xs rounded-md py-1 px-2 absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ease-in-out pointer-events-none">
                    {tooltipText}
                    <svg className="absolute text-blue-600 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255">
                        <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
                    </svg>
                </div>
            )}
        </div>
    );
};

export default TooltipIcon;
