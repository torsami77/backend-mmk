import sequelize from "../database";
import account_model from "../models/account.models";
import phone_number_model from "../models/phone_number.models";

sequelize.authenticate().then(async() => {
    console.log("database connnected");

    try {
        await account_model.destroy({where: {}}).then(function () {});
        await phone_number_model.destroy({where: {}}).then(function () {});

    } catch (error:any) {
        console.log(error.message)
        console.log('Migrations probably already undone');
    }

}).catch((e:any) => {
    console.log(e.message);
})