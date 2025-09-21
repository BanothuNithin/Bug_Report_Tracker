import Bug from "../models/Bug.js";

export const createBug = async (req, res) => {
  try {
    const bug = new Bug({ ...req.body, reporter: req.user.id });
    await bug.save();
    res.status(201).json(bug);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getBugs = async (req, res) => {
  try {
    const { status, severity, search } = req.query;
    let query = {};

    if (req.user.role !== "admin") query.reporter = req.user.id;
    if (status) query.status = status;
    if (severity) query.severity = severity;
    if (search) query.title = { $regex: search, $options: "i" };

    const bugs = await Bug.find(query).populate("reporter", "name email");
    res.json(bugs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) return res.status(404).json({ error: "Bug not found" });

    if (req.user.role !== "admin" && bug.reporter.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    bug.status = req.body.status || bug.status;
    await bug.save();
    res.json(bug);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
