class User {
    constructor(name, lastName) {
        this.name = name;
        this.lastName = lastName;
        // this.fullName = `${name} ${lastName}`;
    }

    get fullName() {
        return `${this.name} ${this.lastName}`
    }
}

export default User;