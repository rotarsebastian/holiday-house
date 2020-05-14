const { validateForm, checkFormStructure } = require(__dirname + '/validation');

const handleInitialFormCheck = (body, formType, formLength, options) => {

    // ====================== CHECK IF IS ARRAY ======================
    if(!Array.isArray(body)) return { status: 0, message: 'Invalid format - not an array!', code: 404 };

    // ====================== CHECK IF IS THE RIGHT LENGTH ======================
    const form = [ ...body ];
    if(form.length !== formLength && formType !== 'edit') return { status: 0, message: 'Invalid format - wrong array length!', code: 404 };

    // ====================== CHECK IF OBJECTS INSIDE THE ARRAY ARE THE RIGHT FORMAT ======================
    const checkResponse = options ? checkFormStructure(form, options) : checkFormStructure(form);
    if(checkResponse.status === 0) return checkResponse;

    // ====================== VALIDATE FORM ELEMENTS AND TYPE ======================
    let result;
    if(options && options === 'resetpass') result = validateForm([form[0], form[1]], formType);
        else result = validateForm(form, formType);
    if(result.status === 0) return { status: 0, invalids: result.invalidInputs, msg: result.msg, code: 404 };

    // ====================== EVERYTHING OK ======================
    return { status: 1 };
}

module.exports = { 
    handleInitialFormCheck
}