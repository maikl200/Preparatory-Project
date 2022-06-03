import React, {FC} from 'react';
import {Route, Routes} from "react-router-dom";
import Authorization from "../../components/Authorization/Authorization";
import Catalog from "../../components/Catalog/Catalog";
import CatalogMore from "../../components/CatalogMore/CatalogMore";
import Login from "../../components/Login/Login";

const AppRouter: FC = () => {
    return (
        <Routes>
            <Route path='/authorization' element={<Authorization/>}/>
            <Route path='/catalog' element={<Catalog/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/catalog/catalogMore' element={<CatalogMore/>}/>
            <Route path='/' element={<Authorization/>}/>
            <Route path='*' element={<Authorization/>}/>
        </Routes>
    );
};

export default AppRouter;