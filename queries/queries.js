const selectUsers = 'SELECT * FROM users';
const selectUserById ="SELECT * FROM users WHERE user_id = $1";
const createAdmin = 'INSERT INTO users (user_name,user_email,user_password,user_privileges,user_genre,user_dob,user_city,user_img) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';
const createUser = 'INSERT INTO users (user_name,user_email,user_password,user_genre,user_dob,user_city,user_img) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *';
const logUser = 'SELECT * FROM users WHERE user_email = $1';

const createDataProduct = 'INSERT INTO products (fk_user,store_product,place_product,branch_product,brand_product,range_product,type_product,packaging_product,volume_product,quantity_product,price_product) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *';

const removeUserById = 'DELETE FROM users WHERE user_id = $1';
const updateUser = 'UPDATE users SET user_name=$1, user_email=$2, user_password=$3, user_genre=$4, user_dob=$5, user_city=$6, user_img=$7 WHERE user_id=$8';

export default {selectUsers,selectUserById,createAdmin,createUser,logUser,createDataProduct,removeUserById,updateUser}