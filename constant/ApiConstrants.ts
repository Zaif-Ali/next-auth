export const BlogApiConstants = {

    // ----------- Get api

    // Fetch Blogs for infinite scroll
    FetchBlogs: (page: number, limit: number = 6) => `/api/Blog/FetchBlogs?page=${page}&limit=${limit}`,

    // -------- Post Api

    // Like the blog
    LikeBlog: (blogId: string) => `/api/Blog/LikeBlog?BlogId=${blogId}`,

    // Add the new blog
    AddBlog: '/api/Blog/AddBlog',
};

export const UserApiConstants = {

    // ----------- Get api

    // Get user by email
    GetUser: (email: string) => `/api/user/GetUser?email=${email}`,

    // Get all user based on filter search value
    GetAllUser: (FilterValue: string, SearchValue: string) => `/api/user/LimitUsers?value=${FilterValue}&search=${SearchValue}`,

    // get the totaluser 
    TotalUser: '/api/user/TotalUsers',

    // --------- Update Api

    // Update user Api 
    UpdateUser: '/api/user/UpdateUser',

    // -------- Post Api

    // Follow user
    FollowUser: "/api/user/FollowUser",

}