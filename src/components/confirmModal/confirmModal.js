import React from 'react';
import PropTypes from 'prop-types';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const ConfirmModal = (props) => {
    return (
        <Dialog
            open={props.open}
            onClose={() => props.handleClose(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {props.message}
            </DialogTitle>
            <DialogActions>
                <Button onClick={() => props.handleClose(false)}
                        variant="contained"
                        color="primary">
                    Cancel
                </Button>
                <Button onClick={() => props.handleClose(true)}
                        variant="contained"
                        color="secondary">
                    {props.confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ConfirmModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    message: PropTypes.string,
    confirmButtonText: PropTypes.string
};

export default ConfirmModal;
