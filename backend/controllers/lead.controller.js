const Lead = require("../models/lead.model");
const csv = require("csv-parser");
const stream = require("stream");
const generateEmail = require("../services/generateEmail");
const userModel = require("../models/user.model");
const { analyzeLead } = require("../services/aiLeadAnalyzer");


const uploadLeads = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const user = await userModel.findOne({ _id: req.user.userId });

    const leads = [];

    const ext = req.file.originalname.split(".").pop().toLowerCase();
    if (ext !== "csv") {
      return res.status(400).json({ message: "Only CSV files are allowed!" });
    }
    const buffer = req.file.buffer;

    const readable = new stream.Readable();
    readable._read = () => { };
    readable.push(buffer);
    readable.push(null);

    readable
      .pipe(csv())
      .on("data", (row) => {
        if (!row.company_name || !row.website) return res.status(400).json({ message: "company_name and website are required for all leads" });

        leads.push({
          userId: req.user.userId,
          companyName: row.company_name,
          website: row.website,
          industry: row.industry || "",
          contactName: row.contact_name || "",
          email: row.email || "",
          status: "pending",
          subject: "",
          emailBody: "",
        });
      })
      .on("end", async () => {
        if (leads.length === 0) {
          return res.status(400).json({ message: "No valid leads found in CSV" });
        }
        if (user.credits < leads.length) {
          return res.status(400).json({
            message: "Not enough credits"
          })
        }
        const batchSize = 10

        for (let i = 0; i < leads.length; i += batchSize) {

          const batch = leads.slice(i, i + batchSize)

          await Promise.all(
            batch.map(async (lead) => {
              const aiResult = await analyzeLead(lead)
              lead.score = aiResult.score
              lead.quality = aiResult.quality
              return Lead.create(lead)
            })
          )

        }

        user.credits -= leads.length;
        await user.save();

        return res.status(200).json({ message: "Leads uploaded successfully", count: leads.length });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getLeads = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.user.userId });
    const leads = await Lead.find({ userId: req.user.userId }).sort({ createdAt: -1 }).lean();
    if (!leads) {
      return res.status(400).json({ message: "No leads found" });
    }

    res.status(200).json({ leads, credits: user.credits });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const generateEmailForLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    const emailContent = await generateEmail(lead);


    if (!emailContent.success) {
      lead.status = "failed";
      await lead.save();
      return res.status(400).json({ error: "Email generated Failed", success: false })
    }
    lead.subject = emailContent.subject;
    lead.emailBody = emailContent.body;
    lead.status = "generated";

    await lead.save();
    res.status(200).json({ message: "Email generated successfully", lead });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

const getLeadInsights = async (req, res) => {

  const leads = await Lead.find({ userId: req.user.userId });

  const totalLeads = leads.length

  const high = leads.filter(l => l.quality === "High").length
  const medium = leads.filter(l => l.quality === "Medium").length
  const low = leads.filter(l => l.quality === "Low").length

  res.status(200).json({
    totalLeads,
    high,
    medium,
    low
  })

}

module.exports = { uploadLeads, getLeads, generateEmailForLead, getLeadInsights };