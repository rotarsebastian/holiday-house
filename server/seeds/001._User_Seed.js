
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
      first_name: 'Sebastian', 
      last_name: 'Rotar', 
      password: '$2b$10$rmiFymi5sFuvhKHGrWXJNuYv/udozDLiz6AV08Ubh/7eYg7A4dp2a', 
      email: 'sebi.rotar@gmail.com',
      activate_or_reset_pass_key: '75442486-0878-441c-9db1-a7006c25a39f', 
      verified: 1,
      birthdate: '1996-01-16'
    },
    { 
      first_name: 'Jonathan', 
      last_name: 'Bulow', 
      password: '$2b$10$rmiFymi5sFuvhKHGrWXJNuYv/udozDLiz6AV08Ubh/7eYg7A4dp2a', 
      email: 'jobu@gmail.com',
      activate_or_reset_pass_key: '75442486-0878-441c-9db1-a7006c25a39f', 
      verified: 1,
      birthdate: '1997-05-09'
    },
    { 
      first_name: 'Andreea', 
      last_name: 'Steriu', 
      password: '$2b$10$rmiFymi5sFuvhKHGrWXJNuYv/udozDLiz6AV08Ubh/7eYg7A4dp2a', 
      email: 'andreea.steriu@gmail.com',
      activate_or_reset_pass_key: '75442486-0878-441c-9db1-a7006c25a39f', 
      verified: 1,
      birthdate: '1995-11-16'
    },
    { 
      first_name: 'Diana', 
      last_name: 'Morariu', 
      password: '$2b$10$rmiFymi5sFuvhKHGrWXJNuYv/udozDLiz6AV08Ubh/7eYg7A4dp2a', 
      email: 'diamorariu@gmail.com',
      activate_or_reset_pass_key: '75442486-0878-441c-9db1-a7006c25a39f', 
      verified: 1,
      birthdate: '1998-06-03'
    },
  ];

  const properties = [
    { 
      title: 'Beautiful 1 room studio', 
      description: "The apartment is compact, but well-appointed and bright one-bedroom apartments with private bath, kitchen niche and French balcony. There are three different types (A, B and C) and this ad relates to type B. Type C is 33 m2 and has storage space in the apartment.",
      available_start: '2020-07-11', 
      available_end: '2022-09-11', 
      price: 999, 
      capacity: 2, 
      type: 'Entire place', 
      rooms: 1,
      beds: 1,
      bathrooms: 1,
      address: '{"property_address":"gammel Køge Landevej 40, 4. 432.","city":"valby","country":"denmark","postal_code":"2500"}',
      photos: '["property1-1.jpeg","property1-2.jpeg","property1-3.jpeg"]',
      coordinates: '[12.510823, 55.655835]',
      user_id: 1
    },
    { 
      title: 'Beautiful 1 room apartment', 
      description: "Amagerbanen 37 is located close to Amager Strandpark. It is one of the last properties in the area to be listed. Here you can live in green surroundings close to the beach and water and yet easily reach the city by metro. You will be able to rent a parking space in the basement, where there is also room for bicycles.",
      available_start: '2020-06-11', 
      available_end: '2020-10-11', 
      price: 1299, 
      capacity: 4, 
      type: 'Entire place', 
      rooms: 1,
      beds: 2,
      bathrooms: 1,
      address: '{"property_address":"ved Amagerbanen 37C, 4. tv.","city":"copenhagen","country":"denmark","postal_code":"2300"}',
      photos: '["property2-1.jpeg","property2-2.jpeg","property2-3.jpeg"]',
      coordinates: '[12.627332, 55.665454]',
      user_id: 1
    },
    { 
      title: 'Beautiful 3 rooms apartment', 
      description: "Bastion is an exciting building with a strong architectural identity, designed by award-winning Danielsen Architecture. The landscape of the community is drawn in as vertical gardens adorning the façade as well as in the large courtyard which offers everything from hiding places, cozy nooks, tall trees, small hills and meadows.",
      available_start: '2020-06-20', 
      available_end: '2022-07-11', 
      price: 1699, 
      capacity: 5, 
      type: 'Entire place', 
      rooms: 3,
      beds: 3,
      bathrooms: 1,
      address: '{"property_address":"richard Mortensens Vej 70C, st. tv.","city":"copenhagen","country":"denmark","postal_code":"2300"}',
      photos: '["property3-1.jpeg","property3-2.jpeg","property3-3.jpeg","property3-4.jpeg","property3-5.jpeg"]',
      coordinates: '[12.570226, 55.618328]',
      user_id: 1
    },
    { 
      title: 'Minimalistic 2 room apartment', 
      description: "The apartment has a simple and good floor plan. All apartments have a large kitchen-dining room, spacious bathroom with dryer-washing machine, separate shower and rooms that are withdrawn from the kitchen-dining room. The apartment is ideal for couples, families with children, singles or friends who want to live together. ",
      available_start: '2020-04-11', 
      available_end: '2021-09-30', 
      price: 999, 
      capacity: 3, 
      type: 'Entire place', 
      rooms: 2,
      beds: 2,
      bathrooms: 1,
      address: '{"property_address":"strada Lânii 23","city":"sibiu","country":"romania","postal_code":"550019"}',
      photos: '["property4-1.jpeg","property4-2.jpeg","property4-3.jpeg"]',
      coordinates: '[24.136457, 45.794139]',
      user_id: 2
    },
    { 
      title: 'Cozy 3 room apartment', 
      description: "The large kitchen area gives room for both unfolding in the kitchen, cozy in front of the TV and dinner parties in good company. The kitchen area is spacious, bright and with a natural division. In connection with the entrance you have the second bathroom of the residence. The home appears with everything in household appliances. ",
      available_start: '2020-09-01', 
      available_end: '2021-12-11', 
      capacity: 6, 
      price: 1599,
      type: 'Entire place', 
      rooms: 3,
      beds: 3,
      bathrooms: 1,
      address: '{"property_address":"strada Vasile Lupu 63","city":"cluj napoca","country":"romania","postal_code":"400000"}',
      photos: '["property5-1.jpeg","property5-2.jpeg","property5-3.jpeg","property5-4.jpeg"]',
      coordinates: '[23.614898, 46.767511]',
      user_id: 2
    },
    { 
      title: 'Cozy and spacious room', 
      description: "The apartment has a large, private roof terrace attached, where you can spend many wonderful hours in good company, or alone with a good book and a cup of coffee in the sun. ",
      available_start: '2020-09-01', 
      available_end: '2021-10-01', 
      capacity: 2, 
      price: 599,
      type: 'Private room', 
      rooms: 1,
      beds: 1,
      bathrooms: 1,
      address: '{"property_address":"strada Fildeșului 5","city":"bucuresti","country":"romania","postal_code":"031651"}',
      photos: '["property6-1.jpeg","property6-2.jpeg","property6-3.jpeg"]',
      coordinates: '[26.146226, 44.427215]',
      user_id: 2
    },
    { 
      title: 'Cozy room', 
      description: "The apartment contains a spacious entrance, toilet, bathroom (with washer and dryer), 2 good rooms with nice light. Furthermore, there is a large living room which is divided into two so that one can have a sofa group at one end and kitchen living room at the other end. The kitchen is equipped with a dishwasher and appliances. There are fantastic views of where you are in the apartment.",
      available_start: '2020-06-09', 
      available_end: '2021-12-01', 
      capacity: 1, 
      price: 399,
      type: 'Shared room', 
      rooms: 1,
      beds: 1,
      bathrooms: 1,
      address: '{"property_address":"carrer Antonio Maura 17","city":"castelló de la Plana","country":"spain","postal_code":"12001"}',
      photos: '["property7-1.jpeg","property7-2.jpeg","property7-3.jpeg"]',
      coordinates: '[-0.036899, 39.988049]',
      user_id: 3
    },
    { 
      title: '2 room studio', 
      description: "The homeis furnished with a combined kitchen and living room, one bathroom and one other room - and each has its own storage room in the basement. The home is shielded from traffic noise and are furnished with a quality that matches the attractive location by the water.",
      available_start: '2020-02-01', 
      available_end: '2020-05-31', 
      capacity: 3, 
      price: 799,
      type: 'Entire place', 
      rooms: 2,
      beds: 1,
      bathrooms: 1,
      address: '{"property_address":"carrer de Mallorca 294","city":"barcelona","country":"spain","postal_code":"08037"}',
      photos: '["property8-1.jpeg","property8-2.jpeg","property8-3.jpeg"]',
      coordinates: '[2.167148, 41.397334]',
      user_id: 3
    },
    { 
      title: 'Cozy and spacious studio', 
      description: "The apartment has its own balcony or closed garden. In the basement there is parking for both cars and bicycles, and there is a storage room for each apartment. In the immediate area there are schools, institutions, public transport, supermarkets and shops.",
      available_start: '2020-03-01', 
      available_end: '2021-11-30', 
      capacity: 4, 
      price: 899,
      type: 'Entire place', 
      rooms: 1,
      beds: 2,
      bathrooms: 1,
      address: '{"property_address":"calle de Viridiana 12","city":"madrid","country":"spain","postal_code":"28018"}',
      photos: '["property9-1.jpeg","property9-2.jpeg","property9-3.jpeg"]',
      coordinates: '[-3.655158, 40.381960]',
      user_id: 3
    },
    { 
      title: 'Modern 1 room apartment', 
      description: "The home is decorated modern and has a beautiful light from the large window areas. The dwelling has either south or east facing terrace as well as patio facing the courtyard. On the whole, you will find that you get a lot of room for the money.",
      available_start: '2020-01-02', 
      available_end: '2022-11-30', 
      capacity: 3, 
      price: 1099,
      type: 'Entire place', 
      rooms: 1,
      beds: 2,
      bathrooms: 1,
      address: '{"property_address":"heinkstraße 6","city":"leipzig","country":"germany","postal_code":"04347"}',
      photos: '["property10-1.jpeg","property10-2.jpeg","property10-3.jpeg","property10-4.jpeg"]',
      coordinates: '[-3.655158, 40.381960]',
      user_id: 4
    },
    { 
      title: 'Cozy room in a very beautiful cabin', 
      description: "The apartment has its own balcony or closed garden. In the basement there is parking for both cars and bicycles, and there is a storage room for each apartment. In the immediate area there are schools, institutions, public transport, supermarkets and shops.",
      available_start: '2020-12-01', 
      available_end: '2021-02-28', 
      capacity: 2, 
      price: 899,
      type: 'Private room', 
      rooms: 1,
      beds: 1,
      bathrooms: 2,
      address: '{"property_address":"nonnenstraße 2","city":"kirchseeon","country":"germany","postal_code":"85614"}',
      photos: '["property11-1.jpeg","property11-2.jpeg","property11-3.jpeg","property11-4.jpeg"]',
      coordinates: '[11.885534, 48.077341]',
      user_id: 4
    },
    { 
      title: 'Modern 2 room apartment', 
      description: "This oversized 2 room studio co-op apartment offers 9.5 ceilings, hardwood floors and is located on the lobby floor of a doorman building. This unit consists of a 127 X 109 eat-in kitchen, featuring an ample amount of natural light pouring in from the kitchen window that faces Shore Road. In addition, there is an abundance of white cabinets & plenty of counterspace.",
      available_start: '2020-05-01', 
      available_end: '2021-03-01', 
      capacity: 5, 
      price: 1299,
      type: 'Entire place', 
      rooms: 2,
      beds: 2,
      bathrooms: 1,
      address: '{"property_address":"gutzkowstraße 20","city":"frankfurt am Main","country":"germany","postal_code":"60594"}',
      photos: '["property12-1.jpeg","property12-2.jpeg","property12-3.jpeg","property12-4.jpeg","property12-5.jpeg"]',
      coordinates: '[8.684351, 50.102775]',
      user_id: 4
    },
    { 
      title: 'Cozy room in a 2 room apartment', 
      description: "Fit bit and fitness enthusiasts, This is a home for the active, healthy lifestyle. Layout is both vertical and unique. Panoramic views of Centerport Harbor from all levels of home.",
      available_start: '2020-08-01', 
      available_end: '2021-09-18', 
      capacity: 2, 
      price: 699,
      type: 'Shared room', 
      rooms: 1,
      beds: 1,
      bathrooms: 1,
      address: '{"property_address":"15 John St","city":"cambridge","country":"united Kingdom","postal_code":"8984"}',
      photos: '["property13-1.jpeg","property13-2.jpeg","property13-3.jpeg","property13-4.jpeg"]',
      coordinates: '[0.131311, 52.204978]',
      user_id: 5
    },
    { 
      title: '5 room house', 
      description: "A fantastic custom newly renovated 2 family home on over sized lot, centrally located on Staten Island. This home boasts large entry area with natural lighting, hardwood floors throughout, and pre-wired for security system and security cameras inside and out. Unit 1 on the first floor features gourmet eat-in-kitchen with granite counter tops, and stainless steel appliances, living room/dining room combo, 2 bedrooms and one 3/4 bathroom with access to a large full finished basement with w/d hook up and a 3/4 bathroom.",
      available_start: '2020-05-01', 
      available_end: '2021-03-01', 
      capacity: 10, 
      price: 2999,
      type: 'Entire place', 
      rooms: 5,
      beds: 5,
      bathrooms: 3,
      address: '{"property_address":"24 Clowes St","city":"manchester ","country":"united Kingdom","postal_code":"8989"}',
      photos: '["property14-1.jpeg","property14-2.jpeg","property14-3.jpeg","property14-4.jpeg"]',
      coordinates: '[-2.199541, 53.467258]',
      user_id: 5
    },
    { 
      title: 'Luxurious 3 room apartment', 
      description: "2 bedroom, 2.5 bathroom duplex situated on the third and fourth floor with gorgeous ocean views from the balcony. This building is one of the newer buildings in oceana complex. Only the second building from the ocean. The unit faces east. The first floor features 2 big bedrooms and 2 full bathrooms.",
      available_start: '2020-05-01', 
      available_end: '2022-05-01', 
      capacity: 5, 
      price: 2499,
      type: 'Entire place', 
      rooms: 3,
      beds: 2,
      bathrooms: 2,
      address: '{"property_address":"8 fenchurch Pl","city":"london","country":"united Kingdom","postal_code":"8984"}',
      photos: '["property15-1.jpeg","property15-2.jpeg","property15-3.jpeg","property15-4.jpeg","property15-5.jpeg"]',
      coordinates: '[-0.079194, 51.511766]',
      user_id: 5
    },
  ];

  const facilities = [
    { 
      facilities_list: '[{"name":"Essentials","icon":"essentials.svg"},{"name":"Air conditioning","icon":"air-conditioning.svg"},{"name":"WiFi","icon":"wifi.svg"},{"name":"Kitchen","icon":"kitchen.svg"},{"name":"Hair dryer","icon":"hair-dryer.svg"},{"name":"Closet/Drawers","icon":"closets.svg"},{"name":"Fireplace","icon":"fireplace.svg"},{"name":"Parking","icon":"parking.svg"}]',
      property_id: 1
    },
    { 
      facilities_list: '[{"name":"Essentials","icon":"essentials.svg"},{"name":"Closet/Drawers","icon":"closets.svg"},{"name":"Kitchen","icon":"kitchen.svg"},{"name":"Heat","icon":"heat.svg"},{"name":"WiFi","icon":"wifi.svg"},{"name":"Shampoo","icon":"shampoo.svg"},{"name":"Workspace","icon":"workspace.svg"},{"name":"Breakfast","icon":"breakfast.svg"},{"name":"TV","icon":"tv.svg"},{"name":"Iron","icon":"iron.svg"}]',
      property_id: 2
    },
    { 
      facilities_list: '[{"name":"Essentials","icon":"essentials.svg"},{"name":"Kid-Friendly","icon":"kid-friendly.svg"},{"name":"Air conditioning","icon":"air-conditioning.svg"},{"name":"Heat","icon":"heat.svg"},{"name":"WiFi","icon":"wifi.svg"},{"name":"Fireplace","icon":"fireplace.svg"},{"name":"Workspace","icon":"workspace.svg"},{"name":"Closet/Drawers","icon":"closets.svg"},{"name":"Parking","icon":"parking.svg"},{"name":"Iron","icon":"iron.svg"}]',
      property_id: 3
    },
    { 
      facilities_list: '[{"name":"WiFi","icon":"wifi.svg"},{"name":"Air conditioning","icon":"air-conditioning.svg"},{"name":"Parking","icon":"parking.svg"},{"name":"Hair dryer","icon":"hair-dryer.svg"},{"name":"TV","icon":"tv.svg"},{"name":"Hair dryer","icon":"hair-dryer.svg"},{"name":"Breakfast","icon":"breakfast.svg"},{"name":"Shampoo","icon":"shampoo.svg"}]',
      property_id: 4
    },
    { 
      facilities_list: '[{"name":"Essentials","icon":"essentials.svg"},{"name":"Kid-Friendly","icon":"kid-friendly.svg"},{"name":"Closet/Drawers","icon":"closets.svg"},{"name":"Kitchen","icon":"kitchen.svg"},{"name":"Shampoo","icon":"shampoo.svg"},{"name":"Heat","icon":"heat.svg"},{"name":"Fireplace","icon":"fireplace.svg"},{"name":"WiFi","icon":"wifi.svg"},{"name":"Workspace","icon":"workspace.svg"},{"name":"Iron","icon":"iron.svg"}]',
      property_id: 5
    },
    { 
      facilities_list: '[{"name":"WiFi","icon":"wifi.svg"},{"name":"Kitchen","icon":"kitchen.svg"},{"name":"Parking","icon":"parking.svg"},{"name":"Hair dryer","icon":"hair-dryer.svg"},{"name":"Workspace","icon":"workspace.svg"},{"name":"Air conditioning","icon":"air-conditioning.svg"},{"name":"Breakfast","icon":"breakfast.svg"},{"name":"TV","icon":"tv.svg"},{"name":"Iron","icon":"iron.svg"}]',
      property_id: 6
    },
    { 
      facilities_list: '[{"name":"Essentials","icon":"essentials.svg"},{"name":"Closet/Drawers","icon":"closets.svg"},{"name":"Parking","icon":"parking.svg"},{"name":"Shampoo","icon":"shampoo.svg"},{"name":"Air conditioning","icon":"air-conditioning.svg"},{"name":"TV","icon":"tv.svg"},{"name":"Heat","icon":"heat.svg"},{"name":"Breakfast","icon":"breakfast.svg"},{"name":"WiFi","icon":"wifi.svg"},{"name":"Iron","icon":"iron.svg"}]',
      property_id: 7
    },
    { 
      facilities_list: '[{"name":"Essentials","icon":"essentials.svg"},{"name":"Kid-Friendly","icon":"kid-friendly.svg"},{"name":"Closet/Drawers","icon":"closets.svg"},{"name":"Hair dryer","icon":"hair-dryer.svg"},{"name":"Parking","icon":"parking.svg"},{"name":"Heat","icon":"heat.svg"},{"name":"Fireplace","icon":"fireplace.svg"},{"name":"Workspace","icon":"workspace.svg"},{"name":"WiFi","icon":"wifi.svg"},{"name":"Iron","icon":"iron.svg"}]',
      property_id: 8
    },
    { 
      facilities_list: '[{"name":"Essentials","icon":"essentials.svg"},{"name":"Kitchen","icon":"kitchen.svg"},{"name":"Air conditioning","icon":"air-conditioning.svg"},{"name":"WiFi","icon":"wifi.svg"},{"name":"TV","icon":"tv.svg"},{"name":"Breakfast","icon":"breakfast.svg"},{"name":"Iron","icon":"iron.svg"}]',
      property_id: 9
    },
    { 
      facilities_list: '[{"name":"WiFi","icon":"wifi.svg"},{"name":"Kid-Friendly","icon":"kid-friendly.svg"},{"name":"Closet/Drawers","icon":"closets.svg"},{"name":"Parking","icon":"parking.svg"},{"name":"Shampoo","icon":"shampoo.svg"},{"name":"Heat","icon":"heat.svg"},{"name":"Workspace","icon":"workspace.svg"},{"name":"TV","icon":"tv.svg"},{"name":"Iron","icon":"iron.svg"}]',
      property_id: 10
    },
    { 
      facilities_list: '[{"name":"Essentials","icon":"essentials.svg"},{"name":"Kitchen","icon":"kitchen.svg"},{"name":"Air conditioning","icon":"air-conditioning.svg"},{"name":"Hair dryer","icon":"hair-dryer.svg"},{"name":"Heat","icon":"heat.svg"},{"name":"WiFi","icon":"wifi.svg"},{"name":"Fireplace","icon":"fireplace.svg"},{"name":"Iron","icon":"iron.svg"}]',
      property_id: 11
    },
    { 
      facilities_list: '[{"name":"WiFi","icon":"wifi.svg"},{"name":"Closet/Drawers","icon":"closets.svg"},{"name":"Parking","icon":"parking.svg"},{"name":"Air conditioning","icon":"air-conditioning.svg"},{"name":"Shampoo","icon":"shampoo.svg"},{"name":"Breakfast","icon":"breakfast.svg"},{"name":"Heat","icon":"heat.svg"},{"name":"Iron","icon":"iron.svg"}]',
      property_id: 12
    },
    { 
      facilities_list: '[{"name":"Essentials","icon":"essentials.svg"},{"name":"Kid-Friendly","icon":"kid-friendly.svg"},{"name":"Kitchen","icon":"kitchen.svg"},{"name":"Hair dryer","icon":"hair-dryer.svg"},{"name":"Parking","icon":"parking.svg"},{"name":"Workspace","icon":"workspace.svg"},{"name":"WiFi","icon":"wifi.svg"},{"name":"TV","icon":"tv.svg"},{"name":"Iron","icon":"iron.svg"}]',
      property_id: 13
    },
    { 
      facilities_list: '[{"name":"Essentials","icon":"essentials.svg"},{"name":"Closet/Drawers","icon":"closets.svg"},{"name":"Air conditioning","icon":"air-conditioning.svg"},{"name":"Heat","icon":"heat.svg"},{"name":"WiFi","icon":"wifi.svg"},{"name":"Breakfast","icon":"breakfast.svg"},{"name":"Fireplace","icon":"fireplace.svg"},{"name":"Iron","icon":"iron.svg"}]',
      property_id: 14
    },
    { 
      facilities_list: '[{"name":"Essentials","icon":"essentials.svg"},{"name":"Kid-Friendly","icon":"kid-friendly.svg"},{"name":"Hair dryer","icon":"hair-dryer.svg"},{"name":"Closet/Drawers","icon":"closets.svg"},{"name":"Shampoo","icon":"shampoo.svg"},{"name":"Breakfast","icon":"breakfast.svg"},{"name":"Kitchen","icon":"kitchen.svg"},{"name":"Fireplace","icon":"fireplace.svg"},{"name":"Parking","icon":"parking.svg"},{"name":"Workspace","icon":"workspace.svg"},{"name":"Air conditioning","icon":"air-conditioning.svg"},{"name":"TV","icon":"tv.svg"},{"name":"Heat","icon":"heat.svg"},{"name":"WiFi","icon":"wifi.svg"},{"name":"Iron","icon":"iron.svg"}]',
      property_id: 15
    },
  ];

  const reservations = [
    { 
      from_date: '2020-07-11', 
      to_date: '2020-08-11', 
      persons_count: 3, 
      reserved_by: 1,
      property_id: 4
    },
    { 
      from_date: '2020-10-11', 
      to_date: '2020-10-15', 
      persons_count: 2, 
      reserved_by: 1,
      property_id: 6
    },
    { 
      from_date: '2020-04-18', 
      to_date: '2020-04-28', 
      persons_count: 4, 
      reserved_by: 1,
      property_id: 9
    },
    { 
      from_date: '2020-07-20', 
      to_date: '2020-10-19', 
      persons_count: 3, 
      reserved_by: 2,
      property_id: 10
    },
    { 
      from_date: '2021-10-01', 
      to_date: '2022-02-01', 
      persons_count: 4, 
      reserved_by: 2,
      property_id: 15
    },
    { 
      from_date: '2020-09-11', 
      to_date: '2021-08-11', 
      persons_count: 2, 
      reserved_by: 3,
      property_id: 13
    },
    { 
      from_date: '2020-07-13', 
      to_date: '2021-08-10', 
      persons_count: 4, 
      reserved_by: 3,
      property_id: 3
    },
    { 
      from_date: '2021-07-11', 
      to_date: '2022-08-02', 
      persons_count: 2, 
      reserved_by: 4,
      property_id: 1
    },
    { 
      from_date: '2020-04-01', 
      to_date: '2020-05-01', 
      persons_count: 3, 
      reserved_by: 4,
      property_id: 8
    },
    { 
      from_date: '2020-10-04', 
      to_date: '2020-11-02', 
      persons_count: 2, 
      reserved_by: 5,
      property_id: 11
    },
    { 
      from_date: '2020-08-30', 
      to_date: '2020-09-30', 
      persons_count: 4, 
      reserved_by: 5,
      property_id: 2
    }
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
