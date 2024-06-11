import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadMotion() {
    const [currentImage, setCurrentImage] = useState(0);
    const images = [
        "url(/images/front.webp)",
        "url(/images/back.webp)",
        "url(/images/backback.webp)",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 50); // 0.1초 간격으로 변경

        const timeout = setTimeout(() => {
            clearInterval(interval);
        }, 700); // 5초 후에 인터벌 정지

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [images.length]);

    return (
        <motion.div
            style={{
                width: "100%",
                height: "100%",
                backgroundImage: images[currentImage],
                backgroundPosition: "50% 50%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                transition: "all 0.1s linear",
            }}
        />
    );
}
