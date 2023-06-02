import React from 'react';
import {Route, Routes} from 'react-router-dom';

import Layout from "../components/Layout";
import Dashboard from '../pages/Dashboard';
import List from '../pages/List';
import UserProfile from "../pages/UserProfile";

const AppRoutes: React.FC = () => (
    <Layout>
        <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/list/:type' element={<List/>}/>
            <Route path='/profile' element={<UserProfile/>}/>
        </Routes>
    </Layout>
);

export default AppRoutes;