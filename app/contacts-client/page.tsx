'use client'
import React, {useEffect, useState} from 'react';
import { NextPage } from 'next';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import { queryClient } from './queryClient';

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

  const query = useQuery<Contact[]>('contacts', getContacts)

  const contacts = query.data;

  const mutation = useMutation(addContact, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('contacts')
    },
  })

  // Function to handle form submissions
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(form);
    ;
  }

  // Function to handle input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setForm({...form, [name]: value});
  }

  if(!contacts?.length){
    <div>Loading...</div>
  }

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
          {contacts?.map(contact => (
            <li key={contact.name}>{contact.name} ({contact.email})</li>
          ))}
        </ul>
      </div>
  );
}

const getContacts = (): Promise<Contact[]> => fetch('/api/contacts')
  .then(data => data.json())

const addContact = (contact: ContactForm): Promise<Contact> => fetch('/api/contacts',{
  method: 'post',
  body: JSON.stringify(contact),
  headers: {'Content-Type': 'application/json'}
}).then(data => data.json())

// Contacts.getInitialProps = async () => {
//   // Load the contacts from a file
//   const contacts = await fetch('/api/contacts');
//   return {contacts};
// }

export default Contacts;
