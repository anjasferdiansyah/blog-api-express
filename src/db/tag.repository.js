const prisma = require("../utils/prisma");

const findTags = async () => {
  const tags = await prisma.tag.findMany();
  return tags;
};

const findTagById = async (id) => {
  const tag = await prisma.tag.findUnique({
    where: {
      id: id,
    },
  });

  return tag;
};

const connectOrCreateTag = async (tags) => {
  const existingTags = await prisma.tag.findMany({
    where: {
      name: {
        in: tags,
      },
    },
  });

  let connectedTags = [];

  for (const item of existingTags) {
    connectedTags.push({ id: item.id });
  }

  const newTags = tags.filter(
    (tag) => !existingTags.some((t) => t.name === tag)
  );

  for (const newTagName of newTags) {
    const newTag = await prisma.tag.create({
      data: {
        name: newTagName,
      },
    });
    connectedTags.push({ id: newTag.id });
  }

  return connectedTags;
};

module.exports = {
  findTags,
  findTagById,
  connectOrCreateTag,
};
