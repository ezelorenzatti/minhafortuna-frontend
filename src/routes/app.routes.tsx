import React from 'react';
import {Route, Routes} from 'react-router-dom';

import Layout from "../components/Layout";
import Dashboard from '../pages/Dashboard';
import List from '../pages/List';
import UserProfile from "../pages/UserProfile";
import Operation from "../pages/Operation";

const AppRoutes: React.FC = () => (
    <Layout>
        <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/list/:type' element={<List/>}/>
            <Route path='/list/:type/add' element={<Operation/>}/>
            <Route path='/list/:type/edit/:id' element={<Operation/>}/>
            <Route path='/profile' element={<UserProfile/>}/>
        </Routes>
    </Layout>
);

export default AppRoutes;