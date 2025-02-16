import Recipe from "../models/Recipe.js";

// Create a Recipe
export const createRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.create(req.body);
        res.status(201).json(recipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All Recipes
export const getAllRecipes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default limit to 10 recipes per page
        const skip = (page - 1) * limit;

        const recipes = await Recipe.find().skip(skip).limit(limit);
        const totalRecipes = await Recipe.countDocuments();

        res.status(200).json({
            totalRecipes,
            totalPages: Math.ceil(totalRecipes / limit),
            currentPage: page,
            recipes
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get a Single Recipe
export const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Recipe
export const updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });
        res.status(200).json(recipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a Recipe
export const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });
        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
