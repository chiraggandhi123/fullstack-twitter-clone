$("#tweet-form").submit(function(e) {
    e.preventDefault();
});

// adding Names of users
$.get('/profile/getUserData',(d)=>{
    
    $.get('/profile/getUserSpecificData',(usd)=>{
        console.log(usd)
        $("#tweet_count").text(`${usd.tweets.length}`)
        $("#followers_count").text(`${usd.userids.length}`)
        $("#following_count").text(`${usd.userids.length}`)
        organise(d)
        // console.log(d.users)
        $('#follow-box').empty()
        var follow_name = "Follow"
        d.users.forEach((ele)=>{
            
            usd.userids.forEach((newele)=>{
                console.log(newele,ele.username)
                if(newele==ele.username)
                {
                    follow_name = "unfollow"
                }
                else{
                    follow_name = "Follow"
                }
            })
            var x = ` <li>
            <div class="profile">
                <img src="/images/avatar.png" alt="Avatar">
                <div class="info">
                  <strong>${ele.name}<span>@${ele.username}</span></strong>
                  <button class="follow-button">${follow_name}</button>
                </div>
            </div>
          </li>`
          $('#follow-box').append(x)
        })    
    })
    
})

$("#follow-box").on("click", "button.follow-button", function(e){
    var username = e.target.parentNode.childNodes[1].childNodes[1].innerText.slice(1);
    if($(this).text()=="Follow")
    {
    // $(this).text('unfollow')
    $.post('/profile/addUser',{username:username},()=>{
        console.log("sent to addUser")
    })
}
    else{
        // $(this).text('follow')
        $.post('/profile/delUser',{username:username},()=>{
            console.log("sent to delUser")
        })  
    }

});
// Showing tweets on home page
// First we need to get all usernames for current user
$.get('/profile/getUserSpecificData',(data)=>{
    $('.tweets').empty()
    var arr = data.userids
    // var tweet_bucket = []
    arr.forEach((ele)=>{
        $.get(`/profile/getUserSpecificTweets?q=${ele}`,(tweet)=>{
            tweet.forEach((ele)=>{
        
                $('.tweets').append(`<li>
                <img class="avatar" src="/images/avatar.png" alt="Avatar">
                <div class="info">
                <strong>${ele.name}<span>@${ele.username}</span></strong>
                <p>${ele.tweets}
                <ul id="comment"></ul>
                </p>
                
                <div class="actions">
                    
                    <input id="my-input"type="text" style="height:30px" placeholder="comment...." name="comment">
                    <button class="btn-comment"style="height:30px" >add</button>
                    
                    <img id="like" width="50px" height="50px"src="/images/like.svg" alt="Likes">&nbsp;<p id="like-count">676</p>
                </div>
                </div>
            </li>`)
    })
})
})
    // console.log(tweet_bucket)
    
    
})

// FOLLOW/UNFOLLOW
// $.get('/profile/getUserData',(data)=>{
//     var d = organise(data)
//     d.userids.forEach((ele)=>{
//         $()
//     })
// })
$('body').on('click', 'button.btn-comment', function(e) {
    // do something
    $(`#comment`).append(`<li>${$("#my-input").val()}</li>`)
});
function organise(data){
    return data.users.splice(_.indexOf(data.users, _.find(data.users, function (item) { return item._id === data.id; })), 1);
}

// ADD LIKE FEATURE

$("body").on("click","img#like",(e)=>{
var t = parseInt($("#like-count").text())
$("#like-count").text(t+1)
})