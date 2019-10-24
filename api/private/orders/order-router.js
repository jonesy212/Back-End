const router = require('express').Router()

const Orders = require('./order-model')


//localhost:5000/api/orders
router.get("/", (req, res) => {
  Orders.find()
    .then(orders => {
      if (orders) {
        res.status(200).json({ message: `Returned orders`, orders });
      }
    })
    .catch(err => {
      res.status(500).json({ message: `not able to find orders, ${err}` });
    });
});

//FIND PRODUCT BY ID //localhost:5000/api/orders/id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Orders.findById(id)
    .then(orders => {
      res.status(200).json(orders);
    })
    .catch(err => {
      res
        .status(500)
        .json({
          message: `Not able to get order information , ${err.stack}`
        });
    });
});

//ADD ORDER //localhost:5000/orders
router.post("/", (req, res) => {
  const order = req.body;
  Orders.add(order)
    .then(order => {
      res.status(201).json({ order });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: `Unable to add new orders ${err.stack}` });
    });
  console.log(req.body);
});


//DELETE ORDER //localhost:5000/api/orders
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (id >= 0) {
    Orders.remove(id)
      .then(order => {
        res.status(200).json(order);
      })
      .catch(error => {
        res.status(404);
        res.send({ message: `The order doesn't exist. ${error}` });
      });
  }else{
      res.status(404).json({message: `Unable to delete order`})
  }
});

router.get("/:id/orders", (req, res) => {
    
    Orders
    .findProductsByFarm(req.params.id)
      .then(order => {
        res.status(201).json(order)
      }).catch(er => {
        console.log(er);
        res.status(400).json({
          message: `Error finding comment ${id}`
        });
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
