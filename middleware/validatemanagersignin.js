import Joi from 'joi';

const validatesignin = (req, res, next) => {
    const UserSchema = Joi.object({
        email: Joi.string().email({minDomainSegments: 2}).required(),
        password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).required(),
    });
    const schema = UserSchema.validate(req.body);
    if(schema.error) {
        const error = [];
        for (let i = 0; i < schema.error.details.length; i += 1) {
            error.push(schema.error.details[i].message.split('"').join(' '));
        }
        return res.status(400).json({
            status: 400,
            error: error[0],
        });
    }
    next();
};
export default validatesignin;
