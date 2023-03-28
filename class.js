'use stric';

//* class 와 object 차이점을 알기 
// class 개념 
//속성 field => speak(); 행동 =>method 
// class person {
//   name;
//   age;
//   speak();
// }
// class 는 templete 에 속한다. 
// object : instance of a class  
// < 언어 구현 세부사항 > 
// JavaScript classes
// -introduced in ES6
//프로토타입을 베이스로 기반해서 문법만 클래스가 추가된 것이다. 
 
// methods 들어가지않고 , field 만 들어간 경우로도 많이 쓰인다. 
// 객채지향언어 
// 1. 캡슐화 
// 2. 상속과 댜양성 
// 만약 쇼핑몰을 만든다면? 수강신청폼을 만든다면 어떻게 class로 정의할 지 생각해보기 ! 
 
// class  붕어빵을 만들 수 있는 틀을 말한다. 정의만 한 것 
// 클래스 자체에는 값이 들어가지 않고, 어떤 값이 들어갈 수 있다라는 정의만한다.
// 실제로 데이터를 넣어서 만드는것이 object
// 클래스를 이용해서 새로운 instance 를 생성하면 object 가 되는것이다.
// 붕어빵= object  붕어빵틀 = class

//1.class 선언 
class Person{
  //생성자를 만든다. 필요한 데이터를 전달한다 -> 전달된 데이터를 바로 할당한다.
  constructor(name, age) {
    //fileds 
    this.name = name;
    this.age = age;
  }

  //methods
  speak() {
    console.log(`${this.name} 허리 펴 ! 바른자세!!@`); 
  }
}

// 2. object 생성
const heeny = new Person('heeny', 20); 
console.log(heeny.name);
console.log(heeny.age); 
heeny.speak();
 
// - getter 와 setter 
// 사용자가 getter 에서 잘못설정하면 개발자 setter 에서 방어하는것 
// 다른 사람이 설정하는게 좋을까 ? nope!
// 인캡슐레이션 -> 프라이빗하게 설정하는것 
class User{
  constructor(firstName, lastName , age) {
    this.firstName = firstName;
    this.lastName = lastName ;
    this.age = age ;
  }
  get age(){
    return this._age;
  }
  set age(value){ 
    // if(value< 0) {
    //   throw Error('나이 0 이상으로 설정해 !');
    // } // 1번방법 : 직접적으로 설정하는법 . 

    this._age= value < 0 ? 0 : value;
    //0으로 지정 출력
  }
}
//보통은 underbar 기호를 이용해서 getter setter 이름 설정한다. 
const user1= new User('jiny','jung', -1 );
console.log(user1.age);
// 사람의 나이가 -1으로  '잘못' 설정된 상황 
// User 라는 field 안에는 1. firstname 2.lastname 3. _age  세개가있다. 

// field 는 _age 이지만, age로 호출가능한 이유는 내부적으로 get ,set 이 있기 때문이다. 
 
// -  Fields  => Public field & Private field
class Experiment {
  publicField = 2; 
  #privateField =0;
}
const experiment = new Experiment();
console.log(experiment.publicField);  // 2
console.log(experiment.privateField); // undefined


//-Static 
//오브젝트에 상관없이 class에 연결되어있는것 .??
class Aritcle {
  static publisher = 'heen coding';
  constructor(articleNumber){
    this.articleNumber =articleNumber; 
  }
  static printPublisher(){
    console.log(Aritcle.publisher);
  }
}
const article1 = new Aritcle(1);
const article2 = new Aritcle(2);
// console.log(article1.publisher);//undefined 
// object 안에 publisher 안에 값이 지정되지않았음 
// static은  objedct마다 값이 할당되는 것이 아니다.  class 자체 즉 Aritcle 에 값이 붙어있음. 
console.log(Aritcle.publisher); //heen coding 
Aritcle.printPublisher();// heen coding 
// 타입스크립트에서도 굉장히 많이 쓰임
// 장점 :  들어오는 데이터에 상관없이 공통적으로 class에서 쓸 수 있는거라면
// static , static method를 통해서 작성하면 메모리 사용을 줄일 수 있다. 

// - 상속과 다양성 
// 브라우저에 다양한 도형이 들어간 웹 어플리케이션을 만든다면? 다양한 도형을 
//class 로 어떻게 정의할 수 있을까 ? 
// 너비와 색상 높이 등등이 있을 것.
// 계속 반복 되어지는 것들을 각각 따로만들어서 동일한 내용을 수행하는것보다 
// 공통적으로 쓰이는 속성값을 재사용해서 간편하게 한다 
//장점 : 1. 타이핑을 적게할 수 잇음  2. 유지보수가 좋다 

class Shape {
  // 총 3가지의 fields 
  constructor(width, height, color){
    this.width = width;
    this.height = height;
    this.color = color ;
  }

  // draw method
  draw() {
    console.log(`drawing ${this.color} color !`);
  }
  // getArea method 
  getArea (){
    return this.width * this.height ;
  }
}
class Rectangle extends Shape {
  draw(){
      super.draw();
    console.log('🟨') // 부모  super 
  }
}
 
//필요한 함수만 다시 정의해서 사용할 수 있다. ! 
class Triangle extends Shape {
  draw(){
      super.draw();  // 부모의 method 도 호출되고 이어서 draw 도 호출된다
    console.log('🔺');  
  }
  getArea (){
    return this.width * this.height/ 2 ;  // 200 삼각형
  }
  toString(){
      return `Triangle color: ${this.color}`;
  }
}
const rectangle = new Rectangle(20, 20, 'yellow');
rectangle.draw();
console.log(rectangle.getArea()); // 400 사각형 
const triangle = new Triangle(20, 20, 'red');
triangle.draw();
console.log(triangle.getArea()); //200 삼각형 

// - instance of  클래스를 이용해서 만들어진 것 
// 왼쪽의 object 가 오른쪽의 class 를 이용해서 만들어진 것인지 확인한다. 
// true false 
console.log(rectangle instanceof Rectangle); //true
console.log(triangle instanceof Rectangle);// false
console.log(triangle  instanceof Triangle);//true
console.log(triangle  instanceof Shape);//true shape을 상속함
console.log(triangle  instanceof Object);//true 
// 자스에서 만든 모든!!!! object class 들은 object 를 상속한 것 
console.log(triangle.toString()); // [Object Object]
// triangle toString 지정해줌으로써 -> color :red 출력! 








