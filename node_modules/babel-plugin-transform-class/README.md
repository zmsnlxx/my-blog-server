# babel-plugin-transform-class

[![NPM version](https://badge.fury.io/js/babel-plugin-transform-class.svg)](http://badge.fury.io/js/babel-plugin-transform-class)
[![Greenkeeper badge](https://badges.greenkeeper.io/AMorgaut/babel-plugin-transform-class.svg)](https://greenkeeper.io/)
[![Build Status](https://api.travis-ci.org/AMorgaut/babel-plugin-transform-class.svg?branch=master)](https://travis-ci.org/AMorgaut/babel-plugin-transform-class)
[![Coverage Status](https://coveralls.io/repos/github/AMorgaut/babel-plugin-transform-class/badge.svg?branch=master)](https://coveralls.io/github/AMorgaut/babel-plugin-transform-class?branch=master)
[![MIT Licensed](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](#license)

> A minimalist ES6 class babel transformer

## Overview

Transpiler are very powerful, but can be frustrating when generated code do not fit to what we'd like.

Use this transform plugin if you like what it generates for you. [The generated code is ES3 compliant as long as you also add the 2 required polyfills](https://github.com/AMorgaut/babel-plugin-transform-class/wiki).

So, this transform plugin purely concentrate itself on the ES6 class notation.

It uses only one traverse visitor and... **It does not inject any helper function**

### Class / Constructor

The `class` Declaration & its `constructor`, become function declarations
```js
function MyClass(args) {/* code */}
```

### Prototype methods

The class methods are assigned to the constructor prototype using `Object.assign(MyClass.prototype, {/* methods */});`. The method shortand notation `foo() {/* code */}` becomes `foo: function foo() {/* code */}` (to get function name support)

```js
Object.assign(MyClass.prototype, {
    foo: function foo() {/* code */}
});
```

### Static methods

The `statics` methods are assigned to the constructor using `Object.assign`.
```js
Object.assign(MyClass, {/* static methods */});
```

### Prototype inheritance

The prototype inheritance declared by the ES6 `extends` instruction use `Object.create()` to create the `prototype` of the class. The class constructor is fixed back using `Object.assign()` along the method definitions.

```js
MyClass.prototype = Object.create(ParentClass.prototype);
Object.assign(MyClass.prototype, {
    foo: function foo() {/* code */},
    constructor: MyClass
});
```

### `new.target`

The `new.target` property, is transpiled to  `this.constructor`. As, with pure function constructor based prototype inheritance, the `this` instance is created by the child class, and given to the parent class constructor & methods (see `super`), `this.constructor` refers to the child class prototype constructor property, itself fixed to the child class function itself, matching to the constructor invoked by `new`.

### Constructor, methods, & static methods `super` call

The constructor `super(arg1, arg2)` call is transpiled to `ParentClass.call(this, arg1, arg2)`, the method `super.methodName(arg1, arg2)` call, to `ParentClass.prototype.methodName.call(this, arg1, arg2)`, and the `static` method `super.methodName(arg1, arg2)` call, to `ParentClass.methodName.call(this, arg1, arg2)`.

## Let's play

To get a better idea of the result, you can play with it there: https://astexplorer.net/#/gist/0178b41edea28820b2452e3422059cbd/latest

## Up to come

* Sourcemap tests (to check impact of transformations approaches on babel sourcemap generation)
* ECMAScript stage 2 class properties notation and decorators may be potentially added as they make sense to complete class definition

## Example

**In**

```js
class AbstractClass {
  constructor(a) {}
  publicMethod(foo, bar) {
    console.log('Abstract', new.target);
    this.bar = bar;
  }
}

class MyClass extends AbstractClass {
    static staticMethod(a, b) {
      console.log('static', a, b);
    }
    constructor(a) {
        super(a);
        this.bar = 51;
    }
    publicMethod(foo, bar) {
      super.publicMethod(foo, bar);
      console.log('MyClass', new.target);
    }
}
```

**Out**

```js
function AbstractClass(a) {}

Object.assign(AbstractClass.prototype, {
  publicMethod: function publicMethod(foo, bar) {
    console.log('Abstract', this.constructor);
    this.bar = bar;
  }
});

function MyClass(a) {
  AbstractClass.call(this, a);
  this.bar = 51;
}

MyClass.prototype = Object.create(AbstractClass.prototype);
Object.assign(MyClass.prototype, {
  publicMethod: function publicMethod(foo, bar) {
    AbstractClass.prototype.publicMethod.call(this, foo, bar);
    console.log('MyClass', this.constructor);
  },
  constructor: MyClass
});
Object.assign(MyClass, {
  staticMethod: function staticMethod(a, b) {
    console.log('static', a, b);
  }
});
```

## Dependencies

This transform plugin requires the JS target environment to at least support `Object.create()` & `Object.assign()`, either natively or via a polyfill (polyfills are intentionally not included, [use the one of your choice](https://github.com/AMorgaut/babel-plugin-transform-class/wiki)).

The `Object.create(prototype, properties)` call currently only use the first parameter (prototype), so their is no need to include polyfill support of its second argument (the properties object definitions) for now.

## Chosen Limitations from the ES6 standard

Many ES6 class features may either be checked at edit time instead of runtime or lead to dangerous and/or not reviewer friendly code patterns.

Here an example of some class related ESLint options:

* [require constructor names to begin with a capital letter (new-cap)](http://eslint.org/docs/rules/new-cap)
* [Verify calls of super() in constructors (constructor-super)](http://eslint.org/docs/rules/constructor-super)
* [Disallow modifying variables of class declarations (no-class-assign)](http://eslint.org/docs/rules/no-class-assign)
* [Disallow duplicate name in class members (no-dupe-class-members)](http://eslint.org/docs/rules/no-dupe-class-members)
* [Disallow use of this/super before calling super() in constructors. (no-this-before-super)](http://eslint.org/docs/rules/no-this-before-super)
* [Disallow unnecessary constructor (no-useless-constructor)](http://eslint.org/docs/rules/no-useless-constructor)
* + [eslint-plugin-classes](https://www.npmjs.com/package/eslint-plugin-classes)

and the chosen limitations that allows lighter, more readable, and faster code:

2. It does not support expressions as parent class, only class/constructor names
3. It does not support getter/setter
4. It does not throw errors if you invoke the constructor without the new keyword (see rule [`"capIsNew": true`](http://eslint.org/docs/rules/new-cap#capisnew))
5. It does not check if you use `this` before calling `super()` (see rule [`no-this-before-super: "error"`](http://eslint.org/docs/rules/no-this-before-super))
6. It does not support nested classes (classes defined inside a class method)

Last limitation

* This transform plugin do not properly extends native Objects such as `Date`, `Array`, `Function`, etc

## Installation

```sh
$ npm install babel-plugin-transform-class
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
{
  "plugins": ["transform-class"]
}
```

### Via CLI

```sh
$ babel --plugins transform-class script.js
```

### Via Node API

```javascript
require("babel-core")
.transform("class A extends B { constructor() { super(); }}", {
  plugins: ["transform-class"]
});
```
