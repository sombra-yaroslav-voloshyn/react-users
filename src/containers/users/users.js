import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getUsers, getUsersFail, getUsersSuccess} from "../../store/actions/usersActions";
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

    const {isNeedToUpdate} = useSelector((state) => ({
        ...state.userReducer
    }));

    useEffect(() => {
        if (isNeedToUpdate) {
            dispatch(getUsers(token));
        }

        return () => {
            dispatch(getUsersSuccess(null))
        }
    }, [isNeedToUpdate]);

    let usersBlock;
    if (!users) {
        usersBlock = <CircularProgress size={100}/>
    } else {
        usersBlock = <UsersTable users={users}
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
