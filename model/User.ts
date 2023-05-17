import { User } from '@/types/Global';
import { Schema, model, models } from 'mongoose';

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    emailVerified: { type: Boolean, required: false },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        default : "other"
    },
});

const UserModel = models.User || model<User>('User', userSchema);

export default UserModel;
