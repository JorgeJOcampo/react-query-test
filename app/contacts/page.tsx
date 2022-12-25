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

const Contacts: NextPage<{contacts: Contact[]}> = ({contacts}) => {
  const [form, setForm] = useState<ContactForm>({name: '', email: '', phone: ''});

  // Function to handle form submissions
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add a new contact
    addContact(form.name, form.email, form.phone);
    // Clear the form
    setForm({name: '', email: '', phone: ''});
  }

  // Function to handle input changes
  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setForm({...form, [name]: value});
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
        {contacts.map(contact => (
          <li key={contact.name}>{contact.name} ({contact.email})</li>
        ))}
      </ul>
    </div>
  );
}

Contacts.getInitialProps = async () => {
  // Load the contacts from a file
  loadContacts();
  return {contacts};
}

export default Contacts;
