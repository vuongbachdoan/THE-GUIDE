import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppLayout } from '../../core/layout/AppLayout';
import { Auth } from '../../pages/Auth';
import { Error } from '../../pages/Error';
import { SelectRole } from '../../pages/Auth/component/SelectRole';
import { SignIn } from '../../pages/Auth/component/SignIn';
import { Home } from '../../pages/Home';


export const AppRouting = () => {
    return (
        <Routes>
            <Route path='/auth' element={<Auth/>}>
                <Route path='' element={<SelectRole/>}/>
                <Route path='login' element={<SignIn/>}/>
            </Route>
            <Route path='/' element={<Home />}>

            </Route>
            <Route path='*' element={<Error />} />
        </Routes>
    );
};

export default AppRouting;