module.exports = (sequelize, Sequelize) => {
    const Plan = sequelize.define("plan",
        {
            title: { type: Sequelize.STRING },
            description: { type: Sequelize.STRING },
            completed: { type: Sequelize.BOOLEAN }
        });
    return Plan;
};
