//NPM modules:
var modules = require("./library/modules.js");
var inquirer = require("inquirer");
var prompt = require("prompt");
var colour = require('colour');
var clear = require('clear');
var imageToAscii = require("image-to-ascii");

// Program variables to use:
var counter = 0;
var seperator = (colour.yellow("======================================================"));

var menuChoices = [
  {name: ('Show homepage').bold, value: "HOMEPAGE"},
  {name: ('Enter subreddit').bold, value: "SUBREDDIT"},
  {name: ('List subreddits').bold, value: "SUBREDDITS"}
];





function userInput() {
  inquirer.prompt({
    type: 'list',
    name: 'menu',
    message: 'What do you want to do?',
    choices: menuChoices
  }).then(
    function(answers) {
      // console.log(answers);

// Display the main menu:
      if (answers.menu === "HOMEPAGE") {
        modules.getHomepage(function(err, res) {
          if (err) {
            console.log("**Error 7**");
          }
          else {
            res.map(function(item) {
              console.log(colour.magenta(colour.bold(item.data.title)));
              console.log("Votes: " + (colour.green(item.data.score)));
              console.log("By " + item.data.author);
              console.log("Link to post: " + (colour.blue(item.data.url)));
            });
          }
          userInput(); // To generate the menu again
        });
      }

// Navigate to a specific reddit by inputting the name of the subreddit:
      if (answers.menu === "SUBREDDIT") {
        prompt.get("sub", function(err, answer) {
          if (err) {
            console.log("There was an error with that subreddit.");
          }
          else {
            var subChosen = answer.sub;
            // console.log("the chosen sub is " + subChosen);
          }
          modules.getSubreddit(subChosen, function(err, res) {
            if (err) {
              console.log("**Error 8**");
            }
            else {
              res.map(function(item) {
                console.log(colour.magenta(colour.bold(item.data.title)));
                console.log("Votes: " + (colour.green(item.data.score)));
                console.log("By " + item.data.author);
                console.log("Link to post: " + (colour.blue(item.data.url)));
              });
            }
            userInput();
          });
        });
      }

// Navigate to specific subreddit given a list of subreddits:
      if (answers.menu === "SUBREDDITS") {
        modules.getSubreddits(function(err, res) {
          if (err) {
            console.log("**Error 9**");
          }
          else {
            var listSubreddits = res.map(function(item) {
              return {
                name: (item.data.title).magenta.bold,
                value: item.data.display_name
              };

            });

            inquirer.prompt({
              type: 'list',
              name: 'menu',
              message: 'Which subreddit would you like to navigate to?',
              choices: listSubreddits
            }).then(
              function(choice) {
                modules.getSubreddit(choice.menu, function(err, res) {
                  if (err) {
                    console.log("**Error 10**");
                  }
                  else {
                    res.map(function(item) {
                      console.log(colour.magenta(colour.bold(item.data.title)));
                      console.log("Votes: " + (colour.green(item.data.score)));
                      console.log("By " + item.data.author);
                      console.log("Link to post: " + (colour.blue(item.data.url)));
                      
                      


                    });
                    
                    console.log(seperator);       //seperator

// Bring user back to main menu:

                    var choicesReturn = [
                      {name: ("Return to main menu").bold, value: "YES"},
                      {name: ("Select posts to view").bold, value: "NO"}
                      ];
                      inquirer.prompt({
                          type: 'list',
                          name: 'menu',
                          message: 'What would you like to do?',
                          choices: choicesReturn
                        }).then(

                          function returnMainMenu(answer) {
                            if (answer.menu === "YES") {
                              userInput();
                            }

                            if (answer.menu === "NO") {
                              
// Select which post to view from subreddit                              
                              clear();  // clears the terminal
                              
                              modules.getSubreddit(choice.menu, function(err, res) {
                                if (err) {
                                  console.log("There was an error fetching subreddit");
                                }
                                else {
                                  
                                  var choicePosts = res.map(function(item) {
                                    return {
                                      name: item.data.title.magenta.bold,
                                      value: item
                                    }
                                  })
                                  
                                }

                                inquirer.prompt({
                                    type: 'list',
                                    name: 'menu',
                                    message: 'Which post would you like to see?',
                                    choices: choicePosts
                                  }).then(
                                    
                                    function(choice) {
                                      clear(); 
                                      if (choice.menu.data.preview) {
                                        
                                        if ((choice.menu.data.url).includes("imgur") === true && (choice.menu.data.url).includes("jpg") === false && (choice.menu.data.url).includes("png") === false && (choice.menu.data.url).includes("gif") === false) {
                                
                                          var urlImgur = choice.menu.data.url + ".jpg"; // be able to display imgur links that dont end in .jpeg
                                          imageToAscii(urlImgur, (err, converted) => {
                                            console.log(err || converted);
                                            console.log((choice.menu.data.title).bold.magenta);
                                            console.log("Posted by " + choice.menu.data.author);
                                            console.log("Link to post: " + colour.blue(choice.menu.data.url));
                                            
                                            console.log("THIS IS THE CHOICE" + choice);
                                            
                                            modules.getComments(choice);
/* over here! */                            console.log(counter);

                                            console.log(seperator);  
                                            
                                            
                                            userInput();
                                          });
                                        }
                                        else {
                                          var url = choice.menu.data.url;
                                          imageToAscii(url, (err, converted) => {
                                            console.log(err || converted);
                                            console.log((choice.menu.data.title).bold.magenta);
                                            console.log("Posted by " + choice.menu.data.author);
                                            console.log("Link to post: " + colour.blue(choice.menu.data.url));
                                            
                                            
                                            modules.getComments(choice);
/* over here! */                            console.log(counter);
                                            
                                            console.log(seperator);
                                            
                                            userInput();
                                          });
                                        }
                                      }
                                      else {
                                        console.log(choice.menu.data.selftext);
                                        console.log((choice.menu.data.title).bold.magenta);
                                        console.log("Posted by " + choice.menu.data.author);
                                        console.log("Link to post: " + colour.blue(choice.menu.data.url));
                                        
                                        
                                        modules.getComments(choice);
/* over here! */                        console.log(counter);
                                        
                                        
                                        console.log(seperator);
                                        
                                        
                                        userInput();
                                      }
                                }
                                );
                              });
                        }
                      }
                    );
                  }
                });
              }
            );
          }
        });
      }
    }
  );
}


userInput();


/* Feature: comments listing :star::star::star:

When the user is shown a list of posts, instead of going back to the main menu every post 
should be selectable – again using inquirer. When selecting a post, the user should be 
shown a listing of comments for that post. Since comments are threaded – replies to 
replies to replies … – we would like to indent each level of comments , perhaps by two or
three spaces. To do this properly, we can make use of the word-wrap NPM module. After 
displaying the list of threaded comments, display the main menu again.

One of the difficulties of implementing this feature is to properly iterate through 
the comments and their replies. To do this, you will first have to analyze the way the 
comment listing is presented in the JSON. */