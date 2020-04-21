const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', RecipeSchema);
