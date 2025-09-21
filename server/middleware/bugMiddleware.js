import Bug from "../models/Bug.js";

// Middleware: Check if user can access/modify a bug
export const canModifyBug = async (req, res, next) => {
  try {
    const bug = await Bug.findById(req.params.id);

    if (!bug) {
      return res.status(404).json({ error: "Bug not found" });
    }

    // Allow if admin OR reporter is the creator
    if (
      req.user.role === "admin" ||
      bug.reporter.toString() === req.user._id.toString()
    ) {
      req.bug = bug; // attach bug to request
      return next();
    }

    return res.status(403).json({ error: "Not authorized" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export default canModifyBug;
