import {
  ContactPayload,
  CreateContactResponseType,
  GetContactsResponseType,
  GetContactByIdResponseType,
} from '@/interface';
import axiosInstance from './axios.instance';

const getContacts = async (): Promise<GetContactsResponseType> => {
  try {
    const { data } = await axiosInstance.get('api/contacts');
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const getContactById = async (
  id: number,
): Promise<GetContactByIdResponseType> => {
  try {
    const { data } = await axiosInstance.get(`api/contacts/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const postCreateContact = async (
  contact: ContactPayload,
): Promise<CreateContactResponseType> => {
  try {
    const { data } = await axiosInstance.post('api/contacts', {
      contact: { ...contact },
    });
    return data;
  } catch (error) {
    console.error('Error adding data:', error);
    throw error;
  }
};

const updateContactById = async ({
  id,
  contact,
}: {
  id: number;
  contact: ContactPayload;
}): Promise<CreateContactResponseType> => {
  try {
    const { data } = await axiosInstance.patch(`api/contacts/${id}`, {
      info: { ...contact },
    });
    return data;
  } catch (error) {
    console.error('Error adding data:', error);
    throw error;
  }
};

const deleteContactById = async (
  id: number,
): Promise<CreateContactResponseType> => {
  try {
    const { data } = await axiosInstance.delete(`api/contacts/${id}`);
    return data;
  } catch (error) {
    console.error('Error adding data:', error);
    throw error;
  }
};

export {
  getContacts,
  postCreateContact,
  getContactById,
  updateContactById,
  deleteContactById,
};
