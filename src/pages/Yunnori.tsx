import { wrapStyle } from "@/commonStyle";
import FourYut from "@/components/Yunnori/FourYut";
import { Box, useMediaQuery, useTheme } from "@mui/material";

export default function Yunnori() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
    return (
        <Box sx={wrapStyle}>
            <Box
                sx={{
                    width: isSmallScreen ? "100%" : "30%",
                    height: "100%",
                }}
            >
                <FourYut />
            </Box>
        </Box>
    );
}
