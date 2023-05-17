import checkUserExistence from "@/lib/UserExistance";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    
    const { found, user } = await checkUserExistence("zaifali785@gmail.com");
    
    return response.status(404).json({
        found, user
    });
}