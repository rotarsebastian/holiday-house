const validateInput = (type, value) => {
    switch (type) {
        case 'username':
            return value.length >= 6 && value.length <= 60 && /^[a-zA-Z0-9_.-@]*$/.test(value);
        case 'password':
            return value.length >= 6 && value.length <= 50;
        case 'email':
            return /@.+\.[A-Za-z]{2,}$/.test(value);
        case 'first_name':
            return value.length >= 2 && value.length <= 50 && /^[\p{L} .'-]+$/u.test(value);
        case 'last_name':
            return value.length >= 2 && value.length <= 50 && /^[\p{L} .'-]+$/u.test(value);
        case 'company':
            return value.length >= 2 && value.length <= 50;
        case 'country':
            return value.length >= 4 && value.length <= 56 && /^[a-zA-Z\s]*$/.test(value);
        case 'city':
            return value.length >= 2 && value.length <= 50 && /^[a-zA-Z\s]*$/.test(value);
        case 'address':
            return value.length >= 6 && value.length <= 100;
        case 'postal_code':
            return /^[0-9]{4}$/.test(value);
        default:
            console.log(`Validation failed! No validation for ${type}!`);
        break;
    }
}

const validateForm = form => {
    let formIsValid = true;
    let invalidInputs = [];
    form.map(input => {
        if(!validateInput(input.type, input.val)) {
            formIsValid = false;
            console.log(`${input.type} with value ${input.val} is not valid`);
            invalidInputs.push(input.type);
        }
    });
    return formIsValid ? { status: 1 } : { status: 0, invalidInputs };
}

module.exports = validateForm;