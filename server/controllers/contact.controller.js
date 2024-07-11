
import Contact from '../models/contact.model.js';

// Create a new contact
export const createContact = async (req, res) => {
    const { firstName, lastName, phoneNumber } = req.body;

    try {
        const contact = new Contact({ firstName, lastName,phone : phoneNumber });
        await contact.save();
        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create contact', error: error.message });
    }
};

// Get all contacts
export const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts.map(elem => ({
            ...elem.toObject(),
            createdAt: elem.createdAt.toISOString().split('T')[0].replace(/-/g, '/'),
          })));
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch contacts', error: error.message });
    }
};

// Get a contact by ID
export const getContactById = async (req, res) => {
    const { id } = req.params;
    try {
        const contact = await Contact.findById(id);
        if (!contact) {
            return res.status(404).json({ message: `Contact not found with ID ${id}` });
        }
        res.json(contact);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch contact', error: error.message });
    }
};

// Delete all contacts
export const deleteAllContacts = async (req, res) => {
    try {
        const result = await Contact.deleteMany();
        res.json({ message: `Deleted ${result.deletedCount} contacts` });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete contacts', error: error.message });
    }
};

export const deleteContacts = async (req, res) => {
    const { contactIds } = req.body; 
    try {
      for (const contactId of contactIds) {
          await Contact.findByIdAndDelete(contactId);
      }
      res.status(200).json({ message: 'clients deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update client', error: error.message });
    }
  };
