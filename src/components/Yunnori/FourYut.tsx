import AuthContext from "@/context/AuthContext";
import { app, db } from "@/firebaseApp";
import { CustomButton } from "@/pages/Login";
import { Box, styled, useMediaQuery, useTheme } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAuth, signOut } from "firebase/auth";
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

const frontBox = {
    width: "100%",
    height: "100%",
    padding: "15%",
    display: "flex",
    alignItems: "center",
    img: {
        width: "100%",
    },
};
const backBox = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    img: {
        width: "100%",
    },
};
const backbackBox = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    padding: "5%",
    img: {
        width: "100%",
    },
};

export const MakeButton = styled("button")({
    width: "90%",
    height: "17%",
    background: "url(/images/버튼_사이즈조절.png) 50% 50% no-repeat",
    backgroundSize: "100% 100%",
    fontSize: "16px",
    outline: "none",
    transition: "all .2s",
});
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
            }, 1500);
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
                background:
                    "url(/images/게임기_사이즈조절.png) 50% 50% no-repeat",
                backgroundSize: "contain",
            }}
        >
            <Box
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
            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: "50%",
                    display: "flex",
                    flexFlow: "wrap",
                }}
            >
                <Box
                    sx={{
                        width: isSmallScreen ? "25%" : "20%",
                        height: isSmallScreen ? "70%" : "100%",
                    }}
                >
                    {load ? (
                        <LoadMotion />
                    ) : log[0]?.result?.one === "앞" ? (
                        <Box sx={frontBox}>
                            <img src="/images/front.png" />
                        </Box>
                    ) : (
                        <Box sx={backBox}>
                            <img src="/images/back.png" />
                        </Box>
                    )}
                </Box>
                <Box
                    sx={{
                        width: isSmallScreen ? "25%" : "20%",
                        height: isSmallScreen ? "70%" : "100%",
                        img: {
                            width: "100%",
                        },
                    }}
                >
                    {load ? (
                        <LoadMotion />
                    ) : log[0]?.result?.two === "앞" ? (
                        <Box sx={frontBox}>
                            <img src="/images/front.png" />
                        </Box>
                    ) : (
                        <Box sx={backBox}>
                            <img src="/images/back.png" />
                        </Box>
                    )}
                </Box>
                <Box
                    sx={{
                        width: isSmallScreen ? "25%" : "20%",
                        height: isSmallScreen ? "70%" : "100%",
                        img: {
                            width: "100%",
                        },
                    }}
                >
                    {load ? (
                        <LoadMotion />
                    ) : log[0]?.result?.three === "앞" ? (
                        <Box sx={frontBox}>
                            <img src="/images/front.png" />
                        </Box>
                    ) : (
                        <Box sx={backBox}>
                            <img src="/images/back.png" />
                        </Box>
                    )}
                </Box>
                <Box
                    sx={{
                        width: isSmallScreen ? "25%" : "20%",
                        height: isSmallScreen ? "70%" : "100%",
                    }}
                >
                    {load ? (
                        <LoadMotion />
                    ) : log[0]?.result?.four === "앞" ? (
                        <Box sx={frontBox}>
                            <img src="/images/front.png" />
                        </Box>
                    ) : (
                        <Box sx={backbackBox}>
                            <img src="/images/backback.png" />
                        </Box>
                    )}
                </Box>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: "50%",
                    padding: "14% 13% 7% 14%",
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
                            overflow: "scroll",
                            marginRight: ".45vw",
                        }}
                    >
                        {log.map((result, index) => (
                            <Box
                                key={index}
                                sx={{
                                    width: "100%",
                                    padding: ".4vw",
                                    display: "flex",
                                    justifyContent: "flexStart",
                                    fontSize: ".65vw",
                                    fontFamily: "nexonGothic",
                                }}
                            >
                                {`${result?.name} 님의 윷 결과 [${result?.result.one}, ${result?.result.two}, ${result?.result.three}, ${result?.result.four}] ${result?.timeStamp}`}
                            </Box>
                        ))}
                    </Box>

                    <Box
                        sx={{
                            width: isSmallScreen ? "100%" : "15%",
                            height: isSmallScreen ? "30%" : "100%",
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
