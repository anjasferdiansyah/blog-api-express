const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const {
  createProfileUser,
  updateProfileUser,
} = require("../db/profile.repository");
const { findUserById } = require("../db/user.repository");

const getUserProfile = async (req, res) => {
  try {
    const id = req.user.id;

    const userProfile = await findUserById(id);
    return res.status(200).send({
      message: "Get User Profile Success",
      data: userProfile,
    });
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
};

const createProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, bio } = req.body;
    console.log(userId, firstName, lastName, bio);

    const createdProfile = await createProfileUser(userId, {
      firstName,
      lastName,
      bio,
    });
    return res.status(201).send({
      message: "Create Profile Success",
      data: createdProfile,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const id = req.user.id;

    const { firstName, lastName, bio } = req.body;

    const updatedProfile = await updateProfileUser(id, {
      firstName,
      lastName,
      bio,
    });
    return res.status(201).send({
      message: "Update Success",
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

const uploadProfilePicture = async (req, res) => {
  try {
    const storage = getStorage();

    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: req.file.mimetype,
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(
      storage,
      `profilePictures/${req.file.originalname + "-" + Date.now()}`
    );
    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );

    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log(downloadURL);

    // store url in database

    await updateProfileUser(req.user.id, {
      picture: downloadURL,
    });

    return res.status(201).send({
      message: "Update Success",
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
      url: downloadURL,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  getUserProfile,
  uploadProfilePicture,
  createProfile,
  updateProfile,
};
