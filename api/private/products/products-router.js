const router = require("express").Router();

const Products = require("./products-model");

// const change = (arr) => {
//     const Arr
// }

//localhost:5000/api/products
router.get("/", (req, res) => {
  Products.find()
    .then(products => {
      if (products) {
        res.status(200).json({ message: `Returned products`, products });
      }
    })
    .catch(err => {
      res.status(500).json({ message: `not able to find products, ${err}` });
    });
});

//FIND PRODUCT BY ID //localhost:5000/api/products/id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Products.findById(id)
    .then(products => {
      res.status(200).json(products);
    })
    .catch(err => {
      res
        .status(500)
        .json({
          message: `Not able to get product information , ${err.stack}`
        });
    });
});

//ADD PRODUCT //localhost:5000/products
router.post("/", (req, res) => {
  const product = req.body;
  Products.add(product)
    .then(product => {
      res.status(201).json({ product });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: `Unable to add new products ${err.stack}` });
    });
  console.log(req.body);
});

//localhost:5000/products/:id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  console.log(id)
  Products.findById(id)
    .then(product => {
      console.log(product)
      if (product) {
        Products.update(id, changes).then(updatedProduct => {
          res.json(updatedProduct);
        })
      } else {
        res
          .status(404)
          .json({ message: `Could not find product with given id ${error}` });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: `Failed to update product, ${err.stack}` });
    });
});



//DELETE PRODUCT //localhost:5000/api/products
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (id >= 0) {
    Products.remove(id)
      .then(product => {
        res.status(200).json(product);
      })
      .catch(error => {
        res.status(404);
        res.send({ message: `The product doesn't exist. ${error}` });
      });
  }else{
      res.status(404).json({message: `Unable to delete product`})
  }
});

router.get("/:id/products", (req, res) => {
    
    Products
    .findProductsByFarm(req.params.id)
      .then(product => {
        res.status(201).json(product)
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
//       res.status(200).json({ message: `Success adding new product`, ...usr });
//     })
//     .catch(err => {
//       res
//         .status(404)
//         .json({
//           message:
//             "Was not successfully able to add a new product  Please try again",
//           ...err
//         });
//     });
// });

module.exports = router;
