const Sequelize=require("sequelize");
const user=require("../models/user");
const sequelize=require("../db/db");
const uniqueid=require("uniqid");

const recruiter=sequelize.define("recruiter",{
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
    userId:{
        type:Sequelize.UUID,
        allowNull:false,
        references: {
            model: user, 
            key: 'id',
         }
    },
    employeeId:{
        type:Sequelize.STRING,
        allowNull:true
    },
    mainId:{
        type:Sequelize.UUID,
        allowNull:false
    },
    firstName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    lastName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    mobile:{
        type:Sequelize.STRING,     //change to allowNull:false
        allowNull:true,
    },
    companyName:{
        type:Sequelize.STRING,
    },
    companyAddress:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    companyWebsite:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    headOfficeLocation:{
        type: Sequelize.STRING,
        allowNull: true,
      },
    branchOfficeLocation:{
        type: Sequelize.STRING,
        allowNull: true,
      },
    capabilities:{
        type: Sequelize.STRING,
        allowNull: true,
      },
    recruiterCapacity:{
        type: Sequelize.STRING,
        allowNull: true,
      }
},
{
    indexes: [
        {
            unique: true,
            fields: ['id']
        },
        {
            fields: ["mainId","mobile"]
        }
    ]
  }
);
recruiter.belongsTo(user);
user.hasOne(recruiter);
module.exports=recruiter;