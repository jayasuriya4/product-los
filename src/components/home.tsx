import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userDetails } from '../features/user/userSlice';

function Profile() {
    const user = useSelector((state: any) => state.user.userDetail);
    const dispatch = useDispatch();

    console.log(user)
    return (
        <div><p>profileCard</p>
        <button onClick={() => dispatch(userDetails())}> Update User</button>
        </div>
    )
}

export default Profile
