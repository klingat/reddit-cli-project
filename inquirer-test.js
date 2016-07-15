var inquirer = require('inquirer');

var menuChoices = [
  {name: 'Show homepage', value: 'HOMEPAGE'},
  {name: 'Show subreddit', value: 'SUBREDDIT'},
  {name: 'List subreddits', value: 'SUBREDDITS'}
];

inquirer.prompt({
  type: 'list',
  name: 'menu',
  message: 'What do you want to do?',
  choices: menuChoices
}).then(
  function(answers) {
    console.log(answers);
  }
);

/* Note that since prompting the user is a long-running function, we are using a callback 
to receive the answers. Contrary to other callbacks you have used before, here we are 
doing .then(callback). This is because inquirer uses JavaScript Promises instead of 
"regular callbacks". We will not be studying the Promise at this time, so for the moment 
you can see this as simply passing a callback to get your answers. */

