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

dataController.delete("/details/:id", async (req, res) => {
  try {
    console.log("DELETE");
    const id = req.params.id;
    const data = await deleteById(id);
    res.status(200).send({ data });
  } catch (error) {
    const message = parseError(error);
    res.status(400).json({ message });
  }
});

dataController.put("/details/like/:id", hasUser(), async (req, res) => {
  try {
    console.log("GET");
    const userId = req.user._id;
    const hotelId = req.params.id;
    await likeHotel(userId, hotelId);
    res.status(200).json("success");
  } catch (error) {
    const message = parseError(error);
    res.status(400).json({ message });
  }
});

dataController.get("/likes", async (req, res) => {
  try {
    const userId = req.user._id;

    const hotels = await getByIdHotels(userId);
    res.status(200).send(hotels.likedHotels);
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
      discount: 10,
      offerEnd: "October 5, 2024 12:11:00",
    };
    if (Object.values(data).some((v) => !v || v === null)) {
      throw new Error(`All fields are required`);
    }

    const id = req.params.id;
    const userId = req.user._id;
    const UpdateData = await updateById(id, userId, data);
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

dataController.post("/reservation", async (req, res) => {
  try {
    const data = {
      checkIn: req.body.checkIn.split("T")[0],
      checkOut: req.body.checkOut.split("T")[0],
      guests: req.body.guests,
    };
    console.log(data);
    if (Object.values(data).some((v) => !v || v === "")) {
      throw new Error(`All fields are required`);
    }

    data.hotel = req.body.hotel;

    const createdReservation = await createBooking(data, req.user._id);
    console.log(createdReservation);
    res.status(200).send({
      message: "Successfully booked this hotel. ",
      createdReservation,
    });
  } catch (error) {
    const message = parseError(error);
    res.status(400).send({ message });
  }
});

dataController.get("/reservations", async (req, res) => {
  try {
    const userId = req.user._id;

    const hotels = await getByIdHReservations(userId);
    res.status(200).send(hotels.reservations);
  } catch (error) {
    const message = parseError(error);
    res.status(400).send({ message });
  }
});

module.exports = dataController;
