import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getUserSession } from "@/utils/getUserSession";

export const dynamic = "force-dynamic";

// GET /api/messages
export const GET = async () => {
  try {
    await connectDB();
    const userSession = await getUserSession();
    if (!userSession || !userSession.user) {
      return Response.json({ message: "User ID is required" }, { status: 401 });
    }
    const { userId } = userSession;
    const readMessages = await Message.find({ recipient: userId, read: true })
      .sort({createdAt: -1})
      .populate("sender", "name")
      .populate("property", "name");
    const unreadMessages = await Message.find({ recipient: userId, read: false })
      .sort({createdAt: -1})
      .populate("sender", "name")
      .populate("property", "name");
    const messages = [...unreadMessages, ...readMessages];
    return Response.json(messages, { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Something went wrong", { status: 500 });
  }
};

// POST /api/messages
export const POST = async (request) => {
  try {
    await connectDB();
    const { name, email, phone, message, property, recipient } =
      await request.json();
    const userSession = await getUserSession();
    if (!userSession || !userSession.user) {
      return Response.json({ message: "User ID is required" }, { status: 401 });
    }
    // Cannot send message to self
    if (userSession.userId === recipient) {
      return Response.json(
        { message: "Cannot send message to yourself!" },
        { status: 400 },
      );
    }
    const newMessage = new Message({
      sender: userSession.userId,
      recipient,
      name,
      property,
      email,
      phone,
      body: message,
    });
    await newMessage.save();
    return Response.json(
      { message: "Message sent successfully." },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return new Response("Something went wrong", { status: 500 });
  }
};
