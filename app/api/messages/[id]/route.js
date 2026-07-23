import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getUserSession } from "@/utils/getUserSession";

export const dynamic = "force-dynamic";

// PUT /api/messages/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();
    const { id } = await params;
    const userSession = await getUserSession();
    if (!userSession || !userSession.user) {
      return Response.json({ message: "User ID is required" }, { status: 401 });
    }
    const { userId } = userSession;
    const message = await Message.findById(id);
    if (!message) {
      return new Response("Message not found", { status: 404 });
    }
    // Verify ownership
    if (message.recipient.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    // Update message to read/unread depending on the current state
    message.read = !message.read;
    await message.save();
    return Response.json(message, { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Something went wrong", { status: 500 });
  }
};
// DELETE /api/messages/:id
export const DELETE = async (request, { params }) => {
  try {
    await connectDB();
    const { id } = await params;
    const userSession = await getUserSession();
    if (!userSession || !userSession.user) {
      return Response.json({ message: "User ID is required" }, { status: 401 });
    }
    const { userId } = userSession;
    const message = await Message.findById(id);
    if (!message) {
      return new Response("Message not found", { status: 404 });
    }
    // Verify ownership
    if (message.recipient.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    await message.deleteOne();
    return Response.json({message: "Message deleted successfully."}, { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Something went wrong", { status: 500 });
  }
};
