
//Functions
function calculateTax(income: number, taxYear: number = 2022): number{

    return income * taxYear;
}

console.log(calculateTax(1234));
console.log(calculateTax(1234, 2023));

//-------------------------------------------------------

//Type & Objects
type Employee = {
    readonly id: number,
    name: string,
    retire: (date: Date) => void
} 

let employee: Employee = {
    id: 1,
    name: 'Akintunde',
    retire : (date: Date) => {
        console.log(date);
    }
}

console.log(employee.retire(new Date));

//-------------------------------------------------------

//Union Types & Narrowing
function kbToLbs(value: number | string): number{
    //Narrowing
    if(typeof value === "number"){
        return value * 1.2;
    }else{
        return parseInt(value) * 1.2;
    }
}

console.log(kbToLbs(10));
console.log(kbToLbs('10'));

//Intersection Type
type Draggable = {
    drag : (x: number, y: number) => number
}

type Resizable = {
    resize : (width: number, height: number) => void
}

//"Draggable & Resizable" ==> Intersection
let UIWidget: Draggable & Resizable = {
    
    drag: (x: number, y: number) => {
        return x * y;
    },

    resize: (width: number, height: number) => {
        return width + height;
    }

}

//`literal Types - variables with literal types cannot take on other values asides the ones pre-defined. Else a compilation error

type Unit = 'cm' | 'mm';
let volumeUnit: Unit = 'cm';
let anotherVolumeUnit: Unit = 'mm';
// let wrongVolumeUnit: Unit = 'm';

type Quantity = 10 | 50;
let volumeQty: Quantity = 10;
let anotherQty: Quantity = 50;
// let wrongQty: Quantity = 89;


//Nullable Type
function greet(name: string | null | undefined){
    if(name == null || name == undefined){
        console.log("Holla");
    }else{
        console.log(name.toUpperCase);
        
    }
}

greet("Akintunde");
greet(null); //possinle to pass "null" because of 'name' having union type that includes "null" as a valid type
greet(undefined); //possible to pass "undefined" because of 'name' having union type that includes "undefined" as a valid type

//Null Safety Operators
type Car = {
    brand: string,
    spare: string | null,
    release_date: Date | null
}

function getCar(id: number) : Car | null | undefined {
    return id === 0 ? null : {brand:"Jaguar", spare: null, release_date: null};
}

let volvo = getCar(0);
//Optional Property Access operator
console.log(volvo?.brand);
console.log(volvo?.release_date?.getFullYear());

let arr : number[] | null = null;
//Optional element access operator
console.log(arr?.[0]);

//Optional call
let log: any = (message: string) => console.log(message)
log = null;
log?.('message');


//Nullish coaelscing - if value is null or undefined, use alternative
let speed: number | null = null;
let ride = {speed: speed ?? 30}; //'??' is the nullish coaelscing operator

//Type Assertion -> to override compiler's inferred type as we know better than the compiler
function assertType(){
    let phone = document.getElementById('phone') as HTMLInputElement; // less preferred
    let email = <HTMLInputElement> document.getElementById('email'); //better way
}


function typeCheck(x: any){
    if(typeof x === 'string'){
        //works for primitive type alone
    }

    if(x instanceof String){
        //works for primitive type
    }

    // if(x instanceof Employee){
    //     //works for custom classes
    // }
}


//Unknown type -> use this type instead of "any" when the type is unknown so the compiler can enforce function availability check
function anythingGoes(document: any){
    document.unavailableFunctionIsCalledWithoutError()
}

function functionAvailabilityCheckIsEnforced(document: unknown){
    // document.anythingDoesNotGo();
}


//never type -> used to flag functions that does not return
function consumeEvents(): never{
    while(true){
        //consume queue message
    }
}

// consumeEvents(); - //uncomment to see its beauty
console.log('It goet here'); //shows error because of the never return type

//-------------------------------------------------------

//Class
class Account{
    nickname?:string;
    private static _total_count: number = 0;
    private _balance: number = 0;

    constructor(
        public readonly id: number,
        public owner: string
    ){
        Account._total_count++;
    }

    get balance(): number{
        return this._balance;
    }

    static get total_count(): number{
        return Account._total_count;
    }

    private calculateTax(){
        //do something
    }
}

let account: Account = new Account(1, 'Mullie');
console.log(account.balance);
account.nickname = 'Mulliex';
console.log(account.nickname);
console.log(Account.total_count);


//Index Signature - add property to objects dynamically
class SeatArrangment{
    //index signature property
    [seatNumbers: string]: string
}

let arrangement = new SeatArrangment();
arrangement.A1 = 'Monininuola';
arrangement.A2 = '';
arrangement.me = 'Far';


//Inheritance - code reusability
class Person{

    constructor(public firstName: string, public lastName:string){

    }

    walk(){
        console.log('Walking');
        
    }

    get fullName(){
        return this.firstName + ' ' + this.lastName;
    }
}

class Student extends Person{

    constructor(public readonly studentId: number, firstName: string, lastName: string){
        super(firstName, lastName);
    }

    takeTest(){
        console.log('Taking test');
    }

    protected belch(){
        console.log('Release excess gas');
        
    }

}

let student: Student = new Student(1, 'Akintunde', 'Olanrewaju');
console.log(student.fullName);
// student.studentId = 3; - Error: read-only


class Teacher extends Person{
    override get fullName() {
        return 'Professor ' + super.fullName;
    }
}

console.log(new Teacher('John', 'Smith').fullName);

class Principal extends Person{
    override get fullName() {
        return `Principal ${super.fullName}`;
    }
}

//Polymorphism - Poly => Many, Morph => Forms; i.e. A class existing in many forms
let people: Person[] = [
    new Student(1, 'Adewale', 'Cole'),
    new Teacher('Smith', 'Greggs'),
    new Principal('Artemis', 'Young') //Able to add a new form of 'Person' without modifying this code block. Satisfies "Open-Close" of SOLID Principles
];

for(let person of people){
    console.log(person.fullName)
}


//Abstract Class & Method => Uncooked/not-ready classes
abstract class Shape{
    
    constructor(public colorCode:number){}

    abstract render() : void;

}

class Circle extends Shape{

    constructor(public readonly radius: number, colorCode: number){
        super(colorCode);
    }

    override render(): void {
        console.log('Redering a circle');
        
    }

}

//Abstract classes cannot be instantiated
// let shape = new Shape(1234); //Error - abstract class cannot be instantiated
let circle: Shape = new Circle(2, 3);
console.log(circle.render
    );
;

//-------------------------------------------------------

//Interface
interface Calendar{
    name: string;

    addEvent() : void;
    removeEvent() : void;
}

interface CloudCalendar extends Calendar{
    sync() : void;
}

class GoogleCalendar implements CloudCalendar{
    
    constructor(public name: string){}

    sync(): void {
        console.log('Syncing');
    }
    addEvent(): void {
        console.log('Adding event');
    }
    removeEvent(): void {
        console.log('Removing event');
    }
}

//-------------------------------------------------------

//Generics

//-> Class
class Pair<K, V>{
    constructor(public key: K, public value: V){}
}

let explicitPair = new Pair<number, string>(1, 'Me');
let implicitPair = new Pair(1, 'Me'); //Generic types inferred from ythe values

//-> Method
class ArrayUtils{
    static wrapInArray<T>(value: T){
        return [value]
    }
}

let wrapExplicit = ArrayUtils.wrapInArray<string>('Tender');
let wrapImplicit = ArrayUtils.wrapInArray(1);

//-> Interface
interface Result<T>{
    data: T | null;
    errorCode: string | null
}

function fetch<T>(url: string): Result<T>{
    console.log(`Calling ${url}`);
    return {data: null, errorCode: null};
}

interface User{
    username: string
}

interface Product{
    sku: string
}

let fetchedUser = fetch<User>('/user');
console.log(fetchedUser?.data?.username);

let fetchedProduct = fetch<Product>('/product');
console.log(fetchedProduct?.data?.sku);

//Generic Constraint

//Unbounded - takes in any type
 function unboundedEcho<T>(value: T): T{
    return value
 }
 
 unboundedEcho(1);
 unboundedEcho('I am unbounded');
 unboundedEcho(1 === 1);

 //Constained to type
 function typeBoundedEcho<T extends string | number>(value: T) : T{
    return value;
 }

 typeBoundedEcho(1);
 typeBoundedEcho('I am unbounded');
//  typeBoundedEcho(1 === 1); //Error - unsupported type

//Constrained by Interface type
function interfaceBoundedEcho<T extends Calendar>(value: T) : T{
    return value;
 }

 interfaceBoundedEcho(new GoogleCalendar("Google Calendar"));
//  interfaceBoundedEcho(new Account(1, 'Me')); //Error - unsupported type

//Constrained by Class type
function classBoundedEcho<T extends Person>(value: T) : T{
    return value;
 }

 classBoundedEcho(new Student(1, 'Adewale', 'Cole'));
 classBoundedEcho(new Teacher('Smith', 'Greggs'));
 classBoundedEcho(new Principal('Artemis', 'Young'));
//  classBoundedEcho(new Account(0, 'Me');//Error - unsupported type

//Constrained by Structure
function structureBoundedEcho<T extends {firstName: string}>(value: T) : T{
    return value;
 }
 structureBoundedEcho({firstName: 'me'});
 structureBoundedEcho({id: 1, firstName: 'me'});
 structureBoundedEcho(new Person('Akintunde', 'Olanrewaju'))
//  structureBoundedEcho(new Account(1, 'Me')) //Error - object Account has no field 'firstName' in its structure


//Extending Generics
class Store<T>{
    protected items: T[] = [];

    add(item: T){
        this.items.push(item);
    }
}

//Pass on the generic type paramater
class CompressibleStore<T> extends Store<T>{
    compress(){
        console.log('Compressing items');
        
    }
}

//Restrict the generic type parameters (to any object that has field 'name')
class SearchableStore<T extends {name: string}> extends Store<T>{
    find(name: string): T | undefined{
        return this.items.find(obj => obj.name === name)
    }
}

//Fix the generic type parameter
class ProductStore extends Store<Product>{
    filterByCategory(category: string): Product[]{
        console.log(`Category: ${category}`);
        return [];
    }
}

//-------------------------------------------------------

//keyOf Operator => Restricting argument type to defined, known properties of an object (for example)
class Basket<T>{
    private items: T[] = [];

    //Goal is to search any property of T against 'any' (although unknown type is used to enforce type checking) value
    //keyOf operator ensures only values that can be passed for argument 'key' (in this case) is a valid field of object/type T.
    find(key: keyof T, value: unknown) : T | undefined {
       return this.items.find(obj => obj[key] == value)
    }

}

//where T is Product
let baskedOfProducts = new Basket<Product>();
baskedOfProducts.find('sku', 1); //No error as field 'sku' is a valid field of type Product
baskedOfProducts.find('sku', 'a'); //No error as field 'sku' is a valid field of type Product
// baskedOfProducts.find('nonExistingProperty', 1); //Error as field 'nonExistingProperty' is NOT a valid field of type Product


//-------------------------------------------------------

//Type Mapping -> Constructing type-aliases from existing interface (or 'maybe' class) with different type or keywords constraints
interface  Commodity{
    name: string,
    price: number;
}

let baseCommodity: Commodity = {name: 'Comms', price: 200}
console.log(baseCommodity.name); //Field is readable
baseCommodity.name = 'Akintunde'; //Field is modifiable


//ReadOnly

type ReadOnlyCommodity = {
    readonly [K in keyof Commodity]: Commodity[K];
}

//Same as: ReadOnlyCommodity - howbeit more generic
type ReadOnly<T> = {
    readonly [K in keyof T]: T[K];
}

let _readOnlyCommodity: ReadOnly<Commodity> = {
    name: 'Comms', price: 200
}

console.log(_readOnlyCommodity.name); //Field is readable
// readOnlyCommodity.name = 'Akintunde'; //Field is NOT modifiable


//Optional
type Optional<T> = {
    [K in keyof T]? : T[K];
}

let optionalCommodity: Optional<Commodity> = {} //Able to initiate object without specifying field values

//Nullable
type Nullable<T> = {
    [K in keyof T]: T[K] | null;
}

let nullableCommodity: Nullable<Commodity> = { name: null, price: null} //Able to instantiate fields as null


//-------------------------------------------------------
//Functions

let functionOne = function(name: String){
    console.log(name);
}

//same as

let functionTwo = (name: string) => {
    console.log(name);
}

class Executor{
    execute(f: Function, ...args: any): void{
        f.call(this, ...args); //NB: A function can only be called in a method (belonging to a class) and not inside a function
    }
}

new Executor().execute(functionOne, 'Name')

//-------------------------------------------------------
//Exporting & Importing
import Rider from "./shapes/rides"; //Export single class from list of classes declared inside the same file
import { Phone as mobilePhone } from "./shapes/phone";
import { ClassA, ClassB } from "./shapes/enclosed"; //Import multiple classes declared inside the same file
import * as Containers from "./shapes/containers"; //Wildcard import
import StandAlone, {Vehicle} from "./shapes/standalone"; //Default export
import { Triangle, Square } from "./shapes"; //Re-exporting

let shape = new Triangle();
let container = new Containers.Bagco();
let rider = new Rider();