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
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving plans."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Plans.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Plan with id = ${id}.`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Error retrieving Plan with id=" + id
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;
    Plans.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Plan was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Plan with id=${id}. Maybe Plan was not found or req.body is empty!`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Error updating Plan with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Plans.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Plan was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Plan with id=${id}. Maybe Plan was not found!`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Could not delete Plan with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Plans.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({
                message: `${nums} Plans were deleted successfully!})`
            }).catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while removing all plans."
                });
            });
        });
};


exports.findAllCompleted = (req, res) => {
    Plans.findAll({ where: { completed: true } })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Plans."
            });
        });
};