const leadModel = require("../Models/lead.model");

// CREATE LEAD
const createLead = async (req, res) => {
    try {
        const { name, email, phone, company, source, status } = req.body;

        const lead = await leadModel.create({
            name,
            email,
            phone,
            company,
            source,
            status,

            // Get owner from verified JWT
            owner: req.user.id
        });

        return res.status(201).json({
            message: "Lead created successfully",
            lead
        });

    } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        
    }
};


// GET ALL LEADS
const getLeads = async (req, res) => {
    try {
        const leads = await leadModel.find({
            owner: req.user.id
        }).sort({ createdAt: -1 }).populate("owner", "name email");

        return res.status(200).json({
            leads
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};


// UPDATE LEAD
const updateLead = async (req, res) => {
    try {
        const { name, email, phone, company, source, status } = req.body;

        const lead = await leadModel.findOneAndUpdate(
            { _id: req.params.id, owner: req.user.id },
            { name, email, phone, company, source, status },
            { new: true, runValidators: true }
        );

        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        return res.status(200).json({
            message: "Lead updated successfully",
            lead
        });

    } catch (error) {
        
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


// DELETE LEAD
const deleteLead = async (req, res) => {
    try {
        const lead = await leadModel.findOneAndDelete({
            _id: req.params.id,
            owner: req.user.id
        });

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found"
            });
        }

        return res.status(200).json({
            message: "Lead deleted successfully"
        });

    } catch (error) {
        
        return res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    createLead,
    getLeads,
    updateLead,
    deleteLead
};