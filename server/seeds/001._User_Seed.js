
exports.seed = knex => {
  const users = [
    { username: 'sebi123', first_name: 'A', last_name: 'AA', password: '$2b$10$rmiFymi5sFuvhKHGrWXJNuYv/udozDLiz6AV08Ubh/7eYg7A4dp2a', 
      email: 'az@az.com', activate_or_reset_pass_key: '75442486-0878-440c-9db1-a7006c25a39f', company: 'Microsoft', verified: 1,

      address: 'Street 1, Cph', 
      postal_code: '2100',
      city: 'Copenhagen', 
      country: 'Denmark', 
    },
    { username: 'poweruser', first_name: 'B', last_name: 'BB', password: '$2b$10$rmiFymi5sFuvhKHGrWXJNuYv/udozDLiz6AV08Ubh/7eYg7A4dp2a', 
      email: 'az1@az1.com', activate_or_reset_pass_key: '75442486-0878-441c-9db1-a7006c25a39f', company: 'Google', verified: 1,

      address: 'Street 11, Cph', 
      postal_code: '2200',
      city: 'Copenhagen', 
      country: 'Denmark', 
    },
  ];
  // Deletes ALL existing entries
  return knex('addresses').del()
    .then(() => {
      return knex('users').del();
    })
    .then(() => {
      // Taking only the attributes which we need using obj destructuring and sprea operator
      const usersData = users.map(({ address, postal_code, city, country, ...userAttributes }) => userAttributes);  
      // Inserts seed entries
      return knex('users').insert(usersData);
    }).then(data => {
      return knex('addresses').insert(users.map(({ username, first_name, last_name, password, email, activate_or_reset_pass_key, company, verified, ...addressData }, index) => {
        return { user_id: data[0] + index, ...addressData };
      }));
    });
};
