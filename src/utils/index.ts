import { ContactType } from '@/interface';

function searchByName(contacts: ContactType[], query: string): ContactType[] {
  const lowerCaseQuery = query.toLowerCase();
  console.log('contacts: ', contacts);

  const results = contacts.filter((contact) => {
    const fullName = `${contact.first_name} ${contact.last_name}`.toLowerCase();
    return fullName.includes(lowerCaseQuery);
  });

  return results;
}

export { searchByName };
