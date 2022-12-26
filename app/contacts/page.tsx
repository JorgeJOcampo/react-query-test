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
  const [name, setName] = useState<string>('');

  const query = useQuery<Contact[]>('contacts', getContacts)

  const {data: contacts, isLoading, isError} = query;

  const mutation = useMutation(addContact, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('contacts')
    },
  })

  const updateMutation = useMutation(updateContactName, {
    onSuccess: (data) => {
      // console.log('data', data)
      // const a = queryClient.getQueryData(['contacts', {id: data.id}])
      // console.log('a', a)
      // queryClient.setQueryData(['contacts', {id: data.id}], data)
      queryClient.invalidateQueries('contacts')
    },
    onError: (e) => console.error(e),
    onSettled: (data, error, variables, context) => console.log('This log works from success or error')
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

  const handleUpdate = (contact: Contact) => {
    updateMutation.mutate(contact)
  }

  if(isLoading){
    <div>Loading...</div>
  }

  if(mutation.isLoading){
    <div>Creating Contact...</div>
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
            <div key={contact.id}>
              <li key={contact.name}>{contact.name} ({contact.email})</li>
              <input onChange={event => setName(event.target.value)}/>
              <button onClick={()=> handleUpdate({...contact, name})}>Edit</button>
            </div>
          ))}
        </ul>
      </div>
  );
}

const getContacts = (): Promise<Contact[]> => fetch('/api/contacts')
  .then(data => data.json())

const addContact = (contact: ContactForm): Promise<Contact> => fetch('/api/contacts', {
  method: 'post',
  body: JSON.stringify(contact),
  headers: {'Content-Type': 'application/json'}
}).then(data => data.json())

const updateContactName = (contact: Contact): Promise<Contact> => fetch('/api/contacts/' + contact.id, {
  method: 'put',
  body: JSON.stringify(contact),
  headers: {'Content-Type': 'application/json'}
}).then(data => data.json())

export default Contacts;
