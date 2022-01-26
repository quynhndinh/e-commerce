const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The /api/tags endpoint
router.get("/", async (req, res) => {
  // finds all tags and includes its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: "No tags found with this id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // finds a single tag by its id and includes its associated product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [Product],
    });

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // creates a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // updates a tag's name by its id value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
});

//deletes a tag by id
router.delete("/:id", async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: "No tags found with this id!" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;