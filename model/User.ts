import { IUser } from '@/types/Global';
import { Schema, model, models } from 'mongoose';

const userSchema = new Schema<IUser>({
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
        default: "other"
    },
    followers: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    following: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    isVerified: {
        type: Boolean,
        default: false,
        required: true
    },
}, {
    timestamps: true,
});

const UserModel = models.User || model<IUser>('User', userSchema);

export default UserModel;
