// Define the Contact interface
interface Contact {
    id: string,
    name: string,
    email: string,
    phone: string
  }
  
  // Initialize the contacts array
  let contacts: Contact[] = [
      {
          "id": "1",
          "name": "John Doe",
          "email": "johndoe@gmail.com",
          "phone": "123456789"
      }
  ]

  export const getContacts = () => {
    return contacts;
  }

  // Function to add a new contact
  export const addContact = (id: string, name: string, email: string, phone: string): Contact => {
    const newContact: Contact = {id, name, email, phone};
    contacts.push(newContact);
    return newContact;
  }
  
  // Function to get a contact by ID
  export const getContact = (id: string): Contact => {
    return contacts.find(contact => contact.id === id);
  }
  
  // Function to update a contact by ID
  export const updateContact = (id: string, name: string, email: string, phone: string): Contact => {
    const contact = contacts.find(contact => contact.id === id);
    if (!contact) return;
    if (name) contact.name = name;
    if (email) contact.email = email;
    if (phone) contact.phone = phone;
    return contact;
  }
  
  // Function to delete a contact by ID
  export const deleteContact = (id: string): Contact[] => {
    const index = contacts.findIndex(contact => contact.id === id);
    if (index !== -1) return contacts.splice(index, 1);
  }
  
  // Function to load the contacts from a file
  export const loadContacts = (): any => {
      return contacts;
  }