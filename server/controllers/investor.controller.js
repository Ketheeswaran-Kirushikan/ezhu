const Investors = require("../models/investors.model");
const InvestorPersonRequest = require("../models/investor.request.model");
const { uploadInvestor } = require("../utils/multer");
const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors);

const verifyUser = async (req, res) => {
  try {
    console.log("Request Parameters:", req.params);
    const { _id } = req.params;
    const userRequest = await InvestorPersonRequest.findById(_id);
    if (!userRequest) {
      return res
        .status(404)
        .json({ error: "User registration request not found" });
    }

    const newUser = new Investors({
      firstName: userRequest.first_name,
      lastName: userRequest.last_name,
      emailAddress: userRequest.email,
      phoneNumber: userRequest.number,
      birthdayDate: userRequest.birthDate,
      nationalId: userRequest.nationalid,
      district: userRequest.district,
      companyName: userRequest.companyName,
      registrationNumber: userRequest.registrationNumber,
      images: userRequest.images,
      createdAt: userRequest.createdAt,
    });
    await newUser.save();
    await InvestorPersonRequest.findByIdAndDelete(_id);

    res.status(200).json({
      message: "User verified and moved to skilled person model successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(
      "Error verifying user and moving to skilled person model:",
      error
    );
    res.status(500).json({ error: "Verification and move process failed" });
  }
};

const getUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Investors.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const match = password === user.password;
    if (match) {
      const data = {
        userId: user._id,
        email: user.email,
        role: user.role,
      };
      return res.status(200).json(data);
    } else {
      return res.status(401).send("Password incorrect");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const findUser = async (req, res) => {
  try {
    const allInvestors = await Investors.find();
    if (allInvestors.length > 0) {
      res.json(allInvestors);
    } else {
      res.status(404).json({ error: "No skilled workers found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log("Deleting user with ID:", _id);
    const deletedData = await Investors.findByIdAndDelete(_id);
    if (!deletedData) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("Deleted data:", deletedData);
    res.json({
      message: "User deleted successfully",
      deletedUser: deletedData,
    });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "An error occurred during deletion" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log("Getted ID", _id);
    const detailUser = req.body;
    const user = await Investors.findByIdAndUpdate(_id, detailUser, {
      new: true,
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const createUser = async (req, res) => {
  try {
    // Handle image uploads first
    uploadInvestor.array("images", 4)(req, res, async (err) => {
      if (err) {
        console.error("Error uploading images:", err);
        return res.status(500).json({ error: "Image upload failed" });
      }

      // Extract the first image path if any
      const images = req.files?.images?.[0]?.path;

      const {
        first_name,
        last_name,
        email,
        number,
        birthDate,
        nationalid,
        district,
        companyName,
        registrationNumber,
      } = req.body;

      // Check if images were uploaded
      if (!images) {
        return res.status(400).json({ error: "Images are required" });
      }

      const newUser = new Investors({
        first_name,
        last_name,
        email,
        number,
        birthDate,
        nationalid,
        district,
        companyName,
        registrationNumber,
        images,
        createdAt: new Date(),
      });

      await newUser.save();
      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "User failed to create" });
  }
};

module.exports = {
  verifyUser,
  getUser,
  findUser,
  deleteUser,
  updateUser,
  createUser,
};
