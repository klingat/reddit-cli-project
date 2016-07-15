var request = require("request");
var modules = require("./library/modules.js");
var wrap = require('word-wrap');

var link = 'https://www.reddit.com/r/AskReddit/comments/4sx5zq/children_who_appeared_on_the_show_supernanny_hows/.json';

var counter = 0;

// wrap(str, {indent: '      '});

function getComments(item) {

    item.forEach(function(comm) {
        if(comm.data.body){
           console.log(wrap(comm.data.body, {indent: "  " * counter}));
            counter++;
        }
        if (comm.data.replies) {
            getComments(comm.data.replies.data.children)
        }
    })

}


modules.getPost("/r/Showerthoughts/comments/4t06i0/im_really_glad_i_know_how_to_pronounce_nice/", function (err, res) {
    if (err) {
        console.log("ERRorrrrR");
    }
    else {
        
        getComments(res);
    }
    
    console.log(counter);
    
})


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


// request(link, function(err, res) {
//     var parsedBody = JSON.parse(res.body);
//     var comments = parsedBody[1].data.children;

//     getComments(comments);
//     console.log(counter);
// })