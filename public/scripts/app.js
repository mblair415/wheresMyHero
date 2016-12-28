console.log('sanity check, app.js is connected')

var giphyApi = "http://api.giphy.com/v1/gifs/search";

$(document).ready(function(){
  console.log('The DOM body is ready')

  var source = $('#selectableGif-template2').html();

  var template = Handlebars.compile(source);


  $('.form-gif').on('submit', function(event){
    console.log('gif submit clicked');
    event.preventDefault();

    $.ajax({
      method: 'GET',
      url: giphyApi,
      data: $(this).serializeArray(),
      success: newGifSearchSuccess,
      error: newGifSearchError
    })
  })

  $('.gifSelectionField2').on('click', '.gifBox', function(event){
    console.log('an image was clicked!', this.src);
  })


  // $('#gifSearchButton').on('submit', function(event){
  //   console.log('second gif submission button clicked');
  //   event.preventDefault();
  //
  //   $.ajax({
  //     method: 'GET',
  //     url: 'http://api.giphy.com/v1/gifs/search?q=gif-input&api_key=dc6zaTOxFJmzC',
  //     data: $(this).serializeArray(),
  //     sucess: newGifSearchSuccess,
  //     error: newGifSearchError
  //   })
  // })

  // $(window).scroll(function() {
  //   if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
  //   console.log('dude, you scrolled to the bottom');
  //
  //    $.ajax({
  //      method: 'GET',
  //      url: giphyApi,
  //      data: $('#gifId').serializeArray()+'&offset=25',
  //      success: giphySearchMoreSuccess,
  //      error: newGifSearchError
  //    })
  //   }
  // });

  function newGifSearchSuccess(json){
    console.log('ajax call for gif successful.  Gif: ', json);
    $('.deleteThisClass').empty();
    json.data.forEach(function(gif){
      var giphyHtml = template({ insertGifHere: gif.images.fixed_width_small.url})
      $(".gifSelectionField2").append(giphyHtml);
    });
  }

  // function giphySearchMoreSuccess(json){
  //   console.log('ajax call for MOAR gifs worked.  Gif: ', json);
  //   json.data.forEach(function(gif){
  //     var giphyHtml = template({ insertGifHere: gif.images.fixed_width_small.url})
  //     $(".gifSelectionField2").append(giphyHtml);
  //   })
  // }

})

// function newReviewSuccess(review){
//   console.log('ajax call on review successful.  Review: ', review);
// }
//
// function newReviewError(error){
//   console.log('ajax call on review dun messed up.  Error: ', error);
// }


// });



function newGifSearchError(error){
  console.log('ajax call on gif search went bad, boss.  Error: ', error);
}
