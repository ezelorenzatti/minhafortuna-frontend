import React from 'react';
import {Route, Routes} from 'react-router-dom';

import Layout from "../components/Layout";
import Dashboard from '../pages/Dashboard';
import List from '../pages/List';
import UserProfile from "../pages/UserProfile";
import Operation from "../pages/Operation";
import Exchanges from "../pages/Exchanges";
import Exchange from "../pages/Exchange";
import Currencies from "../pages/Currencies";
import Currency from "../pages/Currency";

const AppRoutes: React.FC = () => (
    <Layout>
        <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/list/:type' element={<List/>}/>
            <Route path='/list/:type/add' element={<Operation/>}/>
            <Route path='/list/:type/edit/:id' element={<Operation/>}/>
            <Route path='/exchange/' element={<Exchanges/>}/>
            <Route path='/exchange/add' element={<Exchange/>}/>
            <Route path='/exchange/edit/:id' element={<Exchange/>}/>
            <Route path='/currency' element={<Currencies/>}/>
            <Route path='/currency/add' element={<Currency/>}/>
            <Route path='/currency/edit/:id' element={<Currency/>}/>
            <Route path='/profile' element={<UserProfile/>}/>
        </Routes>
    </Layout>
);

export default AppRoutes;