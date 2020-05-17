- [ ] What is the purpose of using _sessions_?

The purpose of using sessions is to create a connection from your application to the relational database. Once this connection is created it can be used to extract data from the database that will be displayed to the user.

- [ ] What does bcrypt do to help us store passwords in a secure manner.

Bcrypt has the ability to hash passwords, which will not store them in plain text providing a layer of security

- [ ] What does bcrypt do to slow down attackers?

Bcrypt hashes passwords in a manner that isn't bi-directional, so if they are able to access the contents of the database that doesn't mean they will be able to retrieve the contents of the password or whatever data inside of the database they would like to be hidden.

- [ ] What are the three parts of the JSON Web Token?

The three parts of the JSON web token are the payload, header, and signature. Payload is just the data being sent through JSON. The header includes the type of data being returned and the algorthim attached explaining how you can handle it. 