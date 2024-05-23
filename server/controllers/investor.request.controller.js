const cors = require("cors");
const express = require("express");
const { uploadInvestor } = require("../utils/multer");
const Investor = require("../models/investor.request.model");
const app = express();
app.use(cors);

const createUser = async (req, res) => {
  try {
    uploadInvestor.fields([{ name: "images", maxCount: 4 }])(
      req,
      res,
      async function (err) {
        if (err) {
          console.error("Error uploading files:", err);
          return res.status(500).json({ error: "File upload failed" });
        }
        if (
          req.files["images"] &&
          req.files["images"][0].mimetype === "application/pdf"
        ) {
        }
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

        const images = req.files["images"] ? req.files["images"][0].path : null;

        const newUser = new Investor({
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
          createdDate: new Date(),
        });

        await newUser.save();
        res
          .status(201)
          .json({ message: "User created successfully", user: newUser });
      }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "User failed to create" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const value = req.params.value;
    const deletedData = await Investor.findOneAndDelete({
      user_id: value,
    });
    if (deletedData) {
      res.json(deletedData);
      console.log("User has been deleted");
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    console.error("Error deleting user", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const findUser = async (req, res) => {
  try {
    const allInvestors = await Investor.find();
    if (allInvestors.length > 0) {
      res.json(allInvestors);
    } else {
      res.status(404).json({ error: "No Investor found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createUser, findUser, deleteUser };
