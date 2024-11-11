const router = require("express").Router();
const NotesCollection = require("../../Models/Application/Blogs");

// API End Point for create notes

router.post("/createBlog", async (req, res) => {
  try {
    const { id, notesData, notesTitle, image } = await req.body;

    const saveNotes = await NotesCollection({
      userId: id,
      notesTitle: notesTitle,
      notesData: notesData,
    });

    const savedNotes = await saveNotes.save();

    if (savedNotes) {
      console.log(savedNotes);
      res.status(200).json({
        success: false,
        message: "Blogs saved successfully",
      });
    } else {
      console.log("Error Occurred:", error);
    }
    // console.log(id, notesData);
  } catch (error) {
    console.log("Error Occurred:", error);
    res.status(500).json({
      success: false,
      message: "Server Busy",
    });
  }
});

// API End Point for update notes

router.put("/updateBlog", async (req, res) => {
  try {
    const { id, notesData, notesTitle } = await req.body;

    const updatedNotes = await NotesCollection.updateOne(
      { _id: id },
      {
        $set: {
          notesTitle: notesTitle,
          notesData: notesData,
          savedDate: new Date(),
        },
      }
    );

    if (updatedNotes) {
      // console.log(savedNotes);
      res.status(200).json({
        success: true,
        message: "Blog Updated successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Error in updating details",
      });
    }
    // console.log(id, notesData);
  } catch (error) {
    console.log("Error Occurred:", error);
    res.status(500).json({
      success: false,
      message: "Server Busy",
    });
  }
});

// API for get all the created notes

router.get("/getBlogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("id", id);

    if (id) {
      const notesData = await NotesCollection.find({ userId: id });

      console.log(notesData);
      if (notesData) {
        res.status(200).json({
          success: true,
          message: "Blog Fetched Successfully",
          notesList: notesData,
        });
      } else {
        res.status(201).json({
          success: false,
          message: "No Blogs avail",
        });
      }
    }
  } catch (error) {
    console.log("Error Occurred:", error);
  }
});

// API for delete notes

router.delete("/deleteBlog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("id", id);

    if (id) {
      const notesData = await NotesCollection.deleteOne({ _id: id });

      if (notesData) {
        res.status(200).json({
          success: true,
          message: "Blog Deleted Successfully",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Error in deleting Blog",
        });
      }
    }
  } catch (error) {
    console.log("Error Occurred:", error);
  }
});

module.exports = router;
