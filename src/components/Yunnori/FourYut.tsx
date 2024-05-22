import AuthContext from "@/context/AuthContext";
import { app, db } from "@/firebaseApp";
import { Box, Button } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAuth, signOut } from "firebase/auth";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
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

export default function FourYut() {
    const { user } = useContext(AuthContext);
    const userUid = user?.uid;
    const [log, setLog] = useState<LogProps[]>([]);

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
                    four: Math.random() > 0.5 ? "앞" : "뒤",
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
        const LogQuery = query(LogRef, orderBy("timeStamp", "desc"));
        onSnapshot(LogQuery, (snapShot) => {
            const dataObj = snapShot?.docs?.map((doc) => ({
                ...doc?.data(),
                id: doc?.id,
            }));
            setLog(dataObj as LogProps[]);
        });
    }, []);

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
                        borderRight: "1px solid white",
                    }}
                >
                    <Button variant="outlined" onClick={handleSubmit}>
                        던져라!
                    </Button>
                </Box>
                <Box
                    sx={{
                        width: "20%",
                        height: "100%",
                        borderRight: "1px solid white",
                    }}
                >
                    {log[0]?.result?.one}
                </Box>
                <Box
                    sx={{
                        width: "20%",
                        height: "100%",
                        borderRight: "1px solid white",
                    }}
                >
                    {log[0]?.result?.two}
                </Box>
                <Box
                    sx={{
                        width: "20%",
                        height: "100%",
                        borderRight: "1px solid white",
                    }}
                >
                    {log[0]?.result?.three}
                </Box>
                <Box
                    sx={{
                        width: "20%",
                        height: "100%",
                        borderRight: "1px solid white",
                    }}
                >
                    {log[0]?.result?.four}
                </Box>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: "70%",
                }}
            >
                {log.map((result, index) => (
                    <Box key={index}>
                        {result?.name} 님이
                        {result?.timeStamp} 에 윷을 던져
                        {result?.result.one},{result?.result.two},
                        {result?.result.three},{result?.result.four} 이
                        나왔습니다!
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
