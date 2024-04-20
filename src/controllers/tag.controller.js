const { findTags, findTagById } = require("../db/tag.repository");

const getAllTags = async (req, res) => {
  try {
    const allTags = await findTags();
    return res.status(200).send({
      message: "Get All Tags Success",
      data: allTags,
    });
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
};

const getTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const tagId = parseInt(id);
    const tagById = await findTagById(tagId);
    return res.status(200).send({
      message: "Get Tag Success",
      data: tagById,
    });
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
};

module.exports = {
  getAllTags,
  getTagById,
};
