import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getUsers, getUsersFail} from "../../store/actions/usersActions";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import UsersTable from "./usersTable/usersTable";

const Users = () => {
    const dispatch = useDispatch();
    const {token, error} = useSelector((state) => ({
        ...state.authReducer
    }));

    const {users} = useSelector((state) => ({
        ...state.usersReducer
    }));

    useEffect(() => {
        dispatch(getUsers(token));
    }, []);

    const updateUser = (updatedUser) => {
        console.log('[Users] updatedUser: ', updatedUser);

        // TODO fix update all
        // let updatedUsers = [...users];
        // const userIndex = updatedUsers.findIndex(user => user.id === updatedUser.id);
        // updatedUsers[userIndex] = updatedUser;
        // dispatch(getUsersSuccess(updatedUsers));
    };

    let usersBlock;
    if (!users) {
        usersBlock = <CircularProgress size={100}/>
    } else {
        usersBlock = <UsersTable users={users}
                                 handleUpdatedUser={(user) => updateUser(user)}
        />
    }

    return (
        <div>
            {usersBlock}
            <Snackbar open={!!error}
                      autoHideDuration={2000}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                      onClose={() => dispatch(getUsersFail(''))}
                      message={error}/>
        </div>

    );
};

export default Users;
