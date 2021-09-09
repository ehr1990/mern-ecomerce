const {check, validationResult} =  require("express-validator");

exports.validateSignupRequest = [
        check("firstName").isEmpty().withMessage("First name is required"),
        check("lastName").isEmpty().withMessage("last name is required"),
        check("email").isEmail().withMessage("Email is required"),
        check("password").isLength({min:6}).withMessage("Password lenght must be 6"),
];

exports.isRequestValidated = (req,res,next)=>{
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status("400").json({errors:errors.array()[0].msg})
    }
    next();
}