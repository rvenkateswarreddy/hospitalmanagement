import app from "./app.js";
import cloudinary from "cloudinary";
import dotEnv from "dotenv";
import { User } from "./models/userSchema.js";
import { Appointment } from "./models/appointmentSchema.js";

dotEnv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});

app.get("/getalldetails/:nic", async (req, res, next) => {
  try {
    const { nic } = req.params;

    // Find the user with the provided mobile number
    const user = await User.findOne({ nic: nic });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Fetch related appointments of the user
    const appointments = await Appointment.find({ nic: nic });

    // You may need to fetch additional details like doctor details
    // For simplicity, let's assume appointment already contains doctor details

    res.status(200).json({
      success: true,
      user,
      appointments,
      // Add other related details if needed
    });
  } catch (error) {
    next(error);
  }
});
