import { ContactType } from '@/interface';

function searchByName(contacts: ContactType[], query: string): ContactType[] {
  const lowerCaseQuery = query.toLowerCase();
  const results = contacts.filter((contact) => {
    const fullName = `${contact.first_name} ${contact.last_name}`.toLowerCase();
    return fullName.includes(lowerCaseQuery);
  });

  return results;
}

function debounce<T extends any[]>(func: (...args: T) => void, wait: number) {
  let timeout: NodeJS.Timeout;

  return function (...args: T) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export { searchByName, debounce };
