class prekidac{
	constructor(ime, komanda){
		this.ime = ime;
		this.komanda = komanda;
	}
}
p1 = new prekidac("prek1", "uklop")
document.getElementById("test").innerHTML = 
"Stanje prekidaca " + p1.ime + ", u položaju " + p1.komanda;

/*
class Animal { 
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Dog extends Animal {
  speak() {
    console.log(this.name + ' barks.');
  }
}

var d = new Dog('Mitzie');
d.speak(); // Mitzie barks.

document.getElementById("test").innerHTML = d.name ;

class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  
  get area() {
    return this.calcArea();
  }

  calcArea() {
    return this.height * this.width;
  }
}*/

const square = new Rectangle(10, 10);

console.log(square.area);
document.getElementById("demo2").innerHTML = square.area;


function Person(first, last, age, eye) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eye;
}

var myFather = new Person("John", "Doe", 50, "blue");
var myMother = new Person("Sally", "Rally", 48, "green");

document.getElementById("demo").innerHTML =
"My father is " + myFather.age + ". My mother is " + myMother.age; 