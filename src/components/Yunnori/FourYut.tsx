import AuthContext from "@/context/AuthContext";
import { app, db } from "@/firebaseApp";
import { CustomButton } from "@/pages/Login";
import { Box } from "@mui/material";
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
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";

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
    padding: "15%",
    img: {
        width: "100%",
    },
};
const backBox = {
    width: "100%",
    img: {
        width: "100%",
    },
};
const backbackBox = {
    width: "100%",
    padding: "5%",
    img: {
        width: "100%",
    },
};
export default function FourYut() {
    const { user } = useContext(AuthContext);
    const userUid = user?.uid;
    const [log, setLog] = useState<LogProps[]>([]);
    const [load, setLoad] = useState<boolean>(false);
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
                    one: Math.random() > 0.5 ? "앞" : "뒤",
                    two: Math.random() > 0.5 ? "앞" : "뒤",
                    three: Math.random() > 0.5 ? "앞" : "뒤",
                    four: Math.random() > 0.5 ? "앞" : "깊은 뒤",
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
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    hiehgt: "5%",
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
                    height: "25%",
                    display: "flex",
                }}
            >
                <Box
                    sx={{
                        width: "20%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CustomButton
                        sx={{
                            border: "none",
                        }}
                        onClick={handleSubmit}
                    >
                        던져라!
                    </CustomButton>
                </Box>
                <Box
                    sx={{
                        width: "20%",
                        height: "100%",
                    }}
                >
                    {log[0]?.result?.one === "앞" ? (
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
                        width: "20%",
                        height: "100%",
                        img: {
                            width: "100%",
                        },
                    }}
                >
                    {log[0]?.result?.two === "앞" ? (
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
                        width: "20%",
                        height: "100%",
                        img: {
                            width: "100%",
                        },
                    }}
                >
                    {log[0]?.result?.three === "앞" ? (
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
                        width: "20%",
                        height: "100%",
                    }}
                >
                    {load ? (
                        <motion.div
                            animate={{ x: 100 }}
                            transition={{ duration: 0.5 }}
                            style={{
                                width: "100px",
                                height: "100px",
                                backgroundColor: "blue",
                            }}
                        />
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
                    height: "70%",
                    overflow: "scroll",
                }}
            >
                {log.map((result, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: "100%",
                            padding: "10px",
                            display: "flex",
                            justifyContent: "center",
                            fontSize: "16px",
                            fontFamily: "nexonGothic",
                        }}
                    >
                        {`${result?.name} 님이 ${result?.timeStamp} 에 윷을 던져 [${result?.result.one}, ${result?.result.two}, ${result?.result.three}, ${result?.result.four}]이 나왔습니다!`}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
