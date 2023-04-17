import pool from '../db.js';
import bcrypt from 'bcrypt';
import queries from '../queries/queries.js';
import ClassUser from '../classes/class-user.js';

const getUsers = async(req,res) => {
    try {
        const users = await pool.query(queries.selectUsers);
        res.json({users: users.rows});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};
const createUser = async(req,res) => {
    try {
        const {name,email,password,privileges} = req.body;
        const newClassUser = new ClassUser(name,email,password,privileges);

        const users = await pool.query(queries.selectUsers);
        if(users.rowCount === 0) {
            const booleanValue = true;
            const hashedPassword = await bcrypt.hash(newClassUser.password,10);
            const newUser = await pool.query(queries.createAdmin,[newClassUser.name,newClassUser.email,hashedPassword,booleanValue]);
            res.json({users:newUser.rows[0]});
        } else {
            const hashedPassword = await bcrypt.hash(newClassUser.password,10);
            const newUser = await pool.query(queries.createUser,[newClassUser.name,newClassUser.email,hashedPassword]);
            res.json({users:newUser.rows[0]});
        }
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

export default {getUsers,createUser};