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
import { PanelViewPost } from '../../pages/Home/components/PanelViewPost';
import { LectureManaging } from '../../pages/Home/components/LectureManaging';
import { LectureManagingStudent } from '../../pages/Home/components/PanelLectureManagingStudent';
import { LectureManagingDashboard } from '../../pages/Home/components/LectureManagingDashboard';
import { PanelSubjectDetail } from '../../pages/Home/components/PanelSubjectDetail';
import { Policy } from '../../pages/Policy';
import { AboutUs } from '../../pages/AboutUs';

export const AppRouting = () => {
    return (
        <Routes>
            <Route path='/auth' element={<Auth />}>
                <Route path='' element={<SelectRole />} />
                <Route path='login' element={<SignIn />} />
            </Route>
            <Route path='/' element={<Home />}>
                <Route path='' element={<PanelPostsList />} />
                <Route path='create-post' element={<PanelCreatePost />} />
                <Route path='subject' element={<PanelSubject />} />
                <Route path='subject/detail' element={<PanelSubjectDetail />} />
                <Route path='notification' element={<PanelNotification />} />
                <Route path='profile' element={<PanelProfile />} />
                <Route path='profile/edit' element={<PanelEditProfile />} />
                <Route path='posts' element={<PanelViewPost />} />
                <Route path='admin' element={<LectureManaging />}>
                    <Route path='dashboard' element={<LectureManagingDashboard />} />
                    <Route path='student' element={<LectureManagingStudent />} />
                </Route>
            </Route>
            <Route path='/policy' element={<Policy />} />
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='*' element={<Error />} />
        </Routes>
    );
};

export default AppRouting;