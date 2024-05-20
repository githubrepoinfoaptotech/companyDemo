const sequelize = require("../db/db");
const Sequelize = require("sequelize");
const recruiter = require("./recruiter");
const requirement = require("./requirement");




const requirementRecruiters = sequelize.define("requirementRecruiters", {
    id: {
        type: Sequelize.UUID,
        unique: true,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    mainId: {
        type: Sequelize.UUID,
        allowNull: true
    },
    assignedBy:{
        type: Sequelize.UUID,
        allowNull: true
    },
    isActive:{
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue:true
    },
    
},
    {
        indexes: [
            {
                unique: true,
                fields: ['id']
            },
            {
                fields: ['createdAt','requirementId','recruiterId']
            }
        ]
    } 
     
    
);


requirementRecruiters.belongsTo(recruiter);
recruiter.hasMany(requirementRecruiters);

requirementRecruiters.belongsTo(requirement);
requirement.hasMany(requirementRecruiters);




// candidate.sync();
module.exports = requirementRecruiters;