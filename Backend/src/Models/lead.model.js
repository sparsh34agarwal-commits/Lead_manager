const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"]
    },

    phone: {
        type: String,
        required:true,
        trim: true
    },

    company: {
        type: String,
        required: true,
        trim: true
    },

    source: {
        type: String,
        required: true,
        enum: ["Website", "LinkedIn", "Referral", "ColdCall", "Other"]
    },

    status: {
        type: String,
        enum: ["New", "Contacted", "Qualified", "Lost"],
        default: "New"
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        index: true
    }

}, {
    timestamps: true
});

const leadModel = mongoose.model("lead", leadSchema);

module.exports = leadModel;