import mongoose from 'mongoose';
const { Schema,model } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});



const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;


export const findOne = async (email) => {
  try {
    return await User.findOne( {email} );
  } catch (err) {
    throw new Error(`Error finding user by email: ${err.message}`);
  }
};


