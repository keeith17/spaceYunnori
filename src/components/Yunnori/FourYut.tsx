import AuthContext from "@/context/AuthContext";
import { db } from "@/firebaseApp";
import {
    Box,
    Typography,
    styled,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    limit,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import LoadMotion from "./LoadMotion";
import { mainColor } from "@/commonStyle";

interface LogProps {
    timeStamp: string;
    result: {
        one: string;
        two: string;
        three: string;
        four: string;
    };
    id: string;
    name: string;
}

interface CharProps {
    email: string;
    name: string;
    uid: string;
}

const stickBox = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    img: {
        width: "100%",
    },
};
const stickBackBox = {
    width: "100%",
    height: "100%",
    padding: "6%",
    display: "flex",
    alignItems: "center",
    img: {
        width: "100%",
    },
};

export default function FourYut() {
    const { user } = useContext(AuthContext);
    const userUid = user?.uid;
    const [log, setLog] = useState<LogProps[]>([]);
    const [load, setLoad] = useState<boolean>(false);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
    const handleSubmit = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        submitRecord.mutate();
    };

    const MakeButton = styled("button")({
        width: isSmallScreen ? "45px" : "75px",
        height: isSmallScreen ? "45px" : "75px",
        marginTop: "20%",
        background: "url(/images/button.webp) 50% 50% no-repeat",
        backgroundSize: "100% 100%",
        fontSize: "16px",
        outline: "none",
        transition: "all .2s",
    });

    const submitRecord = useMutation({
        mutationFn: async () => {
            const myTimeStamp = new Date()?.toLocaleDateString("ko", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            });
            const recordRef = collection(db, "result");
            await addDoc(recordRef, {
                timeStamp: myTimeStamp,
                result: {
                    one: Math.random() > 0.65 ? "앞" : "뒤",
                    two: Math.random() > 0.65 ? "앞" : "뒤",
                    three: Math.random() > 0.65 ? "앞" : "뒤",
                    four: Math.random() > 0.65 ? "앞" : "뒤",
                },
                name: myChar?.name,
            });
        },
        onSuccess: (data) => {
            console.log(data, "하여튼 성공");
        },
    });

    const fetchMyChar = async () => {
        if (userUid) {
            try {
                const docRef = doc(db, "users", userUid);
                const postSnap = await getDoc(docRef);
                const data = {
                    ...postSnap?.data(),
                } as CharProps;
                return data;
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
    };

    const { data: myChar } = useQuery({
        queryKey: ["myChar"],
        queryFn: fetchMyChar,
    });

    useEffect(() => {
        const LogRef = collection(db, "result");
        const LogQuery = query(LogRef, orderBy("timeStamp", "desc"), limit(30));
        const unsubscribe = onSnapshot(LogQuery, (snapShot) => {
            const dataObj = snapShot?.docs?.map((doc) => ({
                ...doc?.data(),
                id: doc?.id,
            }));
            setLoad(true);

            setTimeout(() => {
                setLoad(false);
                setLog(dataObj as LogProps[]);
            }, 700);
            // setLoad(true);
            // setLog(dataObj as LogProps[]);
        });
        return () => unsubscribe();
    }, []);

    // useEffect(() => {
    //     if (load) {
    //         const timer = setTimeout(() => {
    //             setLoad(false);
    //         }, 3000);

    //         // Cleanup timer on component unmount or if load changes
    //         return () => clearTimeout(timer);
    //     }
    // }, [load]);

    useEffect(() => {
        console.log(log);
    }, [log]);

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                background: "url(/images/game.webp) 50% 50% no-repeat",
                backgroundSize: isSmallScreen ? "100% 100%" : "contain",
            }}
        >
            {/* <Box
                sx={{
                    width: "100%",
                    height: "5%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                }}
            >
                <button
                    type="button"
                    onClick={async () => {
                        const auth = getAuth(app);
                        await signOut(auth);
                    }}
                >
                    임시로그아웃
                </button>
            </Box> */}
            <Box
                sx={{
                    width: "100%",
                    height: "50%",
                    display: "flex",
                    padding: "15%",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        width: "25%",
                        height: isSmallScreen ? "70%" : "100%",
                    }}
                >
                    {load ? (
                        <LoadMotion />
                    ) : log[0]?.result?.one === "앞" ? (
                        <Box sx={stickBox}>
                            <img src="/images/front.webp" />
                        </Box>
                    ) : (
                        <Box sx={stickBackBox}>
                            <img src="/images/back.webp" />
                        </Box>
                    )}
                </Box>
                <Box
                    sx={{
                        width: "25%",
                        height: isSmallScreen ? "70%" : "100%",
                        img: {
                            width: "100%",
                        },
                    }}
                >
                    {load ? (
                        <LoadMotion />
                    ) : log[0]?.result?.two === "앞" ? (
                        <Box sx={stickBox}>
                            <img src="/images/front.webp" />
                        </Box>
                    ) : (
                        <Box sx={stickBackBox}>
                            <img src="/images/back.webp" />
                        </Box>
                    )}
                </Box>
                <Box
                    sx={{
                        width: "25%",
                        height: isSmallScreen ? "70%" : "100%",
                        img: {
                            width: "100%",
                        },
                    }}
                >
                    {load ? (
                        <LoadMotion />
                    ) : log[0]?.result?.three === "앞" ? (
                        <Box sx={stickBox}>
                            <img src="/images/front.webp" />
                        </Box>
                    ) : (
                        <Box sx={stickBackBox}>
                            <img src="/images/back.webp" />
                        </Box>
                    )}
                </Box>
                <Box
                    sx={{
                        width: "25%",
                        height: isSmallScreen ? "70%" : "100%",
                    }}
                >
                    {load ? (
                        <LoadMotion />
                    ) : log[0]?.result?.four === "앞" ? (
                        <Box sx={stickBox}>
                            <img src="/images/front.webp" />
                        </Box>
                    ) : (
                        <Box sx={stickBackBox}>
                            <img src="/images/backback.webp" />
                        </Box>
                    )}
                </Box>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: "50%",
                    padding: isSmallScreen
                        ? "18% 10% 12% 12%"
                        : "14% 13% 7% 14%",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                    }}
                >
                    <Box
                        sx={{
                            width: "85%",
                            height: "100%",
                            overflowY: "scroll",
                            marginRight: isSmallScreen ? "1%" : "2%",
                        }}
                    >
                        {log.map((result, index) => (
                            <Box
                                key={index}
                                sx={{
                                    width: "100%",
                                    padding: isSmallScreen ? "1%" : "1%",
                                    display: "flex",
                                    justifyContent: "flexStart",
                                    alignItems: "flex-end",
                                    fontFamily: "nexonGothic",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: isSmallScreen
                                            ? "3.3vw"
                                            : ".6vw",
                                    }}
                                >
                                    {`${result?.name} 님의 결과 [${result?.result.one}, ${result?.result.two}, ${result?.result.three}, ${result?.result.four}]`}
                                </Typography>
                                <Typography
                                    sx={{
                                        display: "flex",
                                        alignItems: "flex-end",
                                        paddingLeft: "2%",
                                        fontSize: isSmallScreen
                                            ? "2.4vw"
                                            : ".45vw",
                                        color: mainColor,
                                    }}
                                >
                                    {result?.timeStamp.slice(13, 22)}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    <Box
                        sx={{
                            width: isSmallScreen ? "15%" : "15%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <MakeButton
                            sx={{
                                border: "none",
                            }}
                            onClick={handleSubmit}
                            disabled={load}
                        ></MakeButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
