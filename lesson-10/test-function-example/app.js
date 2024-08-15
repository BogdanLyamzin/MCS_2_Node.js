import User from "./classes/User.js";

const user = new User("Jhon", "MacCree");

console.log(user.fullName);
user.name = "Alex";
console.log(user.fullName);
if(Object.keys(user).length === 2) {

}