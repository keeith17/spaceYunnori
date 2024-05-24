import { motion } from "framer-motion";

export default function LoadMotion() {
    return (
        <motion.div
            animate={{ y: [5, -10, 0], x: [-5, -2, 1, 4] }}
            transition={{ duration: 1.5 }}
            style={{
                width: "100%",
                height: "100%",
                background: "url(/images/cloud.png) 50% 50% no-repeat",
                backgroundSize: "contain",
            }}
        />
    );
}
