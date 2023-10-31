import { Schema, model, models } from "mongoose";

const HospitalSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  description: {
    type: String,
  },
  number: {
    type: String,
  },
  street: {
    type: String,
  },
  city: {
    type: String,
    required: [true, "City is required."],
  },
  country: {
    type: String,
    required: [true, "Country is required."],
  },
  picture: {
    type: String,
    required: [true, "Picture is required."],
  },
  website: {
    type: String,
    required: [true, "Website is required."],
  },
  latitude: {
    type: String,
    required: [true, "Latitude is required."],
  },
  longitude: {
    type: String,
    required: [true, "Longitude is required."],
  },
  specialisation: {
    type: Array,
    required: [true, "Specialisation are required."],
  },
  emails: {
    type: Array,
    required: [true, "Emails are required."],
  },
  phone_numbers: {
    type: Array,
    required: [true, "Phone numbers are required."],
  },
  featured: {
    type: Boolean,
  },
});

const Hospital = models.Hospital || model("Hospital", HospitalSchema);

export default Hospital;
