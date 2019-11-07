import React, {useEffect} from 'react';
import Paper from "@material-ui/core/Paper";
import './usersTable.scss';
import MaterialTable from 'material-table'
import {useDispatch, useSelector} from "react-redux";
import {postUser, putUser, requestUserFail} from "../../../store/actions/userActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";

const UsersTable = (props) => {
    const dispatch = useDispatch();

    const {token} = useSelector((state) => ({
        ...state.authReducer
    }));

    const {user, loading, error} = useSelector((state) => ({
        ...state.userReducer
    }));

    useEffect(() => {
        if (user.firstName) {
            props.handleUpdatedUser(user);
        }
    }, [props, user]);

    const editUser = (event = null, rowData) => {
        const userIndex = props.users.findIndex(user => user.id === rowData.id);
        const user = {...props.users[userIndex]};
        user.firstName = 'Ivan';
        dispatch(putUser(token, userIndex, user))
    };

    const addUser = () => {
        const user = {
            deleted: false,
            firstName: `First Name${Math.floor(Math.random() * 100)}`,
            id: Math.floor(Math.random() * 999999),
            lastName: `Last Name Name${Math.floor(Math.random() * 100)}`,

        };
        dispatch(postUser(token, user));
    };

    let table;
    if (loading) {
        table = <CircularProgress size={100}/>
    } else {
        table = <MaterialTable
            title="Manage Users"
            columns={[
                {title: 'Id', field: 'id'},
                {title: 'First Name', field: 'firstName'},
                {title: 'Last Name', field: 'lastName'},
            ]}
            data={props.users}
            actions={[
                {
                    icon: 'delete',
                    tooltip: 'Delete User',
                    onClick: (event, rowData) => alert("You want to delete " + rowData.name)
                },
                {
                    icon: 'edit',
                    tooltip: 'Edit User',
                    onClick: (event, rowData) => editUser(null, rowData)
                },
                {
                    icon: 'add',
                    tooltip: 'Add User',
                    isFreeAction: true,
                    onClick: (event) => addUser()
                }
            ]}
            options={{
                actionsColumnIndex: -1,
                sorting: true
            }}
        />
    }

    return (
        <div className="UsersTable">
            <Paper>
                {table}
            </Paper>
            <Snackbar open={!!error}
                      autoHideDuration={2000}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                      onClose={() => dispatch(requestUserFail(''))}
                      message={error}/>
        </div>
    );
};

export default UsersTable;
