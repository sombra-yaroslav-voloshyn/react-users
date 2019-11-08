import React, {useEffect, useState} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import './addEditUserModal.scss';
import PropTypes from 'prop-types';

const AddEditUserModal = (props) => {

    const [userForm, setUserForm] = useState({
        user: {},
        firstNameTouched: false,
        lastNameTouched: false
    });


    useEffect(() => {
        setUserForm({...userForm, user: props.initialUser})
    }, [props]);

    return (
        <Dialog open={props.open}
                className="AddEditUserModal"
                onClose={() => props.handleClose()}
                aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                {props.initialUser.firstName ? `Edit ${props.initialUser.firstName} ${props.initialUser.lastName}` : 'Create new user'}
            </DialogTitle>
            <DialogContent>
                <ValidatorForm onSubmit={() => props.handleClose(userForm.user)}>
                    <TextValidator
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={userForm.user.email}
                        autoComplete="email"
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'email is not valid']}
                        onChange={(event) => setUserForm({...userForm, user: {...userForm.user, email: event.target.value}})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="firstName"
                        label="First Name"
                        type="text"
                        id="firstName"
                        value={userForm.user.firstName}
                        error={userForm.firstNameTouched && userForm.user.firstName.length < 1}
                        helperText={userForm.firstNameTouched && userForm.user.firstName.length < 1 ? 'First Name is required' : ' '}
                        onChange={(event) => {
                            setUserForm({...userForm, firstNameTouched: true, user: {...userForm.user, firstName: event.target.value}})
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="lastName"
                        label="Last Name"
                        type="text"
                        id="lastName"
                        value={userForm.user.lastName}
                        error={userForm.lastNameTouched && userForm.user.lastName.length < 1}
                        helperText={userForm.lastNameTouched && userForm.user.lastName.length < 1 ? 'Last Name is required' : ' '}
                        onChange={(event) => {
                            setUserForm({...userForm, lastNameTouched: true, user: {...userForm.user, lastName: event.target.value}})
                        }}
                    />
                    <div className="modalActions">
                        <Button onClick={() => props.handleClose()}
                                variant="contained"
                                color="secondary">
                            Cancel
                        </Button>&nbsp;
                        <Button type="submit"
                                variant="contained"
                                disabled={!userForm.user.lastName || !userForm.user.lastName || !userForm.user.email}
                                color="primary">
                            Submit
                        </Button>
                    </div>
                </ValidatorForm>
            </DialogContent>
            <DialogActions>

            </DialogActions>
        </Dialog>
    );
};

AddEditUserModal.propTypes = {
    initialUser: PropTypes.object,
    handleClose: PropTypes.func,
    open: PropTypes.bool
};

export default AddEditUserModal;
