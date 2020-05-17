// ====================== IMPORTS ======================
const router = require('express').Router();
const { isAuthenticated } = require(__dirname + '/../../helpers/auth');
const { handleInitialFormCheck } = require(__dirname + '/../../helpers/requestCheck');
const User = require(__dirname + '/../../models/User');
const Reservation = require(__dirname + '/../../models/Reservation');
const Property = require(__dirname + '/../../models/Property');
const moment = require('moment');

// ====================== GET USER RESERVATION ======================
router.get('/:id', isAuthenticated, async(req, res) => {
    try {
        // ====================== GET THE RESERVATION ID ======================
        const { id } = req.params;
        if(!id) return res.json({ status: 0, message: 'Missing id!', code: 404 });

        // ====================== GET THE RESERVATION ======================
        const reservation = await Reservation.query().select('id', 'from_date', 'to_date', 'persons_count', 'property_id').where({ id });
        const property = await Property.query().select('id', 'title', 'photos').where({ id: reservation[0].property_id });
        if(reservation.length === 0) return res.json({ status: 0, message: 'Reservation does not exists!', code: 404 });
        
        // ====================== CONSTRUCT DATA ======================
        const reservationObj = { ...reservation[0], property_title: property[0].title, property_photos: property[0].photos };

        // ====================== EVERYTHING OK ======================s
        return res.json({ status: 1, message: 'Reservation retrieved successfully!', data: reservationObj });

    } catch (err) {
        return res.json({ status: 0, message: 'Error getting reservation!'});
    }
});

// ====================== GET USER RESERVATIONS ======================
router.get('/', isAuthenticated, async(req, res) => {
    try {
        // ====================== GET THE RESERVATIONS ======================
        const user = User.query().where({ id: req.session.user.id });
        const reservations = await User.relatedQuery('reservations')
            .for(user)
            .select('id', 'from_date', 'to_date', 'persons_count', 'property_id')
            .orderBy('from_date');

        // ====================== EVERYTHING OK ======================s
        return res.json({ status: 1, message: 'Reservation retrieved successfully!', data: reservations });

    } catch (err) {
        return res.json({ status: 0, message: 'Error getting reservations!'});
    }
});

// ====================== DELETE A RESERVATION ======================
router.delete('/:id', isAuthenticated, async(req, res) => {
    try {
        // ====================== GET THE RESERVATION ID ======================
        const { id } = req.params;
        if(!id) return res.json({ status: 0, message: 'Missing id!', code: 404 });

        // ====================== GET THE RESERVATION ======================
        const reservation = await Reservation.query().select('id', 'reserved_by').findById(id);
        if(!reservation) return res.json({ status: 0, message: 'Reservation does not exists!', code: 404 });

        // ====================== CHECK IF IT IS THE RIGHT USER ======================
        if(reservation.reserved_by !== req.session.user.id) return res.json({ status: 0, message: 'Unauthorized!', code: 404 });

        // ====================== DELETE RESERVATION ======================
        const dbRes = await Reservation.query().deleteById(id);

        // ====================== RETURN RESERVATION DOES NOT EXIST ======================
        if(!dbRes) return res.json({ status: 0, message: 'Reservation does not exist!'});

        // ====================== EVERYTHING OK ======================
        return res.json({ status: 1, message: 'Reservation deleted successfully!'});

    } catch (err) {
        return res.json({ status: 0, message: 'Error deleting reservation!'});
    }
});

// ====================== CREATE A RESERVATION ======================
router.post('/:id', isAuthenticated, async(req, res) => {
    try {
        // ====================== GET THE PROPERTY ID ======================
        const { id } = req.params;
        if(!id) return res.json({ status: 0, message: 'Missing id!', code: 404 });

        // ====================== HANDLE INITIAL CHECK ======================
        const initialCheckRes = handleInitialFormCheck(req.body, 'addReservation', 3);
        if(initialCheckRes.status !== 1) return res.json(initialCheckRes);

        // ====================== EXTRACT FORM ELEMENTS ======================
        const [ { val: from_date }, { val: to_date }, { val: persons_count } ] = [ ...req.body ];

        // ====================== CHECK IF IS DATES ARE VALID ======================
        const today_date = moment().format('YYYY-MM-DD');
        const tomorrow_date = moment().add(1, 'days').format('YYYY-MM-DD');
        const isFromDateValid = moment(from_date).isSameOrAfter(today_date, 'day'); // CAN START MINIMUM TODAY
        const isToDateValid = moment(to_date).isAfter(today_date, 'day'); // CAN END MINIMUM TOMORROW
        const isSameDate = moment(to_date).isSame(from_date, 'day'); // CANNOT BE SAME DATE - 1 NIGHT MINIMUM

        if(!isFromDateValid || !isToDateValid) return res.json({ status: 0, message: `Your start date should be at least from ${today_date} and your end date should be at least until ${tomorrow_date}!`, code: 404 });
        if(isSameDate) return res.json({ status: 0, message: 'Your start date cannot be the same with your end date!', code: 404 });

        // ====================== CHECK IF THE PROPERTY IS AVAILABLE AT CHOSEN DATES ======================
        const user = User.query().where({ id: req.session.user.id });
        const property = await User.relatedQuery('properties')
            .for(user)
            .select('id', 'capacity')
            .where({ id })
            .andWhere('available_start', '<=' , from_date)
            .andWhere('available_end', '>=' , to_date)

        if(property.length === 0) return res.json({ status: 0, message: 'Property is not available for your chosen dates', code: 404 });
        if(property[0].capacity < persons_count) return res.json({ status: 0, message: `Property does not accept more than ${property[0].capacity} persons`, code: 404 });

        // ====================== CHECK IF THE PROPERTY IS NOT RESERVED ALREADY AT CHOSEN DATES ======================
        const propertyDB = Property.query().where({ id });
        const reservation = await Property.relatedQuery('reservations')
            .for(propertyDB)
            .select('id')
            .where('to_date', '>' , from_date)
            .andWhere('from_date', '<' , to_date)
            .limit(1)

        if(reservation.length > 0) return res.json({ status: 0, message: 'Property is already reserved at chosen dates!', code: 404 });

        // ====================== CREATE RESERVATION ======================
        const newReservation = { 
            from_date, 
            to_date, 
            persons_count, 
            reserved_by: req.session.user.id,
            property_id: property[0].id
        };

        // ====================== INSERT RESERVATION INTO DB ======================
        const createdReservation = await Reservation.query().insert(newReservation);
        if(!createdReservation) return res.json({ status: 0, message: 'Error while inserting reservation!', code: 404 });

        // ====================== EVERYTHING OK ======================
        return res.status(200).json({ status: 1, message: 'Reservation created successfully!', code: 200 });

    // ====================== HANDLE ERROR ======================
    } catch(e) {
        return res.json({ status: 0, message: 'Error creating new property!'});
    }
});

// ====================== EDIT A RESERVATION ======================
router.patch('/:id', isAuthenticated, async(req, res) => {
    try {
        // ====================== GET THE RESERVATION ID ======================
        const { id } = req.params;
        if(!id) return res.json({ status: 0, message: 'Missing id!', code: 404 });

        // ====================== HANDLE INITIAL CHECK ======================
        const initialCheckRes = handleInitialFormCheck(req.body, 'addReservation', 3);
        if(initialCheckRes.status !== 1) return res.json(initialCheckRes);

        // ====================== RESERVATION DOES NOT EXIST ======================
        const reservationDB = await Reservation.query().select('property_id', 'reserved_by').findById(id);
        if(!reservationDB) return res.json({ status: 0, message: 'Reservation does not exists!', code: 404 });

        // ====================== CHECK IF IT IS THE RIGHT USER ======================
        if(reservationDB.reserved_by !== req.session.user.id)  return res.json({ status: 0, message: 'Unauthorized!', code: 404 });
        
        // ====================== EXTRACT FORM ELEMENTS ======================
        const [ { val: from_date }, { val: to_date }, { val: persons_count } ] = [ ...req.body ];

        // ====================== CHECK IF IS DATES ARE VALID ======================
        const today_date = moment().format('YYYY-MM-DD');
        const tomorrow_date = moment().add(1, 'days').format('YYYY-MM-DD');
        const isFromDateValid = moment(from_date).isSameOrAfter(today_date, 'day'); // CAN START MINIMUM TODAY
        const isToDateValid = moment(to_date).isAfter(today_date, 'day'); // CAN END MINIMUM TOMORROW
        const isSameDate = moment(to_date).isSame(from_date, 'day'); // CANNOT BE SAME DATE - 1 NIGHT MINIMUM

        if(!isFromDateValid || !isToDateValid) return res.json({ status: 0, message: `Your start date should be at least from ${today_date} and your end date should be at least until ${tomorrow_date}!`, code: 404 });
        if(isSameDate) return res.json({ status: 0, message: 'Your start date cannot be the same with your end date!', code: 404 });

        // ====================== CHECK IF THE PROPERTY IS AVAILABLE AT CHOSEN DATES ======================
        const user = User.query().where({ id: req.session.user.id });
        const property = await User.relatedQuery('properties')
            .for(user)
            .select('id', 'capacity')
            .where({ id: reservationDB.property_id })
            .andWhere('available_start', '<=' , from_date)
            .andWhere('available_end', '>=' , to_date)

        if(property.length === 0) return res.json({ status: 0, message: 'Property is not available for your chosen dates', code: 404 });
        if(property[0].capacity < persons_count) return res.json({ status: 0, message: `Property does not accept more than ${property[0].capacity} persons`, code: 404 });

        // ====================== CHECK IF THE PROPERTY IS NOT RESERVED ALREADY AT CHOSEN DATES ======================
        const propertyDB = Property.query().where({ id: reservationDB.property_id });
        const reservation = await Property.relatedQuery('reservations')
            .for(propertyDB)
            .select('id')
            .where('to_date', '>' , from_date)
            .andWhere('from_date', '<' , to_date)
            .whereNot({ id })
            .limit(1)

        if(reservation.length > 0) return res.json({ status: 0, message: 'Property is already reserved at chosen dates!', code: 404 });

        // ====================== EDIT RESERVATION INTO DB ======================
        const createdReservation = await Reservation.query().findById(id).patch({ from_date, to_date, persons_count });
        if(!createdReservation) return res.json({ status: 0, message: 'Error while editing reservation!', code: 404 });

        // ====================== EVERYTHING OK ======================
        return res.status(200).json({ status: 1, message: 'Reservation edited successfully!', code: 200 });

    
    // ====================== HANDLE ERROR ======================
    } catch(e) {
        return res.json({ status: 0, message: 'Error editing the property!'});
    }
});

module.exports = router;
