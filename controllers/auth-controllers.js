import pool from '../db.js';
import bcrypt from 'bcrypt';
import queries from '../queries/queries.js';
import jwt from 'jsonwebtoken';
import jwtTokens from './utils/jwt-helpers.js';

const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;

        const user = await pool.query(queries.logUser,[email]); 
        if(user.rows.length === 0) return res.status(401).json({error : "Email is incorrect"});

        const validPassword = await bcrypt.compare(password,user.rows[0].user_password);
        if(!validPassword) return res.status(401).json({error : "Password is incorrect"});

        let tokens = jwtTokens(user.rows[0]);
        res.cookie('refresh_token',tokens.refreshToken,{httpOnly:true});
        res.json(tokens);

    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

const refrehTokenUser = (req,res) => {
    try {
        const refreshToken = req.cookies.refresh_token;
        if(refreshToken === null) return res.status(401).json({eror:'Refresh token is null'});
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (error,user) => {
            if(error) return res.status(403).json({error:error.message});
            let tokens = jwtTokens(user);
            res.cookie('refresh_token',tokens.refreshToken,{httpOnly:true});
            res.json(tokens);
        })
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

const deleteRefreshToken = (req, res) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({message:'Refreh token deleted'});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

export default {loginUser,refrehTokenUser,deleteRefreshToken};