const {
  random: { number }
} = require("faker");
const maxTime = 5000;
let hungry = [];

const think = 0;
const eat = 1;

const actions = ["think", "eat"];

let philosophers = [
  {
    name: "Filosofo 1",
    action: actions[0],
    now: new Date().getTime(),
    timeToWait: number(maxTime)
  },
  {
    name: "Filosofo 2",
    action: actions[0],
    now: new Date().getTime(),
    timeToWait: number(maxTime)
  },
  {
    name: "Filosofo 3",
    action: actions[0],
    now: new Date().getTime(),
    timeToWait: number(maxTime)
  },
  {
    name: "Filosofo 4",
    action: actions[0],
    now: new Date().getTime(),
    timeToWait: number(maxTime)
  },
  {
    name: "Filosofo 5",
    action: actions[0],
    now: new Date().getTime(),
    timeToWait: number(maxTime)
  }
];

const showPhilosophers = () => {
  console.clear();
  console.log("Hungry row");
  hungry.map(philosopher => {
    const { name, action } = philosopher;
    console.log(name, action);
  });
  console.log("Philosophers");
  philosophers.map(philosopher => {
    const { name, action } = philosopher;
    console.log(name, action);
  });
};

function init() {
  const lastIndex = philosophers.length - 1;
  for (;;) {
    for (let index = 0; index < philosophers.length; index++) {
      const { now, timeToWait, action } = philosophers[index];

      const newAction = actions[number(actions.length - 1)];

      if (hungry.length) {
        for (let i = 0; i < hungry.length; i++) {
          for (let j = 0; j < philosophers.length; j++) {
            if (philosophers[j].name === hungry[i].name) {
              let left;
              let right;
              if (j === 0) {
                // first
                left = philosophers[lastIndex];
                right = philosophers[j + 1];
              } else if (j === lastIndex) {
                // last
                left = philosophers[j - 1];
                right = philosophers[0];
              } else {
                // common
                left = philosophers[j - 1];
                right = philosophers[j + 1];
              }
              if (!left.action[eat] && !right.action[eat]) {

                philosophers[j].action = actions[eat];
                hungry.splice(i, 1);
              }
            }
          }
        }
      }

      let left;
      let right;

      if (index === 0) {
        // first
        left = philosophers[lastIndex];
        right = philosophers[index + 1];
      } else if (index === lastIndex) {
        // last
        left = philosophers[index - 1];
        right = philosophers[0];
      } else {
        // common
        left = philosophers[index - 1];
        right = philosophers[index + 1];
      }

      if (now + timeToWait < new Date().getTime()) {
        switch (newAction) {
          case actions[think]: // think
            console.log(philosophers[index], actions[eat]);
            if (philosophers[index].action === actions[eat]) {
              console.log("top");
              philosophers[index].action = actions[think];
            }
            break;
          case actions[eat]: // eat
            if (left.action === actions[eat] || right.action === actions[eat]) {
              if (
                !hungry.find(philosopher => {
                  return philosopher === philosophers[index];
                }) &&
                philosophers[index].action !== eat
              )
                hungry.push(philosophers[index]);
              philosophers[index].action = actions[think];
            } else {
              philosophers[index].action = actions[eat];
              philosophers[index].now = new Date().getTime();
              philosophers[index].timeToWait = number(maxTime);
            }
            break;
        }
      }
    }
    showPhilosophers();
    for (let i = 0; i < 1000000000; i++) {}
  }
}

init();
