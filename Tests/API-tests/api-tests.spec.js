const { test, expect, request } = require('@playwright/test')

test.describe('API tests', () => {
  test('POST /contacts', async () => {
    const apiContext = await request.newContext()
    const newContact = {
      name: 'John Doe',
      company: 'SomeCompany LLC',
      email: 'john.doe@exmple.com',
      phone: '123-456-7890',
      favorite: false,
    }
    const response = await apiContext.post(
      'http://localhost:5070/api/contacts',
      { data: newContact }
    )

    const createdContact = await response.json()
    expect(response.ok()).toBeTruthy()
    expect(createdContact.name).toBe(newContact.name)
    expect(createdContact.email).toBe(newContact.email)
    const id = createdContact.id
    await apiContext.delete(`http://localhost:5070/api/contacts/${id}`)
  })

  test('PUT /contacts/:id', async () => {
    // First, create a new contact to update
    const apiContext = await request.newContext()
    const newContact = {
      name: 'Jane Doe',
      company: 'AnotherCompany LLC',
      email: 'jane.doe@example.com',
      phone: '098-765-4321',
      favorite: false,
    }
    const updatedContact = {
      name: 'Doe Jane',
      company: 'SomeAnotherCompany LLC',
      email: 'doe.jane@example.com',
      phone: '098-765-2222',
      favorite: true,
    }
    const createContact = await apiContext.post(
      'http://localhost:5070/api/contacts',
      {
        data: newContact,
      }
    )
    expect(createContact.ok()).toBeTruthy()
    const createdContact = await createContact.json()
    const updateResponse = await apiContext.put(
      `http://localhost:5070/api/contacts/${createdContact.id}`,
      {
        data: updatedContact,
      }
    )
    const contact = await updateResponse.json()
    expect(contact.name).toBe(updatedContact.name)
    expect(contact.favorite).toBe(updatedContact.favorite)
    const cleanUp = await apiContext.delete(
      `http://localhost:5070/api/contacts/${createdContact.id}`
    )
  })

  test('GET /contacts', async () => {
    const apiContext = await request.newContext()
    const newContact = {
      name: 'John Doe',
      company: 'SomeCompany LLC',
      email: 'john.doe@exmple.com',
      phone: '123-456-7890',
      favorite: false,
    }
    const newContactRequest = await apiContext.post(
      'http://localhost:5070/api/contacts',
      {
        data: newContact,
      }
    )
    const responseNewContact = await newContactRequest.json()
    expect(newContactRequest.ok()).toBeTruthy()

    const getContact = await apiContext.get(
      'http://localhost:5070/api/contacts'
    )
    expect(getContact.ok()).toBeTruthy()

    const receivedContacts = await getContact.json()
    console.log('Results: ', receivedContacts)

    const createdContact = receivedContacts.find(
      (contact) => contact.id === responseNewContact.id
    )
    expect(createdContact).toBeDefined()
    expect(createdContact.name).toBe(newContact.name)
    expect(createdContact.email).toBe(newContact.email)

    const cleanUp = await apiContext.delete(
      `http://localhost:5070/api/contacts/${responseNewContact.id}`
    )
    expect(cleanUp.ok()).toBeTruthy()
  })
})
