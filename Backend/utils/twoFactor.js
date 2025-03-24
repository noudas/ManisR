const twofactor = require("node-2fa");
const { User } = require("../models/user");

const newSecret = twofactor.generateSecret({ name:"ManishR", account:"test"})