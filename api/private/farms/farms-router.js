const router = require('express').Router()
const Farms = require('./farms-model')


//localhost:5000/api/farms
router.get("/", (req, res) => {
  Farms.find()
    .then(farms => {
      if (farms) {
        res.status(200).json({ message: `Returned farms`, farms });
      }
    })
    .catch(err => {
      res.status(500).json({ message: `not able to find farms, ${err}` });
    });
});

//FIND FARM BY ID //localhost:5000/api/farms/id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Farms.findById(id)
    .then(farms => {
      res.status(200).json(farms);
    })
    .catch(err => {
      res
        .status(500)
        .json({
          message: `Not able to get farm information , ${err.stack}`
        });
    });
});

//ADD FARMS //localhost:5000/farms
router.post("/", (req, res) => {
  const farm = req.body;
  Farms.add(farm)
    .then(farm => {
      res.status(201).json({ farm });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: `Unable to add new farms ${err.stack}` });
    });
  console.log(req.body);
});


//DELETE BY FARMS ID //localhost:5000/api/farms
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (id >= 0) {
    Farms.remove(id)
      .then(farm => {
        res.status(200).json(farm);
      })
      .catch(error => {
        res.status(404);
        res.send({ message: `The farm doesn't exist. ${error}` });
      });
  }else{
      res.status(404).json({message: `Unable to delete farm`})
  }
});


//FIND BY FARM PRODUCTS //localhost:5000/farmId/products
router.get("/farmId/products", (req, res) => {
    
    Farms.findFarmProducts(req.params.id)
      .then(farm => {
        res.status(201).json(farm)
      }).catch(er => {
        console.log(er);
        res.status(400).json({
          message: `Error finding farm products ${id}`
        });
      });
  });


  //UPDATE BY FARM ID //localhost:5000/farms/:id
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    console.log(id)
    Farms.findById(id)
      .then(farm => {
        console.log(farm)
        if (farm) {
          Farms.update(id, changes).then(updatedFarm => {
            res.json(updatedFarm);
          })
        } else {
          res
            .status(404)
            .json({ message: `Could not find farm with given id ${error}` });
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: `Failed to update farm, ${err.stack}` });
      });
  });
  

//ADD BY USER ID //localhost:5000/users
// router.post("/", (req, res) => {
//     const {id} = req.params;
//   return Users.add(id)
//     .then(usr => {
//       res.status(200).json({ message: `Success adding new farm`, ...usr });
//     })
//     .catch(err => {
//       res
//         .status(404)
//         .json({
//           message:
//             "Was not successfully able to add a new farm  Please try again",
//           ...err
//         });
//     });
// });

module.exports = router;
