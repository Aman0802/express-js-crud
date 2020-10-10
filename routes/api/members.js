const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const members = require("../../Members");

// gets all members
router.get("/", (req, res) => {
  res.json(members);
});

// get a single member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `Member ${req.params.id} not found` });
  }
});

//create a member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include a name and email" });
  }

  members.push(newMember);
  res.json(members);
});

// update member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    const updMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;
        member.status = updMember.status ? updMember.status : member.status;

        res.json({ msg: "Member updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `Member ${req.params.id} not found` });
  }
});

// delete a single member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: `Deleted the person at id ${req.params.id} succesfully`,
      data: members.filter((member) => member.id !== parseInt(req.params.id)),
    });
  } else {
    res.status(400).json({ msg: `Member ${req.params.id} not found` });
  }
});

module.exports = router;
