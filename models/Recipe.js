import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        ingredients: { type: [String], required: true },
        instructions: { type: String, required: true },
        image: { type: String }, // Optional Image URL
    },
    { timestamps: true }
);

export default mongoose.model("Recipe", recipeSchema);
