import { Global } from "@emotion/react";
import { GlobalStyle } from "./GlobalStyle";
import Router from "./components/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebaseApp";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

function App() {
    const auth = getAuth(app);
    const [init, setInit] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        !!auth?.currentUser
    );
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
            setInit(true);
        });
    }, [auth]);
    return (
        <>
            <Global styles={GlobalStyle} />
            {init ? (
                <Router isAuthenticated={isAuthenticated} />
            ) : (
                <Box>로딩중임</Box>
            )}
        </>
    );
}

export default App;
