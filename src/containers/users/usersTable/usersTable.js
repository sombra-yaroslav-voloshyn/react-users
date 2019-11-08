import React, {useState} from 'react';
import Paper from "@material-ui/core/Paper";
import './usersTable.scss';
import MaterialTable from 'material-table'
import {useDispatch, useSelector} from "react-redux";
import {deleteUser, postUser, putUser, requestUserFail} from "../../../store/actions/userActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import AddEditUserModal from "../addEditUserModal/addEditUserModal";
import PropTypes from 'prop-types';
import ConfirmModal from "../../../components/confirmModal/confirmModal";

const UsersTable = (props) => {
    const dispatch = useDispatch();
    const emptyUser = {
        id: null,
        email: '',
        firstName: '',
        lastName: '',
        deleted: null,
    };

    const [openModal, setOpenModal] = useState(false);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(emptyUser);
    const [isUpdate, setIsUpdate] = useState(true);

    const {token} = useSelector((state) => ({
        ...state.authReducer
    }));

    const {loading, error} = useSelector((state) => ({
        ...state.userReducer
    }));

    const editUserHandler = (event = null, rowData) => {
        setCurrentUser(rowData);
        setIsUpdate(true);
        setOpenModal(true);
    };

    const addUserHandler = () => {
        setCurrentUser(emptyUser);
        setIsUpdate(false);
        setOpenModal(true);
    };

    const deleteUserHandler = (deletedUser) => {
        setCurrentUser(deletedUser);
        setOpenConfirmModal(true);
    };

    const handleCloseModal = (userFromModal) => {
        setOpenModal(false);
        if (userFromModal) {
            if (isUpdate) {
                dispatch(putUser(token, userFromModal.key, userFromModal))
            } else {
                const newUser = {...userFromModal};
                newUser.id = Math.floor(Math.random() * 999999);
                dispatch(postUser(token, newUser));
            }
        }
    };

    const handleCloseConfirmModal = (isAccepted) => {
        setOpenConfirmModal(false);
        if (isAccepted) {
            dispatch(deleteUser(token, currentUser.key));
        }
    };

    let table;
    if (loading) {
        table = <CircularProgress size={100}/>
    } else {
        table = <MaterialTable
            title="Manage Users"
            columns={[
                {title: 'Id', field: 'id'},
                {title: 'Email', field: 'email'},
                {title: 'First Name', field: 'firstName'},
                {title: 'Last Name', field: 'lastName'},
            ]}
            data={props.users}
            actions={[
                {
                    icon: 'delete',
                    tooltip: 'Delete User',
                    onClick: (event, rowData) => deleteUserHandler(rowData)
                },
                {
                    icon: 'edit',
                    tooltip: 'Edit User',
                    onClick: (event, rowData) => editUserHandler(null, rowData)
                },
                {
                    icon: 'add',
                    tooltip: 'Add User',
                    isFreeAction: true,
                    onClick: () => addUserHandler()
                }
            ]}
            options={{
                actionsColumnIndex: -1,
                sorting: true,
                pageSizeOptions: [5, 10]
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
            <AddEditUserModal initialUser={currentUser}
                              open={openModal}
                              isUpdate={isUpdate}
                              handleClose={(user = null) => handleCloseModal(user)}
            />
            <ConfirmModal open={openConfirmModal}
                          message={`Are you sure you want to delete ${currentUser.firstName} ${currentUser.lastName}?`}
                          confirmButtonText="Delete"
                          handleClose={(isAccepted) => handleCloseConfirmModal(isAccepted)}
            />
        </div>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array
};

export default UsersTable;
