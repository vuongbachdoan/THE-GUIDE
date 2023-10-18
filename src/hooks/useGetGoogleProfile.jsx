import { Auth } from 'aws-amplify';
import React from 'react';

const useGetGoogleProfile = () => {
    const [userProfile, setUserProfile] = React.useState(null);

    React.useEffect(() => {
        getUserProfile()
            .then((res) => {
                setUserProfile(res?.attributes)
            })
    }, [])

    const getUserProfile = async () => {
        try {
            return await Auth.currentAuthenticatedUser()
        } catch (error) {
            return null;
        }
    }

    return { userProfile };
}

export default useGetGoogleProfile;