import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getUserSession } from "@/utils/getUserSession";

export const dynamic = "force-dynamic";

// GET /api/messages/unread-count
export const GET = async (request) => {
  try {
    await connectDB();
    const userSession = await getUserSession();
    if (!userSession || !userSession.user) {
      return Response.json({ message: "User ID is required" }, { status: 401 });
    }
    const { userId } = userSession;
    const count = await Message.countDocuments({recipient: userId, read: false});
    return Response.json(count, { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Something went wrong", { status: 500 });
  }
};