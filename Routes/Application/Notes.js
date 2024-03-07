const router = require("express").Router();
const NotesCollection = require("../../Models/Application/Notes")


// API End Point for create notes 

router.post("/createNote", async (req, res) => {
    try {
        const { id, notesData,notesTitle} = await req.body;

    const saveNotes = await NotesCollection({
        userId: id,
        notesTitle:notesTitle,
        notesData:notesData
    })
    
    const savedNotes = await saveNotes.save();

    if (savedNotes) {
        // console.log(savedNotes);
        res.status(200).json({
            success: false,
            message: "Notes saved successfully"
        })
    } else {
      c
    }
    // console.log(id, notesData);
    } catch (error) {
        console.log("Error Occurred:", error);
        res.status(500).json({
            success: false,
            message: "Server Busy"
        })
  }
});

// API End Point for update notes 

router.put("/updateNote", async (req, res) => {
    try {
        const { id, notesData,notesTitle} = await req.body;
    
        const updatedNotes = await NotesCollection.updateOne({ _id: id }, { $set: { notesTitle: notesTitle, notesData: notesData,savedDate:new Date() } });

    if (updatedNotes) {
        // console.log(savedNotes);
        res.status(200).json({
            success: true,
            message: "Notes Updated successfully"
        })
    } else {
        res.status(400).json({
            success: false,
            message: "Error in updating details"
        })
    }
    // console.log(id, notesData);
    } catch (error) {
        console.log("Error Occurred:", error);
        res.status(500).json({
            success: false,
            message: "Server Busy"
        })
  }
})

// API for get all the created notes

router.get("/getNotes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // console.log("id", id);

        if (id) {
        
            const notesData = await NotesCollection.find({ userId: id });

            console.log(notesData);
            if (notesData) {
                res.status(200).json({
                    success: true,
                    message: "Notes Fetched Successfully",
                    notesList: notesData
                })
            } else {
                res.status(201).json({
                    success: false,
                    message: "No notes avail"
                })
            }

        }
    } catch (error){
        console.log("Error Occurred:", error);
}
})

// API for delete notes

router.delete("/deleteNote/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // console.log("id", id);

        if (id) {
        
            const notesData = await NotesCollection.deleteOne({ _id: id });

            if (notesData) {
                res.status(200).json({
                    success: true,
                    message: "Notes Deleted Successfully"
                })

            } else {
                res.status(400).json({
                    success: false,
                    message: "Error in deleting notes"
                })
            }

        }
    } catch (error){
        console.log("Error Occurred:", error);
}
})

module.exports = router;