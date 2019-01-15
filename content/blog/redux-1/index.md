---
title: 'Should you still learn Redux in 2019? Part 1'
date: '2019-01-15T09:10:03.284Z'
---

<!-- title: worth learning redux in 2019? -->

Well, maybe. Let's try and find out.

Even before [Hooks](https://reactjs.org/docs/hooks-intro.html) were announced the **React**
community seemed to already be slowly moving away from **Redux**. Alternatives on state management
have been coming up from people trying to avoid the amount of boilerplate apparently needed
to implement a full-on Redux application and the somewhat steep learning curve it has.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">In a year from now, picking redux for a new React project is going to be a weird choice.</p>&mdash; Ryan Florence (@ryanflorence) <a href="https://twitter.com/ryanflorence/status/1057010447432454146?ref_src=twsrc%5Etfw">October 29, 2018</a></blockquote>
&nbsp;

These alternatives have mostly come in form of less verbose, more "magical" and easy to pick up approaches which I will be discussing later. For a start I'd like to focus on how Redux actually works. This will help understand why it is capable of doing what it does and provide
information for the time of an actual choice of whether to use it or not.

### The state tree 🌲

Redux revolves around the state tree, its a single javascript Object that stores the whole
application state. Lets say that for a simple counter program our state tree is:

```javascript
  { value: 0 }
```
<br>

 The state tree is read-only and every time you want to make changes to it
an action has to be called.


### Actions

Actions are plain objects describing the changes. It is mandatory that an action have a type:

```javascript
  { type: "INCREMENT" }
  { type: "DECREMENT" }
```
<br>

but they can also have additional properties:

```javascript
  { type: "INCREMENT", index: 3 }
  { type: "SET_FILTER", filter: "ACTIVE" }
```

### The Reducer

The state mutation in your app needs to be described as a [pure function](https://hackernoon.com/javascript-and-functional-programming-pt-3-pure-functions-d572bb52e21c) that takes the previous state:

```javascript
  { value: 0 }
```
<br>

and the action being dispatched:

```javascript
  { type: "INCREMENT" }
```
<br>

and returns the next state of your app which is a **new** object:

```javascript
  { value: 1 }
```
<br>

this function is called the **Reducer**

```javascript
  const counter = (state = { value: 0 }, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return { value: state.value + 1 };
      case 'DECREMENT':
        return { value: state.value - 1 };
      default:
        return state;
    }
  }
```
<br>

Notice that it receives the current state (also provides a default value for it) and returns an
entirely **new** object according to the action type.
Once the new state is returned the Redux **Store** needs to warn the parts interested that there's
a new state around town so that they can be refreshed.

### The Store

The store binds together the principles of Redux. It holds the current state tree, lets you
dispatch actions and to be created, a reducer that knows how to update the state upon given
actions has to be specified.

```javascript
  import { createStore } from redux;
  const store = createStore(counter);
```
<br>

The store has 3 important methods:

```javascript
  store.getState() // { value: 0 }
```
<br>

The first method is called `getState`. It retrieves the current state of the Redux store.
Here we are getting `{ value: 0 }` as it is the defined initial state of our application.

Then we have `dispatch`. It lets you dispatch actions to change the state.

```javascript
  store.dispatch({ type: 'INCREMENT' });
  store.getState(); // { value: 1 }
```
<br>

The third store method is called subscribe. It lets you register a callback that the
Redux store will call every time an action has been dispatched so you can
update the UI of your app to reflect the current state.

```javascript
  const render = () => {
    document.body.innerText = store.getState().value;
  };

  store.subscribe(render);
  render()

  document.addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT' });
  });
```
<br>

Working implementation of this example on CodePen:

<p data-height="265" data-theme-id="dark" data-slug-hash="QzYaqK" data-default-tab="js,result" data-user="rafael-vitor" data-pen-title="Redux minimal counter" class="codepen">See the Pen <a href="https://codepen.io/rafael-vitor/pen/QzYaqK/">Redux minimal counter</a> by RaVi (<a href="https://codepen.io/rafael-vitor">@rafael-vitor</a>) on <a href="https://codepen.io">CodePen</a>.</p>

These principles might not be easy to grasp at first. Describing the application state
as a plain object, describing changes to the state as plain objects and always having pure
functions to handle changes are pretty strong constraints that Redux will have but they come
with really cool benefits that have to be weigh in.

Having **state** as a plain object gives you the power to store and load from a local
storage and have all those app states as an user left it for example, same with loading it
from the server. **Actions** can be recorded and attached to a bug report with the state
snapshot and a detailed record of that lead to that point. This can also lead to
having undo/redo functionality with a detailed action history.

These are a few nice things made possible by using Redux but the question is:
**Is this the only way to do it?** That is often not the answer on the tech world
so expect a study on Redux alternatives and how they tackle (or not) these
and other issues on **Part 2**.


<!-- https://medium.com/reactbrasil/case-mobx-para-redux-a2d04018d5c4
https://codeburst.io/mobx-vs-redux-with-react-a-noobs-comparison-and-questions-382ba340be09
https://github.com/facebook/flux/blob/master/examples/flux-concepts/README.md
https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367 -->