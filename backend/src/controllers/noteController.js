import Note from "../models/Note.js";

export async function getAllNotes (req, res) {
    // res.status(200).json({message:"Get all notes successfully"});
    try {
        const notes = await Note.find()
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error", error)
        res.status(500).json({message:"Internal server error"})
    }
}

export async function getNoteByID (req, res) {
    // res.status(200).json({message:"Get all notes successfully"});
    try {
        const note = await Note.findById(req.params.id)
        if(!note) return res.status(404).json({message:"record not found"})
        res.status(200).json(note)
    } catch (error) {
        console.error("Error", error)
        res.status(500).json({message:"Internal server error"})
    }
}

export async function createNote (req, res) {
    // res.status(201).json({message:"Created successfully"});
    try {
        const {title, content} = req.body
        const note = new Note({title:title, content:content})
        const savedNote = await note.save()
        res.status(201).json(savedNote)
    } catch (error) {
        console.error("Error", error)
        res.status(500).json({message:"Internal server error"})
    }
}

export async function updateNote (req, res) {
    // res.status(200).json({message:"updated successfully"});
    try {
        const {title, content} = req.body
        const updatedNote = await Note.findByIdAndUpdate
                                (req.params.id, 
                                {title:title, content:content},
                                {
                                    new: true,
                                });
        if(!updatedNote)
            return res.status(404).json({message:"record not found"})
        res.status(200).json(updatedNote)
    } catch (error) {
        console.error("Error", error)
        res.status(500).json({message:"Internal server error"})
    }
}


export async function deleteNote (req, res) {
    // res.status(200).json({message:"updated successfully"});
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote)
            return res.status(404).json({message:"record not found"})
        res.status(200).json({message:"Note deleted successfully!"})
    } catch (error) {
        console.error("Error", error)
        res.status(500).json({message:"Internal server error"})
    }
}