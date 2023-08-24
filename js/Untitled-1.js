

class User {
    constructor(name, age){
        this.userName = name;
        this.userAge = age;
    }

    getName() {
        return this.userName;
    }

    setName(name) {
        this.userName = name;
    }

    getAge() {
        return this.userAge;
    }

    setAge(age) {
        this.userAge = age;
    }
    
}


const Samat = new User('Samat', 19);

console.log(Samat.getName(), Samat.getAge());