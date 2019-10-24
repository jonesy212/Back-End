const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Users = require("./user-model");
const restricted = require("../../auth/restricted-middleware");
// const checkRole = require('../../auth/check-role-middleware');


//localhost:5000/api/users
router.get("/", (req, res) => {
  Users.findAll()
    .then(users => {
      res.json({ loggedInUser: req.username, users });
    })
    .catch(error => res.status(500).json(error.stack
        ));
});

router.get("/hash", (req, res) => {
  const password = req.headers.authorization;

  if (password) {
    //that 8 is how we slow down attackers trying
    //to pre-generate hashes
    const hash = bcrypt.hashSync(password, 10);

    res.status(200).json({ hash });
  } else {
    res.status(400).json({ message: "Please provide credentials" });
  }
});

//FIND BY USER ID //localhost:5000/users/:id
router.get("/:id", (req, res) => {
    const {id} = req.params

  return Users.findById(id)
    .then(usr => {
      res.status(200).json({ message: `Found the following users`, ...usr });
    })
    .catch(err => {
      res.status(404).json({ message: "Not able to farm", ...err });
    });
});

//ADD USER //localhost:5000/users
router.post("/", (req, res) => {
    const {id} = req.params;
  return Users.add(id)
    .then(usr => {
      res.status(200).json({ message: `Success adding new farm`, ...usr });
    })
    .catch(err => {
      res
        .status(404)
        .json({
          message:
            "Was not successfully able to add a new farm  Please try again",
          ...err
        });
    });
});

//UPDATE BY USER ID //localhost:5000/users/:id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { body } = req;

  return Users.updateById(id)
    .then(usr => {
      res.status(200).json({ message: `Updated farm ${id}`, ...usr });
    })
    .catch(err => {
      res
        .status(404)
        .json({ message: `Not able to find farm ID ${id}`, ...err });
    });
});

//DELETE BY USER ID //localhost:5000/users/:id
router.delete("/:id", (req, res) => {
  return Users.remove(id)
    .then(usr => {
      res.status(200).json({ message: `deleted farm ${id}`, ...usr });
    })
    .catch(err => {
      res
        .status(404)
        .json({ message: `Not able to delete farm ID ${id}`, ...err });
    });
});


//localhost:5000/users
// router.get('/', (req, res) => {
//     return Users.findFarmByName(id)
//     .then(p=>{res.status(200).json({message:`List of all users`,...p})})
//     .catch(err=>{res.status(404).json({message:`Not able to locate users`, ...err.stack})})
// })

// router.get("/", (req, res) => {
// const u = req.body
//     if(u.username && u.password){
//         User.findByUserName(u.username)
//         .then(user=>{
//             bcrypt.compare(u.password,user.password,(err,success)=>{
//                 if(err) return res.status(401).json({message:"Invalid Credentials"})
//                 delete user.password
//                 delete user.customer
//                 delete user.farmer
//                 res.status(200).json({user,token,token_type:'Basic'})
//             })
//         })
//     }
// })




module.exports = router;
