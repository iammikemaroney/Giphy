$(document).ready(function() { 

// global animals array
var animals = ["tabby kitten", "tiger kitten", "cheetah kitten", "lion kitten", "siamese kitten", "fluffy kitten", "sleepy kitten"];

    // displaying gif buttons
    function renderButtons() {
        // Deleting previous buttons prior to adding new buttons
        $("#buttons").empty();
        $("#gifs-view").empty();
        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {
          // Dynamicaly generating buttons for each animal in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("animal");
          // Adding a data-attribute with a value of the animal at index i
          a.attr("data-name", animals[i]);
          // Providing the button's text with a value of the animal at index i
          a.text(animals[i]);
          // Adding the button to the HTML
          $("#buttons").append(a);
          // clear out form
          $('#animal-form')[0].reset();
        }
    }

    // Adds an animal into the array
    $("#add-animal").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();
        // This line will grab the text from the input box
        var animal = $("#animal-input").val().trim();
        if(animal === ""){
          alert("please enter an animal");
          $("#animal-input").focus();
        }

        else{
        // The movie from the textbox is then added to our array
        animals.push(animal);
      }
        // handles the processing of our animal array
        renderButtons();
    });

    // Calling the renderButtons function at least once to display the initial list of animals
    renderButtons();
  // clicking animal button to change from animate to still
$(document).on("click", ".gif", function(){
    console.log($(this).attr("data-state"))

    var state = $(this).attr('data-state');

    if(state === 'animate'){
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
      }

    else {
     $(this).attr("src", $(this).attr("data-animate"));
     $(this).attr("data-state", "animate");
   }

})

  $(document).on("click", "button.animal", function() {
    
    var animal = $(this).attr("data-name");
    console.log(animal)
    // giphy API
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=LEBBrJFI3t4CRtXBfLGNnLVboHGsKx5M&limit=10";
    // AJAX request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      
      .then(function(response) {
        var results = response.data;
        console.log(results)
        for (var i = 0; i < results.length; i++) {

          var gifDiv = $("<div class='item'>");
          // gif rating
          var rating = results[i].rating;
          // gif rating inserted with each gif
          var p = $("<p>").text("Rating: " + rating);
          // animal gif displayed on page
          var animals = $("<img>");

          animals.attr("src", results[i].images.fixed_height.url);
          animals.addClass("gif");
          animals.attr("data-state", "animate");
          animals.attr("data-still", results[i].images.fixed_height_still.url);
          animals.attr("data-animate", results[i].images.fixed_height.url);

          gifDiv.prepend(p);

          gifDiv.prepend(animals);

          $("#gifs-view").prepend(gifDiv);

        }
        
      });
  });
});