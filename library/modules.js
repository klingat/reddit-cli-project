var request = require('request');
var inquirer = require('inquirer');

var url = "https://www.reddit.com/.json";


function requestAsJson (url, callback) {
    request(url, function (err, response) {
        if (err) {
            callback(err);
        }
        else {
            try {
                var parsed = JSON.parse(response.body);
                callback(null, parsed);
            }
            catch (err) {
                callback(err);
            }
            }
        }
    );
}

/*
This function should "return" the default homepage posts as an array of objects
*/
function getHomepage(callback) {
  // Load reddit.com/.json and call back with the array of posts
  // TODO: REPLACE request with requestAsJson!
  var url = "https://www.reddit.com/.json";
  requestAsJson(url, function(err, response) {

    if (err) {
      callback(err);
    }
    else {
      var data = response.data.children;
      callback(null, data);
    }
  });
}


// getHomepage(urlHomepage,function(err, res){
//   if (err) {
//     console.log("**Error 2**");
//   }
//   else {
//     console.log(res);
//   }
// });

/*
This function should "return" the default homepage posts as an array of objects.
In contrast to the `getHomepage` function, this one accepts a `sortingMethod` parameter.
*/
function getSortedHomepage(sortingMethod, callback) {
  // Load reddit.com/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods
  var sortedURL = "https://reddit.com/" + sortingMethod + "/.json";
  requestAsJson(sortedURL, function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      var response = res.data.children;
      callback(null, response);
    }

  })
}

// getSortedHomepage("top", function(err, res) {
//   if(err) {
//     console.log("**Error 3**");
//   }
//   else {
//     console.log(res);
//   }
// })

/*
This function should "return" the posts on the front page of a subreddit as an array of objects.
*/
function getSubreddit(subreddit, callback){
  var subredditURL = "https://reddit.com/r/" + subreddit + "/.json"
  requestAsJson(subredditURL, function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      var response = res.data.children;
      callback(null, response);
    }

  })
}


// getSubreddit("movies", function(err, res) {
//   if(err) {
//     console.log("**Error 4**");
//   }
//   else {
//     console.log(res);
//   }
// })

/*
This function should "return" the posts on the front page of a subreddit as an array of objects.
In contrast to the `getSubreddit` function, this one accepts a `sortingMethod` parameter.
*/
function getSortedSubreddit(subreddit, sortingMethod, callback) {
  // Load reddit.com/r/{subreddit}/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods
  var subredditSortedURL = "https://reddit.com/r/" + subreddit + "/" + sortingMethod + "/.json";
  requestAsJson(subredditSortedURL, function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      var response = res.data.children;
      callback(null, response);
    }
  })
}

// getSortedSubreddit("movies", "top", function(err, res) {
//   if(err) {
//     console.log("**Error 5**");
//   }
//   else {
//     console.log(res);
//   }
// });

/*
This function should "return" all the popular subreddits
*/
function getSubreddits(callback) {
  // Load reddit.com/subreddits.json and call back with an array of subreddits
  var getSubredditsURL = "https://reddit.com/subreddits.json";
  requestAsJson(getSubredditsURL, function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      var response = res.data.children;
      callback(null, response);
    }
  })
}

// getSubreddits(function (err, res) {
//   if (err) {
//     console.log("**Error 6**");
//   }
//   else{
//     console.log(res);
//   }
// })

// function getPost (permalink, callback) {
//   var getPostURL = "https://www.reddit.com"+ permalink +".json";
//   requestAsJson(getPostURL, function(err, res) {

//     if (err) {
//       callback (err);
//     }
//     else {
//       var response = res[1].data.children; // we pick the first object ([0]) because the 2dn object is the comments
//       callback(null, response);
//     }
//   });
// }


// getPost("/r/Jokes/comments/4st4cc/did_you_hear_that_auschwitz_had_to_ask_visitors/", function (err, res) {
//   if (err) {
//     console.log("Error getting post.");
//   }
//   else {
//     console.log(res.data.selftext);
//   }
// });

function getComments(item) {
    item.forEach(function(comm) {
        if(comm.data.body){
            console.log(comm.data.body);
            counter++;
        }
        if (comm.data.replies) {
            getComments(comm.data.replies.data.children)
        }
    })
}


// Export the API
module.exports = {
  getHomepage: getHomepage,
  getSortedHomepage: getSortedHomepage,
  getSubreddit: getSubreddit,
  getSortedSubreddit: getSortedSubreddit,
  getSubreddits: getSubreddits,
  getComments: getComments
};
