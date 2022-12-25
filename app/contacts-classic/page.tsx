'use client'
import React, {useEffect, useState} from 'react';
import { NextPage } from 'next';

interface Contact {
  id: string,
  name: string,
  email: string,
  phone: string
}

// Define the ContactForm interface
interface ContactForm {
  name: string,
  email: string,
  phone: string
}

// const Contacts: NextPage<{contacts: Contact[]}> = ({contacts}) => {
  const Contacts: NextPage = () => {
  const [form, setForm] = useState<ContactForm>({name: '', email: '', phone: ''});

  const [contacts, setContacts] = useState<Contact[]>([]);

  // Function to handle form submissions
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add a new contact
    console.log('form', JSON.stringify(form));
    fetch('/api/contacts',{
      method: 'post',
      body: JSON.stringify(form),
      headers: {'Content-Type': 'application/json'}
    })
    // Clear the form
    setForm({name: '', email: '', phone: ''});
  }

  // Function to handle input changes
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setForm({...form, [name]: value});
  }

  useEffect(() => {
    getContacts()
      .then(data => setContacts(data));
  }, []);

  return (
    <div>
      <h1>Contacts</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input type="phone" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <button type="submit">Add Contact</button>
      </form>
      <ul>
        {contacts.map(contact => (
          <li key={contact.name}>{contact.name} ({contact.email})</li>
        ))}
      </ul>
    </div>
  );
}

const getContacts = (): Promise<Contact[]> => fetch('/api/contacts')
  .then(data => data.json())

// Contacts.getInitialProps = async () => {
//   // Load the contacts from a file
//   const contacts = await fetch('/api/contacts');
//   return {contacts};
// }

export default Contacts;
