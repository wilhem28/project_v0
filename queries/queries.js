const selectUsers = 'SELECT * FROM users';
const selectUserById ="SELECT * FROM users WHERE user_id = $1";
const createAdmin = 'INSERT INTO users (user_name,user_email,user_password,user_privileges,user_genre,user_dob,user_city,user_img) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';
const createUser = 'INSERT INTO users (user_name,user_email,user_password,user_genre,user_dob,user_city,user_img) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *';
const logUser = 'SELECT * FROM users WHERE user_email = $1';




export default {selectUsers,selectUserById,createAdmin,createUser,logUser};