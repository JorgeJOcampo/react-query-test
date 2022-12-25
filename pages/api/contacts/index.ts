import {getContacts, addContact, updateContact, deleteContact} from '../../../services/contacts';
import { NextApiRequest, NextApiResponse } from 'next';

// Define the Contact interface
interface Contact {
  id: string,
  name: string,
  email: string,
  phone: string
}

// Function to handle GET requests
const handleGet = (req: NextApiRequest, res: NextApiResponse) => {
  // Check if the request has an ID parameter
    // Find the contact with the given ID
    const contacts = getContacts();
    res.status(200).json(contacts);
}

// Function to handle PUT requests
const handlePost = (req: NextApiRequest, res: NextApiResponse) => {
  // Update a contact
  const id = (getContacts().length + 1).toString();
  const {name, email, phone} = req.body;
  console.log('name', name);
  const newContact = addContact(id, name, email, phone);
  console.log('new contact', newContact);
  // Return the updated contact
  res.status(200).json(newContact);
}

// Function to handle DELETE requests
const handleDelete = (req: NextApiRequest, res: NextApiResponse) => {
  // Delete a contact
  const {id} = req.query;
  const deletedContact = deleteContact(id);
  // Return the deleted contact
  res.status(200).json(deletedContact);
}

// Function to handle invalid HTTP methods
const handleInvalidMethod = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      handleGet(req, res);
      break;
    case 'POST':
      handlePost(req, res);
      break;
    case 'DELETE':
      handleDelete(req, res);
      break;
    default:
      handleInvalidMethod(req, res);
  }
}
