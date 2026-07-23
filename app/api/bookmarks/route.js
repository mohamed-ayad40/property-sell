import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
import { getUserSession } from "@/utils/getUserSession";
export const dynamic = 'force-dynamic';

// GET /api/bookmarks
export const GET = async () => {
    try {
        await connectDB();
        const userSession = await getUserSession();
        if(!userSession || !userSession.userId) return new Response("User ID is required", {status: 401});
        const {userId} = userSession;
        // Find user in db
        const user = await User.findOne({_id: userId});
        // Get users bookmarks
        const bookmarks = await Property.find({_id: {$in: user.bookmarks}});
        return Response.json(bookmarks, {status: 200});
    } catch (err) {
        console.log(err);
        return new Response("Something went wrong", {status: 500});
    }
}
// POST /api/bookmarks
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
        let message;
        if(isBookmarked) {
            // If already bookmarked, then remove it
            user.bookmarks.pull(propertyId);
            message = "Bookmark removed successfully";
            isBookmarked = false;
        } else {
            // If not bookmarked, then add it
            user.bookmarks.push(propertyId);
            message = "Bookmark added successfully";
            isBookmarked = true;
        }
        await user.save();
        return new Response(JSON.stringify({message, isBookmarked}), {status: 200, headers: {
            "Content-Type": "application/json"
        }});
    } catch (err) {
        console.log(err);
        return new Response("Something went wrong", {status: 500});
    }
}