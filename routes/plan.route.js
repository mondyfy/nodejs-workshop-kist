module.exports = app => {
    const plans = require("../controllers/plan.controller.js");
    var router = require("express").Router();
    
    // Create a new Plan
    router.post("/", plans.create);

    // Retrieve all Plans
    router.get("/", plans.findAll);

    // Retrieve all completed Plans
    router.get("/completed", plans.findAllCompleted);

    // Retrieve a single Plan with id
    router.get("/:id", plans.findOne);

    // Update a Plan with id
    router.put("/:id", plans.update);

    // Delete a Plan with id
    router.delete("/:id", plans.delete);

    // Create a new Plan
    router.delete("/", plans.deleteAll);

    app.use('/api/plans', router);
};

