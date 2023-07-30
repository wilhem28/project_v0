import pool from '../db.js';
import bcrypt from 'bcrypt';
import resHelper from './utils/res-helper.js';
import { validate } from 'email-validator';
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

// DIFFERENCIATE USERS !!!!
// PROMOTION !!!!


const createUser = async(req,res) => {
    try {
        const {name,email,password,privileges,genre,dob,city} = req.body;
        const profilImg = req.file.filename;

        const regex = new RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{3,}$/u); 
        const regexPassword = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/); 
        const validateName = regex.test(name);
        const validateCity = regex.test(city);
        const validatePassword = regexPassword.test(password);

        if (!validateName) {
            return res.json("Votre nom doit comporter uniquement des lettres avec un minimum de trois lettres.");
        }
        if (city != "" && !validateCity) {
            return res.json("Le nom de votre lieu de résidence doit être composé uniquement de lettres avec un minimum de 3 lettres.");
        }
        if (!validatePassword) {
            return res.json("Votre password doit vérifier les conditions suivantes : 8 caractères minimum, 1 lettre majuscule minimum, 1 lettre miniscule minimum, 1 chiffre minimum, et 1 caractère spécial minimum");
        }
        if (profilImg != "" && !profilImg) {
            return res.json("Votre est obligatoire");
        }
        if (validate(email)) {
            const newClassAdmin = new ClassAdmin(name,email,password,privileges,genre,dob,city,profilImg);
            const newClassUser = new ClassUser(name,email,password,genre,dob,city,profilImg);
    
            const userAlreadyExists = await pool.query(queries.logUser,[email]);
           
            if(userAlreadyExists.rowCount == 1) {
                res.json("Il existe déjà un utilisateur utilisant cet email. Veuillez essayer avec un autre email.");
            } 
            else {
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
        } else {
            res.json("Le format de votre email semble incorrect.");
        }
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};
const deleteUserById = async(req,res) => {
    try {
        const idUrl = req.params.id;
        const userById = await pool.query(queries.selectUserById,[idUrl]);
        if (!userById.rows.length) {
            res.json("Nous n'avons pas trouvé cet utilisateur");
        } else {
            await pool.query(queries.removeUserById,[idUrl]);
            res.json("Vous avez été effacé.e de la base de données");

        }
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};
const updateUser = async(req,res) => {
    try {
        const idUrl = req.params.id;
        let {name,email,password,genre,dob,city,} = req.body;
        const profilImg = req.file.filename;
        const userById = await pool.query(queries.selectUserById,[idUrl]);
        const hashedPassword = await bcrypt.hash(password,10);
        const message = "Votre profil a été modifié avec succès.";
        if (!userById.rows.length) {
            res.json("Nous n'avons pas trouvé cet utilisateur");
        } else {
            const user = await pool.query(queries.updateUser,[name,email,hashedPassword,genre,dob,city,profilImg,idUrl]);
            res.json(resHelper.success(message,userById));
        }
    } catch (error) {
        res.status(500).json({error:error.message});
    }

}


export default {getUsers,getUserById,createUser,deleteUserById,updateUser};