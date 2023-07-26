import React, { useState, useEffect } from 'react';

const ScrollTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>
            {isVisible && (
                <button className="scroll-btn" onClick={scrollToTop}>
                    Scroll to Top
                </button>
            )}
        </div>
    );
};

export default ScrollTop;
