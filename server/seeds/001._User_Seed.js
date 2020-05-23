
exports.seed = knex => {
  const users = [
    { 
      first_name: 'Antonel', 
      last_name: 'Costescu', 
      email: 'antonel.costescu@gmail.com', 
      password: '$2b$10$rmiFymi5sFuvhKHGrWXJNuYv/udozDLiz6AV08Ubh/7eYg7A4dp2a', 
      activate_or_reset_pass_key: '75442486-0878-440c-9db1-a7006c25a39f', 
      verified: 1,
      birthdate: '1996-01-16'
    },
    { 
      first_name: 'Johnny', 
      last_name: 'Bravo', 
      password: '$2b$10$rmiFymi5sFuvhKHGrWXJNuYv/udozDLiz6AV08Ubh/7eYg7A4dp2a', 
      email: 'joo.bravo@gmail.com',
      activate_or_reset_pass_key: '75442486-0878-441c-9db1-a7006c25a39f', 
      verified: 1,
      birthdate: '1990-06-25'
    },
  ];

  const properties = [
    { 
      title: 'Beautiful 4 rooms studio', 
      description: "description for - Beautiful 4 rooms studio There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      available_start: '2019-04-11', 
      available_end: '2022-04-11', 
      price: 999, 
      capacity: 4, 
      type: 'Entire place', 
      rooms: 3,
      beds: 3,
      bathrooms: 2,
      address: '{"property_address":"mjolnerparken 108, 1. 3","city":"berlin","country":"germany","postal_code":"2300"}',
      photos: '["default.jpeg","default1.jpeg"]',
      user_id: 1
    },
    { 
      title: 'Beautiful 5 rooms studio', 
      description: "description for - Beautiful 5 rooms studio There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      available_start: '2020-06-11', 
      available_end: '2020-07-11', 
      price: 399, 
      capacity: 4, 
      type: 'Entire place', 
      rooms: 3,
      beds: 3,
      bathrooms: 2,
      address: '{"property_address":"mjolnerparken 108, 1. 3","city":"berlin","country":"germany","postal_code":"2300"}',
      photos: '["default.jpeg","default1.jpeg"]',
      user_id: 1
    },
    { 
      title: 'Beautiful 3 rooms studio', 
      description: "description for - Beautiful 3 rooms studioThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      available_start: '2020-06-11', 
      available_end: '2020-07-11', 
      price: 399, 
      capacity: 4, 
      type: 'Studio', 
      rooms: 3,
      beds: 3,
      bathrooms: 2,
      address: '{"property_address":"mjolnerparken 108, 1. 3","city":"copenhagen","country":"denmark","postal_code":"2300"}',
      photos: '["default.jpeg","default1.jpeg"]',
      user_id: 1
    },
    { 
      title: 'Room in 6 room apartment', 
      description: "description for - Room in 6 room apartment There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      available_start: '2020-04-11', 
      available_end: '2021-04-11', 
      price: 799, 
      capacity: 8, 
      type: 'Entire place', 
      rooms: 6,
      beds: 6,
      bathrooms: 3,
      address: '{"property_address":"amagerbrogade 172, 1. 3","city":"copenhagen","country":"denmark","postal_code":"2300"}',
      photos: '["default.jpeg","default1.jpeg"]',
      user_id: 1
    },
    { 
      title: 'Penthouse in the heart of New York', 
      description: "description for - Penthouse in the heart of New York There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      available_start: '2020-07-01', 
      available_end: '2021-08-11', 
      capacity: 2, 
      price: 1899,
      type: 'Entire place', 
      rooms: 5,
      beds: 5,
      bathrooms: 2,
      address: '{"property_address":"15 avenue road","city":"new york","country":"usa","postal_code":"2200"}',
      photos: '["default.jpeg","default1.jpeg"]',
      user_id: 2
    },
  ];

  const facilities = [
    { 
      facilities_list: '[{"name":"WiFi","icon":"wifi"},{"name":"Kitchen","icon":"utensils"},{"name":"Parking","icon":"parking"}]',
      property_id: 1
    },
    { 
      facilities_list: '[{"name":"WiFi","icon":"wifi"},{"name":"Laundry","icon":"laundry.svg"},{"name":"Iron","icon":"iron.svg"}]',
      property_id: 2
    },
  ];

  const reservations = [
    { 
      from_date: '2020-07-11', 
      to_date: '2020-08-11', 
      persons_count: 3, 
      reserved_by: 1,
      property_id: 1
    },
    { 
      from_date: '2020-08-21', 
      to_date: '2020-08-29', 
      persons_count: 6, 
      reserved_by: 2,
      property_id: 5
    },
  ];

  // ====================== DELETE CURRENT ENTRIES AND ADD NEW DATA ======================
  return knex('reservations').del()
    .then(() => knex('facilities').del())
    .then(() => knex('properties').del())
    .then(() => knex('users').del())
    .then(() => knex('users').insert(users))
    .then(res => knex('properties').insert(properties))
    .then(res => knex('facilities').insert(facilities))
    .then(res => knex('reservations').insert(reservations))
};
