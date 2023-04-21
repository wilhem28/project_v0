const selectUsers = 'SELECT * FROM users';
const createAdmin = 'INSERT INTO users (user_name,user_email,user_password,user_privileges,user_img) VALUES ($1,$2,$3,$4,$5) RETURNING *';
const createUser = 'INSERT INTO users (user_name,user_email,user_password,user_img) VALUES ($1,$2,$3,$4) RETURNING *';
const logUser = 'SELECT * FROM users WHERE user_email = $1';




export default {selectUsers,createAdmin,createUser,logUser};