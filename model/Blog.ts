import mongoose, { Schema } from 'mongoose';
import slugify from 'slugify';

export interface FIBlog {
    _id: string;
    title: string,
    slug: string,
    excerpt: string,
    content: string,
    author: {
        _id: string,
        createdAt: any,
        image: string
    },
    Likes: number,
    authorname: string,
    authoremail: string,
    likedBy: string[],
    createdAt : string
}

const blogSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        index: 'text'
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
    }]
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