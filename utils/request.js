const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;
export async function fetchProperties({showFeatured = false} = {}) {
  if (!apiDomain) return [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties${showFeatured ? "/featured" : ""}`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function fetchProperty(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}
