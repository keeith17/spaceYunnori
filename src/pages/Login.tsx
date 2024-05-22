import { mainColor, wrapStyle } from "@/commonStyle";
import { app, db } from "@/firebaseApp";
import { Box, styled } from "@mui/material";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CustomInput = styled("input")({
    width: "50%",
    height: "50px",
    color: "white",
    background: "transparent",
    padding: "10px",
    fontSize: "16px",
    border: "2px solid #ccc",
    borderRadius: "4px",
    outline: "none",
    "&:focus": {
        borderColor: mainColor,
    },
    "&:hover": {
        borderColor: mainColor,
    },
});

export const CustomButton = styled("button")({
    width: "50%",
    height: "50px",
    color: "white",
    background: "transparent",
    padding: "10px",
    fontSize: "16px",
    border: "2px solid #ccc",
    borderRadius: "4px",
    outline: "none",
    "&:focus": {
        background: mainColor,
        borderColor: mainColor,
    },
    "&:hover": {
        background: mainColor,
        borderColor: mainColor,
    },
    transition: "all .2s",
});
export default function Login() {
    const [id, setId] = useState<string>("");
    const [pw, setPw] = useState<string>("");
    const [char, setChar] = useState<string>("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = e;
        if (name === "id") {
            setId(value);
        }
        if (name === "pw") {
            setPw(value);
        }
        if (name === "char") {
            setChar(value);
        }
    };
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const auth = getAuth(app);
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                id,
                pw
            );
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                name: char,
                email: id,
                uid: user.uid,
            });
            navigate("/");
        } catch (error) {
            console.log("무언가 잘못되었습니다");
        }
    };
    return (
        <Box sx={wrapStyle}>
            <Box
                sx={{
                    width: "50%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    alignItems: "center",
                }}
            >
                <CustomInput
                    name="id"
                    value={id}
                    placeholder="이메일"
                    onChange={handleChange}
                ></CustomInput>
                <CustomInput
                    name="pw"
                    value={pw}
                    placeholder="비밀번호"
                    onChange={handleChange}
                ></CustomInput>
                <CustomInput
                    name="char"
                    value={char}
                    onChange={handleChange}
                    placeholder="캐릭터명"
                ></CustomInput>
                <CustomButton onClick={handleSubmit}>가입</CustomButton>
            </Box>
        </Box>
    );
}
