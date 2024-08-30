import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadMotion() {
    const [currentImage, setCurrentImage] = useState(0);
    const images = [
        "/images/front.webp",
        "/images/back.webp",
        "/images/backback.webp",
    ];

    useEffect(() => {
        let intervalDelay = 50; // 초기 이미지 변경 간격 설정
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
            intervalDelay += 10; // 이미지 변경 간격을 10밀리초씩 늘림
        }, intervalDelay); // 현재 이미지 변경 간격 적용

        const timeout = setTimeout(() => {
            clearInterval(interval);
        }, 600); // 5초 후에 인터벌 정지

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [images.length]);

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                position: "relative",
            }}
        >
            <motion.div
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${images[currentImage]})`,
                    backgroundPosition: "50% 50%",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                }}
            />
            <motion.div
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 2,
                    maskImage: "url('/images/front.webp')", // 마스크 이미지 지정
                    maskSize: "100% 100%",
                    backgroundColor: "white", // 배경색 설정
                    opacity: currentImage === 0 ? 0 : 1, // 첫 번째 이미지는 표시되지 않게 설정
                    transition: "opacity 0.5s ease-in-out", // 부드럽게 투명해지는 애니메이션 적용
                }}
            />
        </div>
    );
    // return (
    //     <motion.div
    //         style={{
    //             width: "100%",
    //             height: "100%",
    //             position: "relative",
    //             overflow: "hidden",
    //         }}
    //     >
    //         {[...Array(20)].map((_, i) => (
    //             <motion.div
    //                 key={i}
    //                 style={{
    //                     position: "absolute",
    //                     width: "7%", // 조각 크기 조절
    //                     height: "4%", // 조각 크기 조절
    //                     backgroundColor: `rgba(200, ${
    //                         Math.random() * 155 + 100
    //                     }, 255, 0.7)`, // 조각 색상
    //                     opacity: 1,
    //                     top: `${Math.random() * 70 + 11}%`,
    //                     left: `${Math.random() * 50 + 25}%`,
    //                 }}
    //                 animate={{
    //                     opacity: 0,
    //                     x: `${Math.random() * 200 - 100}%`, // x축으로 이동
    //                     y: `${Math.random() * 200 - 100}%`, // y축으로 이동
    //                     scale: [1, 0], // 축소
    //                     rotate: Math.random() * 360, // 랜덤 회전
    //                 }}
    //                 transition={{
    //                     duration: 1.5, // 애니메이션 지속 시간
    //                     delay: Math.random(), // 랜덤한 딜레이
    //                     ease: "easeInOut", // 이징 함수
    //                 }}
    //             />
    //         ))}
    //         <img
    //             src="/images/front.webp"
    //             alt="Pixelate Image"
    //             style={{
    //                 width: "100%",
    //                 height: "auto",
    //                 position: "relative",
    //                 zIndex: -1,
    //             }}
    //         />
    //     </motion.div>
    // );
}
