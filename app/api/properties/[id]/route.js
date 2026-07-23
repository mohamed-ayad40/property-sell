import connectDB from "@/config/database";
import Property from "@/models/Property";
import mongoose from "mongoose";
import { getUserSession } from "@/utils/getUserSession";

// GET /api/properties/:id
export const GET = async (request, {params}) => {
    try {
        const {id} = await params;
        await connectDB();
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return new Response("Property not found", {status: 404});
        }
        const property = await Property.findById(id);
        if (!property) return new Response("Property not found", {status: 404});
        return Response.json(property);
    } catch (err) {
        console.log(err);
        return new Response("Something Went Wrong", {status: 500});
    }
}
// DELETE /api/properties/:id
export const DELETE = async (request, {params}) => {
    try {
        const {id} = await params;
        const userSession = await getUserSession();
        // Check for session
        if (!userSession || !userSession.userId) {
            return new Response("User ID is required", {status: 401});
        }
        const {userId} = userSession;
        await connectDB();
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return new Response("Property not found", {status: 404});
        }
        const property = await Property.findById(id);
        if (!property) return new Response("Property not found", {status: 404});
        // Verify ownership
        if(property.owner.toString() !== userId) {
            return new Response("Unauthorized", {status: 401});
        };
        await property.deleteOne();
        return new Response("Property Deleted");
    } catch (err) {
        console.log(err);
        return new Response("Something Went Wrong", {status: 500});
    }
}
// PUT /api/properties/:id
export const PUT = async (request, {params}) => {
  try {
    // Connect DB
    await connectDB();
    // Get user session
    const userSession = await getUserSession();
    if (!userSession || !userSession.userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    const {id} = await params;
    const { userId } = userSession;
    // Handle async formData
    const formData = await request.formData();
    // Access all values from amenities
    const amenities = formData.getAll("amenities");
    // Get property to update
    const existingProperty = await Property.findById(id);
    if (!existingProperty) return new Response("Property doesn't exist", {status: 404});
    // Verify ownership
    if(existingProperty.owner.toString() !== userId) return new Response("Unauthorized", {status: 401})
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
    // Update property in database
    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);
    return new Response(JSON.stringify(updatedProperty), {
      status: 200,
    });
  } catch (err) {
    return new Response("Failed to add property", { status: 500 });
  }
};
