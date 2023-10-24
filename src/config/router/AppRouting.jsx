import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Auth } from '../../pages/Auth';
import { Error } from '../../pages/Error';
import { SelectRole } from '../../pages/Auth/component/SelectRole';
import { SignIn } from '../../pages/Auth/component/SignIn';
import { Home } from '../../pages/Home';
import { PanelPostsList } from '../../pages/Home/components/PanelPostsList';
import { PanelCreatePost } from '../../pages/Home/components/PanelCreatePost';
import { PanelSubject } from '../../pages/Home/components/PanelSubject';
import { PanelNotification } from '../../pages/Home/components/PanelNotification';
import { PanelProfile } from '../../pages/Home/components/PanelProfile';
import { PanelEditProfile } from '../../pages/Home/components/PanelEditProfile';

export const AppRouting = () => {
    return (
        <Routes>
            <Route path='/auth' element={<Auth/>}>
                <Route path='' element={<SelectRole/>}/>
                <Route path='login' element={<SignIn/>}/>
            </Route>
            <Route path='/' element={<Home />}>
                <Route path='' element={<PanelPostsList/>}/>
                <Route path='create-post' element={<PanelCreatePost/>}/>
                <Route path='subject' element={<PanelSubject/>}/>
                <Route path='notification' element={<PanelNotification/>}/>
                <Route path='profile' element={<PanelProfile/>}/>
                <Route path='profile/edit' element={<PanelEditProfile/>}/>
            </Route>
            <Route path='*' element={<Error />} />
        </Routes>
    );
};

export default AppRouting;