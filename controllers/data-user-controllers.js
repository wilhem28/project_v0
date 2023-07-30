import pool from '../db.js';
import queries from '../queries/queries.js';


const createDataProduct = async (req,res) => {
    try {
        const {fk_user,store,place,branch,brand,range,type,packaging,volume,quantity,price} = req.body;
        const userDataById = await pool.query(queries.createDataProduct,[fk_user,store,place,branch,brand,range,type,packaging,volume,quantity,price]);
        if (userDataById) {
            res.json({userDataById:userDataById.rows});
        } else {
            res.json("Nous n'avons pu enregistré vos informations.");
        }
    } catch (error) {
        res.status(500).json({error:error.message});
    }

};

export default {createDataProduct}