import bcrypt from 'bcryptjs';
import moment from 'moment';
import uuid from 'uuid';
import jwt from 'jsonwebtoken';
import managerDb from '../db/manager'

class Manager {
    static async signup (req, res) {
        const {
            firstname, lastname, email, password, national_id, phone_number, date_of_birth, 
        } = req.body;

        const managerExist = managerDb.managers.find((manager) => manager.email === email);
        if (managerExist) {
            return res.status(401).json({
                status: 401,
                error: 'This email already used'
            });
        }

        const hashedpassword = await bcrypt.hash(password, 8);

        const newManager ={

            id: uuid.v1(),
            firstname,
            lastname,
            email,
            national_id,
            phone_number,
            date_of_birth,
            position: 'Manager',
            status: 'active',
            password: hashedpassword
        }
        managerDb.managers.push(newManager);
        const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: '7d'});
        return res.status(201).json({
            status: 201,
            message: 'User created successfully',
            data: {
                token,
                newManager
            }
        });
    }

    static async signin(req, res) {
        const {email, password} = req.body;
        const managerExist = managerDb.managers.find((manager) => manager.email === email);
        if(managerExist) {
            const {
                password: hashedpassword
            } = managerExist;
            const compare = await bcrypt.compare(password, hashedpassword);
            if(compare) {
                const token = await jwt.sign({email}, process.env.SECRET, {expiresIn: '7d'});
                return res.status(202).json({
                    status:202,
                    message:'User successfully logged in',
                    data: {token},
                });
            }
            return res.status(401).json({
                status: 401,
                error: 'incorrect password',
            });

        }
        return res.status(404).json({
            status: 401,
            error: 'email not found'
        });
            
    }
}

export default Manager;