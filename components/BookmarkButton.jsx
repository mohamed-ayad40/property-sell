"use client";
import { FaBookmark } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState();
  useEffect(() => {
    if(!userId) return;
    const checkBookmarkStatus = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/bookmarks/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ propertyId: property._id }),
        });
        if (res.status === 200) {
          const data = await res.json();
          setIsBookmarked(data.isBookmarked);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    checkBookmarkStatus();
  }, [property._id, userId]);
  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to sign in to bookmark the property");
      return;
    }
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ propertyId: property._id }),
      });
      if (res.status === 200) {
        const data = await res.json();
        toast.success(data.message);
        setIsBookmarked(data.isBookmarked);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
  if (loading) return <p className="text-center">Loading...</p>
  return (
    <button
      onClick={handleClick}
      className={`${isBookmarked ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"} cursor-pointer text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}
    >
      <FaBookmark className="mr-2" />{" "}
      {!isBookmarked ? "Bookmark Property" : "Remove Bookmark"}
    </button>
  );
};

export default BookmarkButton;
