import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getUsers, getUsersFail} from "../../store/actions/usersActions";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";

const Users = (props) => {
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

    let usersBlock;
    if (!users) {
        usersBlock = <CircularProgress size={100}/>
    } else {
        usersBlock = <h1>Users!</h1>
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
