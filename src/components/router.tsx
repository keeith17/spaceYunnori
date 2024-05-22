import Login from "@/pages/Login";
import Yunnori from "@/pages/Yunnori";
import { Navigate, Route, Routes } from "react-router-dom";

interface RouterProps {
    isAuthenticated: boolean;
}

export default function Router({ isAuthenticated }: RouterProps) {
    return (
        <Routes>
            {isAuthenticated ? (
                <Route path="/" element={<Yunnori />} />
            ) : (
                <>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="*"
                        element={<Navigate replace to="/login" />}
                    />
                </>
            )}
        </Routes>
    );
}
