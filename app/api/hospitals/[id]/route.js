import Hospital from "@models/hospital";

export const GET = async (request, { params }) => {
  try {
    const hospital = await Hospital.findById(params.id).populate("creator");
    if (!hospital) return new Response("Hospital Not Found", { status: 404 });

    return new Response(JSON.stringify(hospital), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { hospital } = await request.json();

  try {
    // Find the existing Hospital by ID
    const existingHospital = await Hospital.findById(params.id);

    if (!existingHospital) {
      return new Response("Hospital not found", { status: 404 });
    }

    // Update the Hospital with new data
    existingHospital = hospital;

    await existingHospital.save();

    return new Response("Successfully updated the Hospitals", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Hospital", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    // Find the Hospital by ID and remove it
    await Hospital.findByIdAndRemove(params.id);

    return new Response("Hospital deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting hospital", { status: 500 });
  }
};
