import mongoose, { Schema } from 'mongoose';
import slugify from 'slugify';

const blogSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    excerpt: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Likes: {
        type: Number,
        default: 0,
    },
    authorname: {
        type: String,
        required: true,
    },
    authoremail: {
        type: String,
        required: true,
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
}, { timestamps: true });

blogSchema.pre('save', function (next) {
    // Check if the slug needs to be generated
    if (!this.slug || this.isModified('title')) {
        // Generate the slug from the title
        this.slug = slugify(this.title, {
            lower: true,
            strict: true,
        });
    }
    next();
});

export default mongoose.models.Blogs || mongoose.model('Blogs', blogSchema);