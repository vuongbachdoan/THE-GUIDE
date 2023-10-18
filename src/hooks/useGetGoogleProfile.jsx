import { Auth } from 'aws-amplify';
import React from 'react';

const useGetGoogleProfile = () => {
    const [userProfile, setUserProfile] = React.useState(null);

    React.useEffect(() => {
        getUserProfile()
            .then((res) => {
                setUserProfile(res.attributes)
            })
    }, [])

    const getUserProfile = async () => {
        return await Auth.currentAuthenticatedUser()
    }

    return { userProfile };
}

export default useGetGoogleProfile;