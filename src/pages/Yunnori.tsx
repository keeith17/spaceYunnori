import { wrapStyle } from "@/commonStyle";
import FourYut from "@/components/Yunnori/FourYut";
import { Box } from "@mui/material";

export default function Yunnori() {
    return (
        <Box sx={wrapStyle}>
            <Box
                sx={{
                    width: "50%",
                    height: "100%",
                }}
            >
                <FourYut />
            </Box>
        </Box>
    );
}
