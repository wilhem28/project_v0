import pool from '../db.js';
import bcrypt from 'bcrypt';
import queries from '../queries/queries.js';
import jwtTokens from './utils/jwt-helpers.js';

const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;

        const user = await pool.query(queries.logUser,[email]); 
        if(user.rows.length === 0) return res.status(401).json({error : "Email is incorrect"});

        const validPassword = await bcrypt.compare(password,user.rows[0].user_password);
        if(!validPassword) return res.status(401).json({error : "Password is incorrect"});

        let tokens = jwtTokens(user.rows[0]); console.log(tokens);
        res.cookie('refresh_token',tokens.refreshToken,{httpOnly:true});
        res.json(tokens);

    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

export default {loginUser};