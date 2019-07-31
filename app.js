// selecting the document/page is ready or loaded.
$(document).ready(function() {
// a variable of words(animals) in an array
  var animals = [
    "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
    "bird", "ferret", "turtle", "sugar glider", "chinchilla",
    "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
    "capybara", "teacup pig", "serval", "salamander", "frog"
  ];
// function that is named populate buttons 
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    // calling the areaToAddTo with an empty 
    $(areaToAddTo).empty();
// a for loop that adds a button,
    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      // adding a class to the button
      a.addClass(classToAdd);
      // adding an attribute array
      a.attr("data-type", arrayToUse[i]);
      // adding text to the button
      a.text(arrayToUse[i]);
      // appending the button to the area to add buttons 
      $(areaToAddTo).append(a);
    }

  }
// and on click function that added to the buttons of animals inside the 
  $(document).on("click", ".animal-button", function() {
    $("#animals").empty();
    $(".animal-button").removeClass("active");
    $(this).addClass("active");
// a new variable called type that is a response to the above function.
    var type = $(this).attr("data-type");
    // calling the giphy api to get the gif with a limit of 10 per request
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
// starting the ajax asking it to get some data
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    // .then is the action/response after the promise has been answered
      .then(function(response) {
        // new variable with the response data from giphy
        var results = response.data;
// for loop that will add the response data from the giphy api to the animal-item div
        for (var i = 0; i < results.length; i++) {
          var animalDiv = $("<div class=\"animal-item\">");
          // getting the rating of the gifs 
          var rating = results[i].rating;
          // putting the rating in its own paragraph 
          var p = $("<p>").text("Rating: " + rating);
          // two new variables here animated takes the resulst of each gif returned 
          var animated = results[i].images.fixed_height.url;
          // the still variable holds the gifs still after they are returned after clicking on an animal 
          var still = results[i].images.fixed_height_still.url;
          // new variable that calls the images from giphy 
          var animalImage = $("<img>");
          // looks at the attribute's source 
          animalImage.attr("src", still);
          // looking at the attribute data-still in the still variable
          animalImage.attr("data-still", still);
          // looking at the attribute data-animate in the animated variable
          animalImage.attr("data-animate", animated);
          // looking at the attributes in data-state and still
          animalImage.attr("data-state", "still");
          // adding a class to each new animale image
          animalImage.addClass("animal-image");
          // appending to the animal div with a new paragraph
          animalDiv.append(p);
          // appending the images to the animal div
          animalDiv.append(animalImage);
          // calling the this with an id of animals and now appending those to the animal div
          $("#animals").append(animalDiv);
        }
      });
  });
// on page load and onclick run this function
  $(document).on("click", ".animal-image", function() {
    // a variable the is going up to look for thing with attribute data-state
    var state = $(this).attr("data-state");

    if (state === "still") {
      // if the state is equal to still then
      $(this).attr("src", $(this).attr("data-animate"));
      // the attribute with the still attribute will then change to animated
      $(this).attr("data-state", "animate");
      // the datastate is not animate
    }
    else {
      // else not if
      $(this).attr("src", $(this).attr("data-still"));
      // clicking the image again will change the state to still
      $(this).attr("data-state", "still");
    }
  });
// calling the add-animal .onclick function and inside the function called event with a even.preventDefault stops the default action of the function
  $("#add-animal").on("click", function(event) {
    event.preventDefault();
    // a new variable that has an input call that reduces the value to zero
    var newAnimal = $("input").eq(0).val();
// an if statement saying if the length of the animal name is 2 push to newAnimal which will no add the new animal if it has 2 or less letters
    if (newAnimal.length > 2) {
            animals.push(newAnimal);
    }
// calling the function to get things rolling
    populateButtons(animals, "animal-button", "#animal-buttons");

  });
// calling the function again outside the less than 2 letter function to add the animals with more letters
  populateButtons(animals, "animal-button", "#animal-buttons");
});
