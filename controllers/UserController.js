const UserModel = require("../models/UserModel");

const signup = async body => {
    const user = new UserModel(body);
    await user.save();
    return user;

}

const login = async body => {
    const { email, password } = body;
    console.log({email, password})
    const user = await UserModel.find({email, password})
    if (!user) throw new Error ("login failed");
    return user;
}

module.exports = {
    signup,
    login
}