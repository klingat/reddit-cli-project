var request = require("request");

var link = 'https://www.reddit.com/r/AskReddit/comments/4sx5zq/children_who_appeared_on_the_show_supernanny_hows/.json';

var counter = 0;


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



request(link, function(err, res) {
    var parsedBody = JSON.parse(res.body);
    var comments = parsedBody[1].data.children;

    getComments(comments);
    console.log(counter);
})