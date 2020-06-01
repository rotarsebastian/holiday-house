export const validateForm = formElements => {
    let formIsValid = true;
    let invalids = [];
    formElements.forEach(input => {
        if(!validateInputValue(input.type, input.val)) {
            formIsValid = false;
            invalids.push(input.type);
        }
    });
    return { formIsValid, invalids };
}

const isJSON = str => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

// ====================== VALIDATION FOR EACH INPUT ======================
export const validateInputValue = (type, value) => {
    switch (type) {
        // ====================== USER VALIDATION ======================
        case 'password':
            return value.length >= 6 && value.length <= 80;
        case 'email':
            return /@.+\.[A-Za-z]{2,}$/.test(value);
        case 'first_name':
            return value.length >= 2 && value.length <= 50 && /^[\p{L} .'-]+$/u.test(value);
        case 'last_name':
            return value.length >= 2 && value.length <= 50 && /^[\p{L} .'-]+$/u.test(value);
        case 'birthdate':
            return value.length === 10 && /^\d{4}-((0\d)|(1[012]))-(([012]\d)|3[01])$/.test(value);

        // ====================== PROPERTY VALIDATION ======================
        case 'title':
            return value.length >= 4 && value.length <= 60;
        case 'description':
            return value.length >= 4 && value.length <= 800;
        case 'type':
            return value.length >= 4 && value.length <= 60;
        case 'available_start':
            return value.length === 10 && /^\d{4}-((0\d)|(1[012]))-(([012]\d)|3[01])$/.test(value);
        case 'available_end':
            return value.length === 10 && /^\d{4}-((0\d)|(1[012]))-(([012]\d)|3[01])$/.test(value);
        case 'price':
            return Number.isInteger(value);
        case 'capacity':
            return Number.isInteger(value);
        case 'rooms':
            return Number.isInteger(value);
        case 'beds':
            return Number.isInteger(value);
        case 'bathrooms':
            return Number.isInteger(value);
        case 'guests':
            return Number.isInteger(value);
        case 'address':
            return typeof value === 'string' && isJSON(value)
        case 'facilities':
            return typeof value === 'string' && isJSON(value)
        case 'coordinates':
            return typeof value === 'string' && isJSON(value)
        case 'photos':
            return typeof value === 'string' && isJSON(value)
        case 'country':
            return value.length >= 4 && value.length <= 56 && /^[\p{L} .'-]+$/u.test(value);
        case 'city':
            return value.length >= 2 && value.length <= 90 && /^[\p{L} .'-]+$/u.test(value);
        case 'property_address':
            return value.length >= 6 && value.length <= 100;
        case 'postal_code':
            return value.length >= 2 && value.length <= 20;

        // ====================== RESERVATION VALIDATION ======================
        case 'from_date':
            return value.length === 10 && /^\d{4}-((0\d)|(1[012]))-(([012]\d)|3[01])$/.test(value);
        case 'to_date':
            return value.length === 10 && /^\d{4}-((0\d)|(1[012]))-(([012]\d)|3[01])$/.test(value);
        case 'persons_count':
            return Number.isInteger(value);
        default:
            console.log(`Validation failed! No validation for ${type}!`);
        return false;
    }
}