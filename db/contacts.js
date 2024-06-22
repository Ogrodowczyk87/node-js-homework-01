const fs = require('fs/promises');
 const { nanoid } = require('nanoid');
const path = require('path');


const contactsPath = path.resolve('db', 'contacts.json');
// async function writeContacts(contacts) {
//   await fs.writeFile(contactsPath, JSON.stringify(contacts));
//   return;
// }

const listContacts = async () => {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
};

const getContactById = async (contactId) => {
    const res = await listContacts();
    const data = res.filter(item => item.id === contactId);
    return data || null;
}

const removeContact = async (contactId) => {
    const res = await listContacts();
    const contactIndex = res.findIndex(item => item.id === contactId);
    if (contactIndex === -1) {
        return null;
    }
    const [result] = res.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(res, null, 2));
    return result;

}

const addContact = async ({ name, email, phone }) => {
    const res = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    }
    res.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(res, null, 2));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};