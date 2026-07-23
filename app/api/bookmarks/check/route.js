import connectDB from "@/config/database";
import User from "@/models/User";
import { getUserSession } from "@/utils/getUserSession";
export const dynamic = 'force-dynamic';
export const POST = async (request) => {
    try {
        await connectDB();
        const {propertyId} = await request.json();
        const userSession = await getUserSession();
        if(!userSession || !userSession.userId) return new Response("User ID is required", {status: 401});
        const {userId} = userSession;
        // Find user in db
        const user = await User.findOne({_id: userId});
        // Check if property is bookmarked
        let isBookmarked = user.bookmarks.includes(propertyId);
        
        return new Response(JSON.stringify({isBookmarked}), {status: 200, headers: {
            "Content-Type": "application/json"
        }});
    } catch (err) {
        console.log(err);
        return new Response("Something went wrong", {status: 500});
    }
}