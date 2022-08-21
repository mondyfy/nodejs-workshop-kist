const db = require("../database/models");
const Plans = db.plans;
const Op = db.Sequelize.Op;

// Create and Save a new Plan
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Title can not be empty!"
        });
        return;
    }
    // Create a Plan
    const plan = {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed ? req.body.completed : false
    };
    // Save plan in the database
    Plans.create(plan)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the plan."
            });
        });
};

exports.findAll = (req, res) => {
    const title = req.query?.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
    Plans.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving plans."
            });
        });
};



