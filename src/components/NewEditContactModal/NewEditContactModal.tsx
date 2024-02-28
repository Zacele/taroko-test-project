'use client';
import React from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '../Button/Button';
import styles from './NewEditContactModal.module.css';
import TextField from '@mui/material/TextField';

const NewContactModal: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const openModal = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <React.Fragment>
      <Button onClick={openModal}>Add new contact</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.modalContainer}>
          <h2 id="modal-modal-title">Contact Details</h2>
          <div className={styles.form}>
            <TextField
              required
              label="First Name"
              variant="outlined"
              name="first_name"
              className={styles.textField}
            />
            <TextField
              required
              label="Last Name"
              variant="outlined"
              name="last_name"
              className={styles.textField}
            />
            <TextField
              required
              label="Job"
              variant="outlined"
              name="job"
              className={styles.textField}
            />
            <TextField
              label="Description"
              variant="outlined"
              name="description"
              multiline
              rows={4}
              className={styles.textField}
            />
            <div className={styles.buttonGroup}>
              <Button variant="danger" fluid onClick={handleClose}>
                Cancel
              </Button>
              <Button fluid type="submit">
                Save
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default NewContactModal;
