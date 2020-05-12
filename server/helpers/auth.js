const { validateForm, checkFormStructure } = require(__dirname + '/validation');

const isAuthenticated = (req, res, next) => {
    try {
      if (req.session.user) next();
        else return res.send({ status: 0, msg: 'User not authorized!'});
    } catch (err) {
        return res.send({ status: 0, msg: 'User not authorized!'});
    }
}

const handleInitialFormCheck = (body, formType, formLength) => {

    // ====================== CHECK IF IS ARRAY ======================
    if(!Array.isArray(body)) return { status: 0, message: 'Invalid format - not an array!', code: 404 };

    // ====================== CHECK IF IS THE RIGHT LENGTH ======================
    const form = [ ...body ];
    if(form.length !== formLength) return { status: 0, message: 'Invalid format - wrong array length!', code: 404 };

    // ====================== CHECK IF OBJECTS INSIDE THE ARRAY ARE THE RIGHT FORMAT ======================
    const checkResponse = checkFormStructure(form);
    if(checkResponse.status === 0) return checkResponse;

    // ====================== VALIDATE FORM ELEMENTS AND TYPE ======================
    const result = validateForm(form, formType);
    if(result.status === 0) return { status: 0, invalids: result.invalidInputs, msg: result.msg, code: 404 };

    // ====================== EVERYTHING OK ======================
    return { status: 1 };
}

module.exports = { 
    isAuthenticated, 
    handleInitialFormCheck
}