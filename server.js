console.log("server online");


const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.engine('pug', require('pug').__express)
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));

//Redirectar frontpage till /search
app.get('/', function(request, response){
  return response.redirect('filter')
});

//Laddar in search_form.pug och printar på sidan
app.get('/filter', function(req, res){
  return res.render('filter_form')
});

app.post('/filter-result', function(req, res){
  var rawdata = fs.readFileSync('trailers.json');
  var list = JSON.parse(rawdata);



  if(req.body.radioFilter == "trailerLinks"){
	 var resultList = "";

	list.trailers.forEach((trailer, index) => {
		resultList += '<a href="' + trailer.youtube + '">' + trailer.title + '</a> - Rating: ' + trailer.rating + '/5 </br>';
	});

   res.send(resultList);
  }
  else if(req.body.radioFilter == "addedByList"){
	var contributorList = {};

	list.trailers.forEach((trailer, index) => {
		var contributor = trailer.addedBy
		contributorList[contributor] = (contributorList[contributor]+1) || 1 ;
	});
	var listans = ""
	// contributorList.forEach((test,index) => {
	// 	listans += "hej "
	// })

	for (var contributor in contributorList) {
  		listans += contributor +': ' + contributorList[contributor] + ' betygsättningar</br>';
	}

//   console.log(`obj.${prop} = ${obj[prop]}`);
    res.send(listans);
  }



});

//Listar hela listan
app.get('/list', function(req, res){
  var rawdata = fs.readFileSync('trailers.json');
  var list = JSON.parse(rawdata);
  res.send(list);
});

//Laddar in addNew_form.pug och printar på sidan
app.get('/add', function(request, response){
  return response.render('addNew_form')
});

//Lägger till ny Trailer - Tar info från addNew_form och petar in i trailers.json
app.post('/add-new', function(req, res){
  var title = req.body.title;
  var trailerId = (new Date).getTime().toString().substr(6, 6);
  var link = req.body.link;
  var rating = req.body.rating;
  var addedBy = req.body.addedBy;

  var rawdata = fs.readFileSync('trailers.json');
  var list = JSON.parse(rawdata);

  //pushar in nytt object i list.trailers.
  list.trailers.push({
    title:title,
    id:trailerId,
    youtube:link,
    rating:parseInt(rating),
    addedBy:addedBy,
  });

  let data = JSON.stringify(list, null, 1);
  fs.writeFileSync('trailers.json', data);

  res.send("Du har lagt till " + title + " i listan. </br><a href='/list/'>Se lista </a>  ");
});

//Lägger till ny trailer från URL.
app.get('/add/:title/:link/:rating/:addedBy', function(req, res){
  var title = req.params.title;
  var trailerId = (new Date).getTime().toString().substr(6, 6);
  var link = "https://youtu.be/" + req.params.link;
  var rating = req.params.rating;
  var addedBy = req.params.addedBy;


  var rawdata = fs.readFileSync('trailers.json');
  var list = JSON.parse(rawdata);

  list.trailers.push({
    title:title,
    id:trailerId,
    youtube:link,
    rating:parseInt(rating),
    addedBy:addedBy,
  });
  let data = JSON.stringify(list, null, 1);
  fs.writeFileSync('trailers.json', data);

  res.send("Du har lagt till " + title + " i listan. </br><a href='/list/'>Se lista </a>  ");

});

// Ta bort trailer object m.h.a. ID i URL
app.get('/delete/:id', function(req, res){
  //Hämtar in ID från URL
  var trailerId = req.params.id;

  var rawdata = fs.readFileSync('trailers.json');
  var list = JSON.parse(rawdata);

  // Funktionen för att ta bort object
  var deleteTrailer = function(id){
    // Loopa igenom trailarna och hitta den som matchar ID
    for (var i = 0; i < list.trailers.length; i++) {
      if(list.trailers[i].id == id){
        //Ta bort objectet
        list.trailers.splice(i,1);
      }
    }
  }
  //Kör funktion med inhämtat ID
  deleteTrailer(trailerId);

  let data = JSON.stringify(list, null, 1);
  fs.writeFileSync('trailers.json', data);

  res.send("Du har tagit bort från listan. </br><a href='/list/'>Se lista </a>  ");

});

app.get('/edit/:id/:newRating/:changedBy', function(req, res){
  var trailerId = req.params.id;
  var newRating = parseInt(req.params.newRating);
  var changedBy = req.params.changedBy;

  var rawdata = fs.readFileSync('trailers.json');
  var list = JSON.parse(rawdata);

  //Funktion som ändrar trailers rating
  var editTrailer = function(id){
    // Loopa igenom trailarna och hitta den som matchar ID
    for (var i = 0; i < list.trailers.length; i++) {
      if(list.trailers[i].id == id){
        //Ge trailern en ny rating.
        list.trailers[i].rating = newRating;
        //Lägger till "changedBy" och skriver in namnet på den som ändrat.
        list.trailers[i].changedBy = changedBy;
      }
    }
  }
  editTrailer(trailerId);

  let data = JSON.stringify(list, null, 1);
  fs.writeFileSync('trailers.json', data);

  res.send("Du har ändrat en trailers rating i listan. </br><a href='/list/'>Se lista </a>  ");
});


//Filtrera på rating genom att skriva t.ex: /rating/4
app.get('/rating/:rating', function(req, res){
  //Hämtar in rating från URL
  var rating = req.params.rating;
  //Gör tom array att spara filtrerade object i.
  var filteredList = [];

  var rawdata = fs.readFileSync('trailers.json');
  var list = JSON.parse(rawdata);

  //Funktion för att hitta matchande rating och lägga till dem i filteredList
  var ratingFilter = function(ratingInput){
    for (var i = 0; i < list.trailers.length; i++) {
      var trailerList = list.trailers[i]

      if(trailerList.rating == ratingInput){
          filteredList.push(trailerList);
      }
    }
  }
  //Kör funktionen och petar in rating.
  ratingFilter(rating);
  res.send(filteredList);

});


app.listen(3000, listening);
function listening(){
  console.log("listening . . .");
}
