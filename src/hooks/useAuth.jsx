import { Auth, Hub } from 'aws-amplify';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, getUsers } from '../core/services/user';
import { useDispatch } from 'react-redux';
import { setProfileData } from '../core/store/user/profileData';
import { checkMailLecture } from '../helper/checkMail';
import { extractCode } from '../helper/extractCode';

const useAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(true);

    async function getUserData() {
        try {
            Auth.currentAuthenticatedUser()
                .then(
                    async (profile) => {
                        const users = await getUsers();

                        let existedUser = null;
                        users.forEach(user => {
                            if (user.id === profile.username) existedUser = user;
                        });

                        if (existedUser) {
                            dispatch(setProfileData(existedUser))
                        } else {
                            const createdUser = await createUser({
                                id: profile.username,
                                username: profile.attributes.name ?? 'user',
                                email: profile.attributes.email ?? '',
                                avatar: profile.attributes.picture ?? '',
                                github: '',
                                linkedin: '',
                                website: '',
                                phone: '',
                                subjects: [],
                                userCode: extractCode(profile.attributes.email),
                                role: checkMailLecture(profile.attributes.email) ? 'Lecture' : 'Student'
                            })
                            dispatch(setProfileData(createdUser));
                        }
                    })
                .catch((err) => {
                    console.error(err)
                    navigate('/auth/login')
                })
            setLoading(false);
        } catch (err) {
            setLoading(false);
            navigate('/auth/login')
        }
    }

    React.useEffect(() => {
        try {
            Hub.listen('auth', ({ payload }) => {
                if (payload.event === 'signIn') {
                    return getUserData();
                }
                if (payload.event === 'signOut') {
                    dispatch(setProfileData(null))
                    return setLoading(false);
                }
            });
            getUserData();
        } catch (err) {
            navigate('/auth/login')
        }
    }, []);
}

export default useAuth;