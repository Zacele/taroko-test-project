'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Button from '../Button/Button';
import styles from './NewEditContactModal.module.css';
import TextField from '@mui/material/TextField';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postCreateContact } from '@/api';
import { ContactPayload } from '@/interface';

const NewContactModal: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<ContactPayload>();
  const { mutate: createContact } = useMutation<any, Error, ContactPayload>({
    mutationFn: postCreateContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      handleClose();
    },
    onError: (error) => console.error('Error:', error),
  });

  const openModal = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (data: ContactPayload) => createContact(data);

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
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              required
              autoComplete="off"
              label="First Name"
              variant="outlined"
              className={styles.textField}
              {...register('first_name')}
            />
            <TextField
              autoComplete="off"
              label="Last Name"
              variant="outlined"
              className={styles.textField}
              {...register('last_name')}
            />
            <TextField
              required
              autoComplete="off"
              label="Job"
              variant="outlined"
              className={styles.textField}
              {...register('job')}
            />
            <TextField
              label="Description"
              variant="outlined"
              multiline
              autoComplete="off"
              required
              rows={3}
              {...register('description')}
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
          </form>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default NewContactModal;
