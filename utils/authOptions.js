import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful signin
    async signIn({ profile }) {
      // connect to db
      await connectDB();
      // check if user exists
      const userExists = await User.findOne({ email: profile.email });
      // if not, then add user to db
      if (!userExists) {
        // Truncate username if it's too long
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // return true to allow sign up
      return true;
    },
    async session({ session }) {
      await connectDB();
      // Get user from db
      const user = await User.findOne({ email: session.user.email });
      // Assign user id to session
      session.user.id = user._id.toString();
      // return session
      return session;
    },
  },
  pages: {
    signIn: "/", // لو لغى الدخول، رجعه للرئيسية
    error: "/", // لو حصل إيرور بجد، برضه رجعه للرئيسية
  },
};
