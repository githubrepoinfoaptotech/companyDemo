

const Sequelize= require("sequelize");

// const sequelize1=new Sequelize("jobportal","postgres","postgres",{
//     dialect:"postgres",
//     host:"3.14.9.124",
//     logging:false,
// });
// try {
//     sequelize1.authenticate();
//     console.log('Connection has been established successfully.');
//     } catch (error) {
//     console.error('Unable to connect to the database:', error);
//     }
    const sequelize=new Sequelize("refo_production","refo_production","AHXjRk!hbs6m9RAHXjRk!hbs6m9R$789",{
        dialect:"postgres",
        host:"refo-production-v1.ckzrrpsjwx6b.us-east-1.rds.amazonaws.com",
        logging:false,
    });
    try {
        sequelize.authenticate();
        console.log('Connection has been established successfully.');
        } catch (error) {
        console.error('Unable to connect to the database:', error);
        }

module.exports=sequelize;


