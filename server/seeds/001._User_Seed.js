
exports.seed = knex => {
  const users = [
    { 
      first_name: 'Antonel', 
      last_name: 'Costescu', 
      email: 'antonel.costescu@gmail.com', 
      password: '$2b$10$rmiFymi5sFuvhKHGrWXJNuYv/udozDLiz6AV08Ubh/7eYg7A4dp2a', 
      activate_or_reset_pass_key: '75442486-0878-440c-9db1-a7006c25a39f', 
      verified: 1,
      birthdate: '16/01/1996'
    },
    { 
      first_name: 'Johnny', 
      last_name: 'Bravo', 
      password: '$2b$10$rmiFymi5sFuvhKHGrWXJNuYv/udozDLiz6AV08Ubh/7eYg7A4dp2a', 
      email: 'joo.bravo@gmail.com',
      activate_or_reset_pass_key: '75442486-0878-441c-9db1-a7006c25a39f', 
      verified: 1,
      birthdate: '25/06/1990'
    },
  ];

  const properties = [
    { 
      title: 'Beautiful 4 rooms studio', 
      description: 'description for - Beautiful 4 rooms studio',
      available_start: '2019-04-11 23:16:44', 
      available_end: '2022-04-11 23:16:44', 
      price: 999, 
      capacity: 4, 
      type: 'Entire place', 
      rooms: 3,
      beds: 3,
      bathrooms: 2,
      address: '{"address":"Mjolnerparken 108, 1. 3","city":"Copenhagen","country":"Denmark","postal_code":"2300"}',
      photos: '["https://path-img-1", "https://path-img-2", "https://path-img-3"]',
      user_id: 1
    },
    { 
      title: 'Beautiful 5 rooms studio', 
      description: 'description for - Beautiful 5 rooms studio',
      available_start: '2019-06-11 23:16:44', 
      available_end: '2019-07-11 23:16:44', 
      price: 399, 
      capacity: 4, 
      type: 'Entire place', 
      rooms: 3,
      beds: 3,
      bathrooms: 2,
      address: '{"address":"Mjolnerparken 108, 1. 3","city":"Copenhagen","country":"Denmark","postal_code":"2300"}',
      photos: '["https://path-img-1", "https://path-img-2", "https://path-img-3"]',
      user_id: 1
    },
    { 
      title: 'Beautiful 3 rooms studio', 
      description: 'description for - Beautiful 3 rooms studio',
      available_start: '2020-06-11 23:16:44', 
      available_end: '2020-07-11 23:16:44', 
      price: 399, 
      capacity: 4, 
      type: 'Entire place', 
      rooms: 3,
      beds: 3,
      bathrooms: 2,
      address: '{"address":"Mjolnerparken 108, 1. 3","city":"Copenhagen","country":"Denmark","postal_code":"2300"}',
      photos: '["https://path-img-1", "https://path-img-2", "https://path-img-3"]',
      user_id: 1
    },
    { 
      title: 'Room in 2 room apartment', 
      description: 'description for - Room in 2 room apartment',
      available_start: '2020-04-11 23:16:44', 
      available_end: '2021-04-11 23:16:44', 
      price: 799, 
      capacity: 8, 
      type: 'Entire place', 
      rooms: 6,
      beds: 6,
      bathrooms: 3,
      address: '{"address":"Amagerbrogade 172, 1. 3","city":"Copenhagen","country":"Denmark","postal_code":"2300"}',
      photos: '["https://path-img-1", "https://path-img-2", "https://path-img-3"]',
      user_id: 1
    },
    { 
      title: 'Penthouse in the heart of Copenhagen', 
      description: 'description for - Penthouse in the heart of Copenhagen',
      available_start: '2020-07-11 23:16:44', 
      available_end: '2021-07-11 23:16:44', 
      capacity: 2, 
      price: 199,
      type: 'Shared room', 
      rooms: 1,
      beds: 2,
      bathrooms: 1,
      address: '{"address":"15 Avenue Road","city":"New York","country":"USA","postal_code":"2200"}',
      photos: '["https://path-img-1", "https://path-img-2", "https://path-img-3"]',
      user_id: 2
    },
  ];

  const facilities = [
    { 
      facilities_list: '["WiFi","Kitchen","Parking"]',
      property_id: 1
    },
    { 
      facilities_list: '["WiFi","Laundry","Iron"]',
      property_id: 2
    },
  ];

  // const addresses = [
  //   { 
  //     address: 'Mjolnerparken 108, 1. 3', 
  //     city: 'Copenhagen', 
  //     country: 'Denmark', 
  //     postal_code: '2300',
  //     property_id: 1
  //   },
  //   { 
  //     address: '15 Avenue Road', 
  //     city: 'New York', 
  //     country: 'USA', 
  //     postal_code: '2200',
  //     property_id: 2
  //   },
  // ];


  // ====================== DELETE CURRENT ENTRIES AND ADD NEW DATA ======================
  return knex('facilities').del()
    // .then(() => knex('addresses').del())
    .then(() => knex('properties').del())
    .then(() => knex('users').del())
    .then(() => knex('users').insert(users))
    .then(res => knex('properties').insert(properties))
    // .then(res => knex('addresses').insert(addresses))
    .then(res => knex('facilities').insert(facilities))
};
