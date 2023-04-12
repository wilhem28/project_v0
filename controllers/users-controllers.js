import pool from '../db.js';
import bcrypt from 'bcrypt';
import queries from '../queries/queries.js';

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
        const {name,email,password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await pool.query(queries.createUser,[name,email,hashedPassword]);
        res.json({users:newUser.rows[0]});
    } catch (error) {
        res.status(500).json({error:error.message});
        
    }
};

export default {getUsers,createUser};