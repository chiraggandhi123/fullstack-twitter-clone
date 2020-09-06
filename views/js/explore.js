$(() => {
    $.get('/profile/getAllTweets', (d) => {
        console.log(d)
    var data = new Array()
    d.forEach((ele)=>{
        data.push(ele)
    })
    console.log(data)
    data.reverse()
    $('.tweets').empty()
    data.forEach((ele)=>{
        var x = `<li><div class="info">
        <strong>${ele.name}<span>@${ele.username}</span></strong>
        <p>${ele.tweets}
        <ul id="comment"></ul>
        </p>
        <div class="actions">
        <input id="my-input"type="text" style="height:30px" placeholder="comment...." name="comment">
        <button class="btn-comment"style="height:30px" >add</button>
          <a href=""><img src="/images/comments.svg" alt="Comments">432</a>
          <a href=""><img src="/images/retweet.svg" alt="Retweet">231</a>
          <a href=""><img src="/images/like.svg" alt="Likes">676</a>
        </div>
      </div></li>`
      $('.tweets').append(x)
    })
})
$.get('/profile/getUserData',(data)=>{
    console.log(data)
    $('#follow-box').empty()
    data.users.forEach((ele)=>{
        var x = ` <li>
        <div class="profile">
            <img src="/images/avatar.png" alt="Avatar">
            <div class="info">
              <strong>${ele.name}<span>@${ele.username}</span></strong>
              <button>Follow</button>
            </div>
        </div>
        <a href="">X</a>
      </li>`
      $('#follow-box').append(x)
    })
})
$('body').on('click', 'button.btn-comment', function(e) {
  // do something
  $(`#comment`).append(`<li>${$("#my-input").val()}</li>`)
});

})