import jwt from 'jsonwebtoken';
import ClassUser from '../../classes/class-user.js';

const jwtTokens = ({user_id,user_name,user_email}) => {
const user = new ClassUser(user_id,user_name,user_email);
const accessToken = jwt.sign({user},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'5m'});
const refreshToken = jwt.sign({user},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'20m'});
return ({accessToken,refreshToken});
}

export default jwtTokens;