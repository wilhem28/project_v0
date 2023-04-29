import pool from '../db.js';
import bcrypt from 'bcrypt';
import queries from '../queries/queries.js';
import ClassUser from '../classes/class-user.js';
import ClassAdmin from '../classes/class-admin.js';

const getUsers = async(req,res) => {
    try {
        const users = await pool.query(queries.selectUsers);
        res.json({users: users.rows});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};
const getUserById = async(req,res) => {
    try {
        const idUrl = req.params.id;
        const userById = await pool.query(queries.selectUserById,[idUrl]);
        if (userById) {
            res.json({userById:userById.rows});
        } else {
            res.json("Nous n'avons pas trouvé l'utilisateur");
        }
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}
const createUser = async(req,res) => {
    try {
        const {name,email,password,privileges,genre,dob,city} = req.body;
        const profilImg = req.file.filename; 
        const newClassAdmin = new ClassAdmin(name,email,password,privileges,genre,dob,city,profilImg);
        const newClassUser = new ClassUser(name,email,password,genre,dob,city,profilImg);

        const userAlreadyExists = await pool.query(queries.logUser,[email]);

        if(userAlreadyExists.rowCount == 1) {
            res.json("Il existe déjà un utilisateur utilisant cet email. Veuillez essayer avec un autre email.");
        } else {
            const users = await pool.query(queries.selectUsers);
    
            if(users.rowCount === 0) {
                const booleanValue = true;
                const hashedPassword = await bcrypt.hash(newClassAdmin.password,10);
                const newUser = await pool.query(queries.createAdmin,[newClassAdmin.name,newClassAdmin.email,hashedPassword,booleanValue,newClassAdmin.genre,newClassAdmin.dob,newClassAdmin.city,newClassAdmin.img]);
                res.json({users:newUser.rows[0]});
            } else {
                const booleanValuefalse = false;
                const hashedPassword = await bcrypt.hash(newClassUser.password,10);
                const newUser = await pool.query(queries.createUser,[newClassUser.name,newClassUser.email,hashedPassword,newClassUser.genre,newClassUser.dob,newClassUser.city,newClassUser.img]);
                res.json({users:newUser.rows[0]});
            }
        }

    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

export default {getUsers,getUserById,createUser};