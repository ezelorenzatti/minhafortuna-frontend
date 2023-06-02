import React from 'react';
import {Route, Routes} from 'react-router-dom';
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const AuthRoutes: React.FC = () => (
    <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/signIn" element={<SignIn/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
    </Routes>
);

export default AuthRoutes;