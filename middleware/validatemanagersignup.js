
import Joi from 'joi';

const validatesignup = (req, res, next) => {
    const userSchemas = Joi.object({
        firstname: Joi.string().alphanum().min(3).max(15).required(),
        lastname: Joi.string().alphanum().min(3).max(15).required(),
        national_id: Joi.string().min(16).max(16).required(),
        phone_number: Joi.string().min(10).max(10).required(),
        date_of_birth: Joi.string().regex(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/).required(),
        email: Joi.string().email({minDomainSegments: 2}).required(),
        password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).required(),
    });
    const schema =userSchemas.validate(req.body);
    if (schema.error) {
        const errors = [];
        for (let i = 0; i < schema.error.details.length; i += 1) {
            errors.push(schema.error.details[i].message.split('"').join(' '));
        }
        if (errors[0].startsWith(' password with value')) {
            const message = 'Your password must be at least 1 lowercase, 1 uppercase, 1 numeric character, 1 special character and be 8 characters or more ';
            return res.status(400).json({
                status: 400,
                error: message,
            })
        }

        return res.status(400).json({
            status: 400,
            error: errors[0],
        })
    }
    next();
};
export default validatesignup;