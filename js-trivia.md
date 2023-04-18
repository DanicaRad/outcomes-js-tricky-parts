1. What is a potential pitfall with using typeof bar === "object" to determine if bar is an object? How can this pitfall be avoided?  
- This would return true for objects arrays and ```null``` in JavaScript. It will also return true for any built-in objects created using the ```new``` operator i.e. ```const str = new String("hello")```.  
- These pitfalls can be avoided by using ```bar.constructor === Object```. It will only return true for objects, not for arrays, null, functions or built-in objects using the ```new``` prototype. 


2. What will the code below output to the console and why?  
```
(function(){
  var a = b = 3;
})();

console.log("a defined? " + (typeof a !== 'undefined'));
console.log("b defined? " + (typeof b !== 'undefined'));
```
  The output will be:  
  ```
  console.log("a defined? " + (typeof a !== 'undefined')) // false;
  ```  
  ```
  console.log("b defined? " + (typeof b !== 'undefined')) // true;
  ```  
  - Because ```var a = b = 3``` is equivalent to ```b = 3; var a = b``` where ```a``` is defined within the scope of the function and b is declared as a global variable. ```a``` cannot be defined until ```b``` is defined, and so ```b``` is defined and scoped globally.





3. What will the code below output to the console and why?   
```
var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo);
        console.log("outer func:  self.foo = " + self.foo);
        (function() {
            console.log("inner func:  this.foo = " + this.foo);
            console.log("inner func:  self.foo = " + self.foo);
        }());
    }
};
myObject.func();
```   
Answer:
```
outer func: this.foo = bar  
outer func: self.foo = bar  
inner func: this.foo = undefined  
inner func: self.foo = bar  
```  
- The ```this``` in the outer function refers to myObject, so ```self``` also refers to myObject. The inner function's ```this``` refers to the inner function itself as it is not bound as a property to myObject.  The inner function does not have a "foo" property set or defined, so it will return ```undefined```.   

4. What is the significance of, and reason for, wrapping the entire content of a JavaScript source file in a function block?  
- It encloses the code and keeps all name variables separate from other files to avoid clashes and clutering with global variables. It also obscures its contents and increases security by keeping variables, functions and data private.  

5. What is the significance, and what are the benefits, of including 'use strict' at the beginning of a JavaScript source file?  
- ```use strict``` enforces stricter rules that generally catch, throw and prevent common errors. Errors that otherwise would run silently throw specific exceptions in ```strict mode``` making debugging easier. Some ways it helps debug and catch unintentional errors:
- It prevents the creation of a new global variable if a value is assigned to an undeclared variable; it will throw an error. 
- It throws an error for duplicate funciton argument names. 
- It throws an error when referencing a null or undefined ```this``` value instead of defaulting to the global space. 
- It throws an error when the ```delete``` operator cannot be executed on an object propery instead of failing silently.  
- ```eval()``` creates its own scope in strict mode so that any variables or functions declared within do not exist in the greater scope.  


6. Consider the two functions below. Will they both return the same thing? Why or why not?
```
function foo1()
{
  return {
      bar: "hello"
  };
}

function foo2()
{
  return
  {
      bar: "hello"
  };
}
```  
- No; the first function will return ```{bar: "hello"}```, the second will return ```undefined```. This is because the line break after ```return``` in the second function will trigger a semicolon ```;``` to indicate the end of the statement. Nothing after ```return``` will be executed.  

7. What will the code below output? Explain your answer.  
```
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 == 0.3);
```  
- Not sure what the output of either will be since numbers are stored with floating point precision in Javascript and not the base-10 decimal system that's conditioned us to exoect ```0.1 + 0.2 = 0.3```. 0.1  and 0.2 will be converted into binary floats before the calculations are made which may result in unexpected rounding.  



8. In what order will the numbers 1-4 be logged to the console when the code below is executed? Why?
```
(function() {
    console.log(1); 
    setTimeout(function(){console.log(2)}, 1000); 
    setTimeout(function(){console.log(3)}, 0); 
    console.log(4);
})();
```   
- ```1, 4, 3, 2```


9. Write a simple function (less than 160 characters) that returns a boolean indicating whether or not a string is a palindrome.
```
  function isPalindrome(str) {
    const strArr = str.split("");
    let revStr = "";
    while(strArr.length) {
      let char = strArr.pop();
      revStr += char;
    }; 
    return revStr.toLowerCase() === str.toLowerCase();
  };

  /** or */

  function isPal(str) {
    return str.split("").reverse().join("").toLowerCase() === str.toLowerCase();
  }
```

10. Write a sum method which will work properly when invoked using either syntax below.  

console.log(sum(2,3));   // Outputs 5  
console.log(sum(2)(3));  // Outputs 5  

```
  function sum(num1, num2) {
    if(num1 && num2) return num1 += num2;
    return function add(n) {
      return sum(num1, n);
    }
  }
```  

11. Consider the following code snippet: 
```
for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function(){ console.log(i); });
  document.body.appendChild(btn);
}
```  
(a) What gets logged to the console when the user clicks on “Button 4” and why?  

- ```5``` will be logged when Button 4 or any other button is clicked because of the closure created by the internal onclick function. Each function will reference the same i that was created when the outer function ran and will reference it's last value, which is 5. 

(b) Provide one or more alternate implementations that will work as expected.  
```
for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function(i) {
    console.log(i); 
    });
  document.body.appendChild(btn);
}
```  
- By passing i in as an argument to the inner onclick function or ...  
```
for (let i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function(){ console.log(i); });
  document.body.appendChild(btn);
}
```  
- Using ```let i ``` instead of ```var i```.   

12. Assuming d is an “empty” object in scope, say:
```
var d = {};
```
…what is accomplished using the following code?  
```
[ 'zebra', 'horse' ].forEach(function(k) {
	d[k] = undefined;
});
``` 
- The keys ```'zebra'``` and ```'horse'``` are created with ```undefined``` values and the object is no longer empty. 

13. What will the code below output to the console and why?  

```
var arr1 = "john".split('');  
var arr2 = arr1.reverse(); 
var arr3 = "jones".split(''); 
arr2.push(arr3); 

console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1)); // "array 1: length= last=
console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));
``` 
The output will be:
```
"array 1: length= 5, last='j', 'o', 'n', 'e', 's'"
"array 1: length= 5, last='j', 'o', 'n', 'e', 's'"
```
Because the reverse nethod makesarr2 a reference to arr1, so any modifications made to arr1 will be made to arr2 and viceversa.




14. What will the code below output to the console and why ?  

console.log(1 +  "2" + "2");
  // "122"
  because "2" is a string, JS assumes the + is for string concatination
console.log(1 +  +"2" + "2");
  // "32"
  the additional ```+``` in front of "2" converts the string into a numeric, so the first operation is treated as number addition then string concatination with the additional string "2"
console.log(1 +  -"1" + "2");
  // "02"
  again, the preceding ```-``` converts "1" into a numeric valuing -1, so the first operand is 1 - 1, yieding 0. The second operand is treated as string concatination
console.log(+"1" +  "1" + "2");
  // "112"
  The unary ```+``` does convert the first "1" into a numeric, however the next two operands are treated as string concatination.
console.log( "A" - "B" + "2");
  // "NaN2"
  "A" - "B" yields NaN, then string concatination with "2"
console.log( "A" - "B" + 2);
  // NaN
  again, yields NaN but since the second operand is numeric, does not convert to string

15. The following recursive code will cause a stack overflow if the array list is too large. How can you fix this and still retain the recursive pattern?  

var list = readHugeList();

var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        nextListItem();
    }
};

rewrite:
```
var list = readHugeList();

var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        setTimeout( nextListItem, 0);
    }
};
```

The stack overflow is eliminated because the event loop handles the recursion, not the call stack. When nextListItem runs, if item is not null, the timeout function (nextListItem) is pushed to the event queue and the function exits, thereby leaving the call stack clear. When the event queue runs its timed-out event, the next item is processed and a timer is set to again invoke nextListItem. Accordingly, the method is processed from start to finish without a direct recursive call, so the call stack remains clear, regardless of the number of iterations.

16. What is a “closure” in JavaScript? Provide an  example.

example:
```
function closure() {
  const x = 2;
  function innerFunct() {
    console.log(x)
  };
  return innerFunc;
};

const myClosure = closure();
muClosure() // 2;
```

A closure is a function enclosing another function that gives you access to the outer function's scoped variables, even after the outer function has run. 

17. What would the following lines of code output to the console?

console.log("0 || 1 = "+(0 || 1));
console.log("1 || 2 = "+(1 || 2));
console.log("0 && 1 = "+(0 && 1));
console.log("1 && 2 = "+(1 && 2));
Explain your answer.

  The output would be:  
  ```
  "0 || 1 = 1"
  ```
  ```
  "1 || 2 = 1"
  ```
  ```
  "0 && 1 = 0"
  ```
  ```
  "1 && 2 = 2"
  ```
  - The or ```||``` operator will return the first true value. The ```&&``` operator will return the first value if it is false. If the statement is true, it will return the statement.  

18. What will be the output when the following code is executed? Explain.

console.log(false == '0')
console.log(false === '0')

True  
False

- ```===``` evaluates if the two values are the same type and value. Since ```false``` is a boolean and ```'0'``` is a string, the statement will be false. the ```==``` tries to coerce the two values into the same type, therefore will return true.

19. What is the output out of the following code? Explain your answer.

var a={},
    b={key:'b'},
    c={key:'c'};

a[b]=123;
a[c]=456;

console.log(a[b]);

  - The output of this code will be 456 (not 123).

- The reason for this is as follows: When setting an object property, JavaScript will implicitly stringify the parameter value. In this case, since b and c are both objects, they will both be converted to "[object Object]". As a result, a[b] anda[c] are both equivalent to a["[object Object]"] and can be used interchangeably. Therefore, setting or referencing a[c] is precisely the same as setting or referencing a[b].


20. What will the following code output to the console:

console.log((function f(n){return ((n > 1) ? n * f(n-1) : n)})(10));
Explain your answer.

- The code will output the value of 10 factorial (i.e., 10!, or 3,628,800).

- The named function f() calls itself recursively, until it gets down to calling f(1) which simply returns 1. Here, therefore, is what this does:



21. Consider the code snippet below. What will the console output be and why?

(function(x) {
    return (function(y) {
        console.log(x);
    })(2)
})(1);  

- The output will be 1, even though the value of x is never set in the inner function. Here’s why:

- As explained in our JavaScript Hiring Guide, a closure is a function, along with all variables or functions that were in-scope at the time that the closure was created. In JavaScript, a closure is implemented as an “inner function”; i.e., a function defined within the body of another function. An important feature of closures is that an inner function still has access to the outer function’s variables.

- Therefore, in this example, since x is not defined in the inner function, the scope of the outer function is searched for a defined variable x, which is found to have a value of 1.



22. What will the following code output to the console and why:

var hero = {
    _name: 'John Doe',
    getSecretIdentity: function (){
        return this._name;
    }
};

var stoleSecretIdentity = hero.getSecretIdentity;

console.log(stoleSecretIdentity());
console.log(hero.getSecretIdentity());
What is the issue with this code and how can it be fixed. 

```
undefined
John Doe
```

stoleSecretIdentity() is extracting a method only with no reference to the hero object. It can be fixed by binding the method to hero:

```
var stoleSecretIdentity = hero.getSecretIdentity.bind(hero);
```


23. Create a function that, given a DOM Element on the page, will visit the element itself and all of its descendents (not just its immediate children). For each element visited, the function should pass that element to a provided callback function.

The arguments to the function should be:

a DOM element
a callback function (that takes a DOM element as its argument)

```
function traverse(domEl,callback) {
   callback(domEl);
   let list = domEl.children;
   for (let i = 0; i < list.length; i++) {
       traverse(list[i], callback);  // recursive call
   }
}
```


24. Testing your this knowledge in JavaScript: What is the output of the following code?

var length = 10;
function fn() {
	console.log(this.length);
}

var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[[0]]();
  }
};

obj.method(fn, 1);

```
10
2
```

- As fn is passed as a parameter to the function method, the scope (this) of the function fn is window. var length = 10; is declared at the window level. It also can be accessed as window.length or length or this.length (when this === window.)

- ```method``` is bound to Object obj, and obj.method is called with parameters fn and 1. Though method is accepting only one parameter, while invoking it has passed two parameters; the first is a function callback and other is just a number.

- When fn() is called inside method, which was passed the function as a parameter at the global level, this.length will have access to var length = 10 (declared globally) not length = 5 as defined in Object obj.

- Now, we know that we can access any number of arguments in a JavaScript function using the arguments[] array.

- Hence arguments[0]() is nothing but calling fn(). Inside fn now, the scope of this function becomes the arguments array, and logging the length of arguments[] will return 2.

25. Consider the following code. What will the output be, and why?
```
(function () {
    try {
        throw new Error();
    } catch (x) {
        var x = 1, y = 2;
        console.log(x);
    }
    console.log(x);
    console.log(y);
})();
```

```
1
undefined
2
```  
- var statements are hoisted (without their value initialization) to the top of the global or function scope it belongs to, even when it’s inside a with or catch block. However, the error’s identifier is only visible inside the catch block. It is equivalent to:

```
(function () {
    var x, y; // outer and hoisted
    try {
        throw new Error();
    } catch (x /* inner */) {
        x = 1; // inner x, not the outer one
        y = 2; // there is only one y, which is in the outer scope
        console.log(x /* inner */);
    }
    console.log(x);
    console.log(y);
})();
```

26. What will be the output of this code?

```
var x = 21;
var girl = function () {
    console.log(x);
    var x = 20;
};
girl ();
```

```undefined```
- It’s because JavaScript initialization is not hoisted. When the function is executed, it checks that there’s a local x variable present but doesn’t yet declare it, so it won’t look for global one.


27. 
```
for (let i = 0; i < 5; i++) {
  setTimeout(function() { console.log(i); }, i * 1000 );
}
```
What will this code print?

- It will print 0 1 2 3 4, because we use let instead of var here. The variable i is only seen in the for loop’s block scope.  


28. What do the following lines output, and why?
```
console.log(1 < 2 < 3);
console.log(3 > 2 > 1);
```
- The first statement returns true. The second returns false because of how the engine works regarding operator associativity for < and >. It compares left to right, so 3 > 2 > 1 JavaScript translates to true > 1. true has value 1, so it then compares 1 > 1, which is false.


29. How do you add an element at the begining of an array? How do you add one at the end?  

- To add to the end of the array, use array.push(). To add to the beginning of an array you can use Array.splice(0, 0, element), Array.unshift(), or a spread operand for either: 
```
const newArr = [newEl, ...arr];
const newArr2 = [...arr, newEl];
```

30. Imagine you have this code:
```
var a = [1, 2, 3];
```
a) Will this result in a crash?

```
a[10] = 99;
```
 - No, it will not result in a crash. It will make spots 3-9 empty.
b) What will this output?
```
console.log(a[6]);
```
  - The output will be ```undefined```.

31. What is the value of typeof undefined == typeof NULL?
- The output will be true since ```NULL``` will be treated as a variable since JS is case sensitive.

32. What would following code return?
```
console.log(typeof typeof 1);
```
- It will return string since the first evaluation- ```typeof 1``` will return ```'number'```, which is evaluated as a string by the preceding ```typeof```.

33. What will be the output of the following code:
```
for (var i = 0; i < 5; i++) {
	setTimeout(function() { console.log(i); }, i * 1000 );
}
```
Explain your answer. How could the use of closures help here?

- The code sample shown will not display the values 0, 1, 2, 3, and 4 as might be expected; rather, it will display 5, 5, 5, 5, and 5.

- The reason for this is that each function executed within the loop will be executed after the entire loop has completed and all will therefore reference the last value stored in i, which was 5.

- You can fix this by using ```let``` instead of ```var```:
```
for (let i = 0; i < 5; i++) {
	setTimeout(function() { console.log(i); }, i * 1000 );
}
```
- Or using closures:
```
for (var i = 0; i < 5; i++) {
    (function logX(x) {
        setTimeout(function() {
          console.log(x); 
        }, x * 1000 );
    })logX(i);
}
```


34. What is NaN? What is its type? How can you reliably test if a value is equal to NaN?  

- In JS, ```NaN``` type is ```Number```, even though it represents a value that is not a number. it's a value that results from an operation that could not be performed because an operand or the resulting value is non-numeric. 
- The NaN property represents a value that is “not a number”. This special value results from an operation that could not be performed either because one of the operands was non-numeric (e.g., "abc" / 4), or because the result of the operation is non-numeric.  
```
console.log(typeof NaN === "number");  // logs "true"
```
- Additionally, NaN compared to anything – even itself - is false:
```
console.log(NaN === NaN);  // logs "false"
```
- A semi-reliable way to test whether a number is equal to NaN is with the built-in function ```isNaN()```, but even using ```isNaN()``` is an imperfect solution.

- A better solution would either be to use value !== value, which would only produce true if the value is equal to NaN. Also, ES6 offers a new Number.isNaN() function, which is a different and more reliable than the old global isNaN() function.

35. What will the following code output and why?
```
var b = 1;
function outer(){
   	var b = 2
    function inner(){
        b++;
        var b = 3;
        console.log(b)
    }
    inner();
}
outer();
``` 
- Output to the console will be “3”.

- There are three closures in the example, each with it’s own var b declaration. When a variable is invoked closures will be checked in order from local to global until an instance is found. Since the inner closure has a b variable of its own, that is what will be output.

- Due to hoisting the code in inner will be interpreted as follows:
```
function inner () {
    var b; // b is undefined
    b++; // b is NaN
    b = 3; // b is 3
    console.log(b); // output "3"
}
```

36. Discuss possible ways to write a function isInteger(x) that determines if x is an integer.

- With ECMAScript6 you can use the function ```Number.isInteger()```.
- Prior to ECMAScript6 the issue is that, in the ECMAScript specification, integers only exist conceptually; i.e., numeric values are always stored as floating point values.

- With that in mind, the simplest and cleanest pre-ECMAScript-6 solution (which is also sufficiently robust to return false even if a non-numeric value such as a string or null is passed to the function) would be the following use of the bitwise XOR operator:
```
function isInteger(x) { return (x ^ 0) === x; } 
```
- (Returns a zero in each bit position for which the corresponding bits are the same. [Returns a one in each bit position for which the corresponding bits are different.])  

- The following solution would also work, although not as elegant as the one above:
```
function isInteger(x) {
  return (typeof x === 'number') && (x % 1 === 0);
  }
```
- The following function (or with Math.ceil() or Math.floor() in place of Math.round()) might also seem useful, but the results are not exactly the same as with the above two functions:
```
function isInteger(x) {
  return Math.round(x) === x;
  }
```
- The difference is, these Math-based solutions return true for Infinity and -Infinity, whereas the others (and notably ES6’s Number.isInteger()) return false.

- Another fairly common incorrect solution is the following:
```
function isInteger(x) { return parseInt(x, 10) === x; }
```
- While this parseInt-based approach will work well for many values of x, once x becomes quite large, it will fail to work properly. The problem is that parseInt() coerces its first parameter to a string before parsing digits. Therefore, once the number becomes sufficiently large, its string representation will be presented in exponential form (e.g., 1e+21). Accordingly, parseInt() will then try to parse 1e+21, but will stop parsing when it reaches the e character and will therefore return a value of 1. Observe:
```
> String(1000000000000000000000)
'1e+21'
```
```
> parseInt(1000000000000000000000, 10)
1
```
```
> parseInt(1000000000000000000000, 10) === 1000000000000000000000
false
```

37. How do you clone an object?  
```
const obj = {a: 1 ,b: 2}
const objclone = Object.assign({},obj);
```
- Now the value of objclone is {a: 1 ,b: 2} but points to a different object than obj.

- The potential pitfall, though: ```Object.assign()``` will just do a shallow copy, not a deep copy. This means that nested objects aren’t copied. They still refer to the same nested objects as the original:
```
let obj = {
    a: 1,
    b: 2,
    c: {
        age: 30
    }
};

const objclone = Object.assign({},obj);
console.log('objclone: ', objclone);

obj.c.age = 45;
console.log('After Change - obj: ', obj);           // 45 - This also changes
console.log('After Change - objclone: ', objclone); // 45
```
- To avoid this, you could create an empty object and use a ```for in``` loop on the original object recursively.  