const Recipe = require('../models/recipe.model.js');

// Create and Save a new recipe
exports.create = (req, res) => {
  // Validate request
      if(!req.body.content) {
          return res.status(400).send({
              message: "Recipe content can not be empty"
          });
      }

      // Create a recipe
      const recipe = new Recipe({
          title: req.body.title || "Untitled Reecipe",
          content: req.body.content
      });

      // Save recipe in the database
      recipe.save()
      .then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while creating the Recipe."
          });
      });
};

// Retrieve and return all recipes from the database.
exports.findAll = (req, res) => {
  Recipe.find()
      .then(recipes => {
          res.send(recipes);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving recipes."
          });
      });
};

// Find a single recipe with a recipeId
exports.findOne = (req, res) => {
  Recipe.findById(req.params.recipeId)
      .then(recipe => {
          if(!recipe) {
              return res.status(404).send({
                  message: "Recipe not found with id " + req.params.recipeId
              });
          }
          res.send(recipe);
      }).catch(err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "Recipe not found with id " + req.params.recipeId
              });
          }
          return res.status(500).send({
              message: "Error retrieving recipe with id " + req.params.recipeId
          });
      });
};

// Update a recipe identified by the recipeId in the request
exports.update = (req, res) => {
  // Validate Request
      if(!req.body.content) {
          return res.status(400).send({
              message: "Recipe content can not be empty"
          });
      }

      // Find recipe and update it with the request body
      Recipe.findByIdAndUpdate(req.params.recipeId, {
          title: req.body.title || "Untitled Recipe",
          content: req.body.content
      }, {new: true})
      .then(recipe => {
          if(!recipe) {
              return res.status(404).send({
                  message: "Recipe not found with id " + req.params.recipeId
              });
          }
          res.send(recipe);
      }).catch(err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "Recipe not found with id " + req.params.recipeId
              });
          }
          return res.status(500).send({
              message: "Error updating recipe with id " + req.params.recipeId
          });
      });
};

// Delete a recipe with the specified recipeId in the request
exports.delete = (req, res) => {
  Recipe.findByIdAndRemove(req.params.recipeId)
      .then(recipe => {
          if(!recipe) {
              return res.status(404).send({
                  message: "Recipe not found with id " + req.params.recipeId
              });
          }
          res.send({message: "Recipe deleted successfully!"});
      }).catch(err => {
          if(err.kind === 'ObjectId' || err.name === 'NotFound') {
              return res.status(404).send({
                  message: "Recipe not found with id " + req.params.recipeId
              });
          }
          return res.status(500).send({
              message: "Could not delete recipe with id " + req.params.recipeId
          });
      });
};
