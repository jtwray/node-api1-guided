const express = require('express');
const server = express()
const Hubs = require(`./data/hubs-model`)//middleware teaches express new trix!!!¡

server.use(express.json());//parse the responses to json for frontend to understand the returned response


server.get('/', function (request, response) {
    response.send({ hello: 'Web 25!!!' })
});




//see a list of Hubs
server.get(`/api/hubs`, (req, res) => {
    //read the dara form the database (Hubs)
    Hubs.find()//return a promise
        .then(hubs => {
            res.status(200).json(hubs)
        })
        .catch(error => {
            console.log(error);
            //handle the error
            res.status(500).json({ errorMessage: "sorry, we ran into an eror getting the list of hubs" })
        })
})


// server.post(`/api/hubs`, (req, res) => {
//     const hubData = req.body;//for this to work you need the serve.use(express.json()) above 
//     //never trust the client for now we will not test proprtypes etc but only for  this demo
//     Hubs.add(hubData)
//         .then(hub => {
//             res.status(201).json(hub)
//         })
//         .catch(error => {
//             console.log(error);
//             //handle the error
//             res.status(500).json({ errorMessage: "sorry, we ran into an eror getting the list of hubs" })
//         })

// })
server.post('/api/hubs', (req, res) => {
    const hubData = req.body;
    // never trust the client, validate the data. for now we trust the data for the demo
    Hubs.add(hubData)
        .then(hub => {
            res.status(201).json(hub);
        })
        .catch(error => {
            console.log(error);
            // handle the error
            res.status(500).json({
                errorMessage: 'sorry, we ran into an error creating the hub',
            });
        });
});
server.delete('/api/hubs/:id', (req, res) => {
    const id = req.params.id;
    Hubs.remove(id)
      .then(deleted => {
        // res.status(204).end();
        res.status(200).json(deleted);
      })
      .catch(error => {
        console.log(error);
        // handle the error
        res.status(500).json({
          errorMessage: 'sorry, we ran into an error removing the hub',
        });
      });
  });

//to solve the sqllite3 error just do npm i sqlite3



const port = 8000
server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`))
//to run the server type npm run server in the folder root