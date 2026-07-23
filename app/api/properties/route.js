import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getUserSession } from "@/utils/getUserSession";
import cloudinary from "@/config/cloudinary";

// GET /api/properties
export const GET = async (request) => {
  try {
    await connectDB();
    const page = parseInt(request.nextUrl.searchParams.get("page")) || 1;
    const pageSize = parseInt(request.nextUrl.searchParams.get("pageSize")) || 3;
    const skip = (page - 1) * pageSize;
    const total = await Property.countDocuments({});
    const properties = await Property.find({}).sort({createdAt: -1}).skip(skip).limit(pageSize);
    const result = {
      total,
      properties,
    };
    
    return Response.json(result);
  } catch (err) {
    console.log(err);
    return new Response("Something Went Wrong", { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    // Connect DB
    await connectDB();
    // Get user session
    const userSession = await getUserSession();
    if (!userSession || !userSession.userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { userId } = userSession;
    // Handle async formData
    const formData = await request.formData();
    // Access all values from amenities and images
    const amenities = formData.getAll("amenities");
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");
    // Create property data object for database
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        nightly: formData.get("rates.nightly"),
        monthly: formData.get("rates.monthly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };
    // Upload image(s) to cloudinary
    const imageUploadPromises = [];
    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);
      // Convert image data to base64
      const imageBase64 = imageData.toString("base64");
      // Upload to cloudinary
      const uploadPromise = cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "propertypulse",
        },
      );
      imageUploadPromises.push(uploadPromise);
      // Wait for all images to upload
      // Add uploaded images to property data object
    }
    const uploadedImagesResults = await Promise.all(imageUploadPromises);
    propertyData.images = uploadedImagesResults.map(
      (result) => result.secure_url,
    );
    const newProperty = new Property(propertyData);
    await newProperty.save();
    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`,
    );
    // return new Response(JSON.stringify({ message: "success" }), {
    //   status: 200,
    // });
  } catch (err) {
    return new Response("Failed to add property", { status: 500 });
  }
};
