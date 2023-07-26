import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
interface ImageSliderProps {
    images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null); // To store the timer

    const startTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
                setIsFading(false);
            }, 500);
        }, 4500);
    };

    const resetTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        startTimer();
    };

    useEffect(() => {
        startTimer();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [images]);

    const handleSlideChange = (direction: "next" | "prev") => {
        setIsFading(true);
        setTimeout(() => {
            if (direction === "next") {
                setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
            } else {
                setCurrentIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
            }
            setIsFading(false);
        }, 500);
        resetTimer();
    };

    return (
        <div className="image-slider-wrapper">
            <div className="image-slider">
                <img
                    src={images[currentIndex]}
                    alt={`slide-${currentIndex}`}
                    className={`slider-image ${isFading ? 'fading' : ''}`}
                />
            </div>
            <div className="slider-controls">
                <button onClick={() => handleSlideChange("prev")} className="prev-btn">
                    <FaArrowLeft />
                </button>
                <button onClick={() => handleSlideChange("next")} className="next-btn">
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
}

export default ImageSlider;
