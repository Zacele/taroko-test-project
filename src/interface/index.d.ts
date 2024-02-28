export type ContactType = {
  id: number;
  last_name: string;
  first_name: string;
  job: string;
  description: string;
};

export type ContactPayload = Omit<ContactType, 'id'>;

export type CreateContactResponseType = {
  statusCode: number;
  message: string;
  data: ContactType;
};

export type GetContactsResponseType = {
  statusCode: number;
  message: string;
  data: ContactType[];
};

export type GetContactByIdResponseType = {
  statusCode: number;
  message: string;
  data: ContactType;
};

export interface ModalState {
  isOpen: boolean;
  isEdit: boolean;
  selectedId: number | null;
  openEditModal: (id: number) => void;
  openModal: () => void;
  closeModal: () => void;
}

export interface CardProps {
  name: string;
  job?: string;
  description?: string;
  isHighlighted?: boolean;
  onDelete?: () => void;
  id: number;
}
