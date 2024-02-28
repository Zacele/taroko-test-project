import {
  ContactPayload,
  CreateContactResponseType,
  GetContactsResponseType,
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

export { getContacts, postCreateContact };
