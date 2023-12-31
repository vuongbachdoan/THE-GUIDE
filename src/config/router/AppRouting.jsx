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
import { PanelPostDetail } from '../../pages/Home/components/PanelPostDetail';
import { PanelEditPost } from '../../pages/Home/components/PanelEditPost';
import { Livestream } from '../../pages/Livestream';
import { LivestreamViewerJoin } from '../../pages/Livestream/components/LivestreamViewerJoin';
import { HostPlayer } from '../../pages/Livestream/components/HostPlayer';
import { Event } from '../../pages/Event';
import { EventView } from '../../pages/Event/components/EventView';
import { EventCreate } from '../../pages/Event/components/EventCreate';

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
                <Route path='subject/detail/:subjectId' element={<PanelSubjectDetail />} />
                <Route path='notification' element={<PanelNotification />} />
                <Route path='profile' element={<PanelProfile />} />
                <Route path='profile/edit' element={<PanelEditProfile />} />
                <Route path='posts' element={<PanelViewPost />} />
                <Route path='posts/detail/:postId' element={<PanelPostDetail />} />
                <Route path='posts/edit/:postId' element={<PanelEditPost />} />
                <Route path='admin' element={<LectureManaging />}>
                    <Route path='dashboard' element={<LectureManagingDashboard />} />
                    <Route path='student' element={<LectureManagingStudent />} />
                </Route>
            </Route>
            <Route path='/policy' element={<Policy />} />
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/livestream' element={< Livestream />} >
                <Route path='view' element={< LivestreamViewerJoin />} />
                <Route path='host' element={< HostPlayer />} />
            </Route>
            <Route path='/event' element={<Event />}>
                <Route path='' element={<EventView />} />
                <Route path='create' element={<EventCreate />} />
            </Route>
            <Route path='*' element={<Error />} />
        </Routes>
    );
};

export default AppRouting;