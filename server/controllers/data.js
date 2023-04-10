const { hasUser } = require("../middlewares/guards");
const {
  create,
  getLastFour,
  getAll,
  getHotelById,
  deleteById,
  likeHotel,
  updateById,
  getByIdHotels,
  search,
} = require("../services/item");
const { parseError } = require("../util/parser");
const { s3UploadImg } = require("../middlewares/imagesUpload");
const { createBooking, getByIdHReservations } = require("../services/booking");

const dataController = require("express").Router();

dataController.get("/last-hotels", async (req, res) => {
  const hotels = await getLastFour();
  res.status(200).send({ latestHotels: hotels });
});

let currentSKU = 1;

const getNextSKU = () => {
  const sku = currentSKU.toString().padStart(4, "0");
  currentSKU += 1;
  return sku;
};

dataController.post("/create", s3UploadImg(), hasUser(), async (req, res) => {
  try {
    req.body = JSON.parse(JSON.stringify(req.body));

    const categories = JSON.parse(req.body.categories);
    const splitCategories = categories.map((category) =>
      category.trim().replace(/\s+/g, "-").toLowerCase()
    );

    req.body.imageUrls = req.files.map((img) => img.location);

    const sku = await getNextSKU();
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const createdAt = new Date();
    const variation = JSON.parse(req.body.variations);

    const data = {
      sku,
      name: req.body.productName,
      price: Number(req.body.price),
      image: req.body.imageUrls,
      new: createdAt > oneWeekAgo,
      variation,
      category: splitCategories,
      fullDescription: req.body.description,
      shortDescription: "dadadadada",
      rating: 5,
      discount: 10,
      offerEnd: "October 2, 2024 12:11:00",
      saleCount: 55,
    };

    if (Object.values(data).some((v) => !v || v === null)) {
      throw new Error(`All fields are required`);
    }
    if (req.body.imageUrls.length < 1) {
      throw new Error("At least one Image is required!");
    }
    console.log(data);
    const createdData = await create(data);
    res.status(201).send({
      message: "Successfully uploaded " + req.files.length + " files!",
      createdData,
    });
  } catch (error) {
    const message = parseError(error);
    res.status(400).json({ message });
  }
});

dataController.get("/all-hotels", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = 100;
    const skip = parseInt(page * limit);
    const data = await getAll(skip, limit);
    res.status(200).json(data);
  } catch (error) {
    const message = parseError(message);
    res.status(400).json({ message });
  }
});

dataController.get("/details/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await getHotelById(id);
    res.status(200).send({ data });
  } catch (error) {
    const message = parseError(error);
    res.status(400).json({ message });
  }
});

dataController.delete("/product/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await deleteById(id);
    res.status(200).send({ data });
  } catch (error) {
    const message = parseError(error);
    res.status(400).json({ message });
  }
});

dataController.put("/edit/:id", s3UploadImg(), async (req, res) => {
  try {
    if (req.files) {
      req.body.imageUrls = req.files.map((img) => img.location);
    }
    if (req.body.owner != req.user._id) {
      throw new Error("Unauthorized");
    }
    const data = {
      sku: getNextSKU(),
      hotelName: req.body.hotelName,
      roomType: req.body.roomType,
      location: req.body.location,
      address: req.body.address,
      stars: Number(req.body.stars),
      description: req.body.description,
      price: Number(req.body.price),
      imageUrls: req.body.imageUrls,
      facilities: req.body.facilities,
    };
    if (Object.values(data).some((v) => !v || v === null)) {
      throw new Error(`All fields are required`);
    }

    const id = req.params.id;
    const userId = req.user._id;
    const UpdateData = await updateById(id, userId, data);
    console.log(UpdateData);
    res.status(200).send({
      message: "Successfully uploaded " + req.files.length + " files!",
      UpdateData,
    });
  } catch (error) {
    const message = parseError(error);
    res.status(400).json({ message });
  }
});

dataController.post("/search", async (req, res) => {
  try {
    const query = Object.entries(req.body).reduce((accObj, [key, value]) => {
      if (value !== undefined && value !== null) {
        if (key == "price") {
          accObj[key] = { $lte: Number(value) };
        } else if (key == "stars") {
          accObj[key] = { $gte: Number(value) };
        } else {
          accObj[key] = value;
        }
      }
      return accObj;
    }, {});
    const data = await search(query);
    res.status(200).send(data);
  } catch (error) {
    const message = parseError(error);
    res.status(400).send({ message });
  }
});

module.exports = dataController;
