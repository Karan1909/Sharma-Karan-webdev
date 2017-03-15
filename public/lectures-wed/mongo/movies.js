module.exports=function (app) {
    app.get('/api/evening/movie',findAllMovies);
    app.post('/api/evening/movie',createMovie);
    app.get('/api/evening/movie/:movieId',findMovieById);
    

  var mongoose=require('mongoose');

  var MovieSchema=mongoose.Schema(
      {
          title : {type: String, required:true},
          rating : {type: String, enum: ['G','PG','PG-13','R']},
          plot : String,
          cast: [String],
          poster: String,
          releaseDate: Date,
          boxoffice: Number,
          created: {type: Date, default:Date.now}

      }
  );

  var MovieModel=mongoose.model('MovieModel',MovieSchema);// unique identifier model will allow us to manipulate objects that
    // will follow the set of instructions defined in schema
    // MovieModel.create({title: 'Avatar',cast:['Karan Sharma']});
    MovieModel
        .findById('58c75e2343db6744c07ea0f9').then(function (movies) {
        console.log(movies);
    });
    
    function findAllMovies(req,res) {
        MovieModel
            .find()
            .then(function (movies) {
                    res.send(movies);
                }
                
            )

    }

    function createMovie(req,res) {
        var movie=req.body;
        MovieModel
            .create(movie)
            .then(
                function () {
                    res.json(movie);
                },function (err) {
                    res.sendStatus(400).send(err);

                });

    }
    function findMovieById(req,res) {
        var id=req.params.movieId;
        MovieModel
            .findById(id)
            .then(
              function (movies) {
                  res.send(movies);
              }  
            );

    }

    MovieModel
        .update({_id: '58c75e2343db6744c07ea0f9'},
            {$set: {rating:'R'}})
        .then(function (movies) {
        console.log(movies);
    });

    // MovieModel.remove({_id: '58c75e2343db6744c07ea0f9'})
    //     .then(function (status) {
    //         console.log(status);
    //     } ,function (error) {
    //         console.log(error);
    //     });



};
