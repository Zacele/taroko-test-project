'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Button from '../Button/Button';
import styles from './NewEditContactModal.module.css';
import TextField from '@mui/material/TextField';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postCreateContact, getContactById, updateContactById } from '@/api';
import { ContactPayload, GetContactByIdResponseType } from '@/interface';
import { useModal } from '@/context';

const NewContactModal: React.FC = () => {
  const { isOpen, closeModal, selectedId, isEdit } = useModal();
  const queryClient = useQueryClient();

  const { data: contactData, isLoading } = useQuery<
    GetContactByIdResponseType,
    Error
  >({
    queryKey: ['contact', selectedId],
    queryFn: () => getContactById(selectedId as number),
    enabled: isEdit && selectedId !== null,
  });

  const { register, handleSubmit, reset, setValue } = useForm<ContactPayload>();
  const { mutate: createContact } = useMutation<any, Error, ContactPayload>({
    mutationFn: postCreateContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      handleClose();
    },
    onError: (error) => console.error('Error:', error),
  });

  useEffect(() => {
    if (contactData) {
      setValue('first_name', isEdit ? contactData.data.first_name : '');
      setValue('last_name', isEdit ? contactData.data.last_name : '');
      setValue('job', isEdit ? contactData.data.job : '');
      setValue('description', isEdit ? contactData.data.description : '');
    }
  }, [contactData, isEdit]);

  const { mutate: updateContact } = useMutation<
    any,
    Error,
    { id: number; contact: ContactPayload }
  >({
    mutationFn: updateContactById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      handleClose();
    },
    onError: (error) => console.error('Error:', error),
  });

  React.useEffect(() => {
    if (contactData) {
      reset(contactData.data);
    }
  }, [contactData]);

  const handleClose = () => {
    closeModal();
    reset();
  };

  const onSubmit = (data: ContactPayload) => {
    if (isEdit) {
      updateContact({ id: selectedId as number, contact: data });
      return;
    }
    createContact(data);
  };

  return (
    <React.Fragment>
      <Modal
        open={isOpen}
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
