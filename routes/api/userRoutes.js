const router = require('express').Router();
// const { route } = require('.');
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// Route that lets you find and create users
router.route('/').get(getUsers).post(createUser);

// Route that lets you edit or delete a user
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// Route that lets you add a friend
router.route('/:userId/friends/:friendId').post(addFriend);

// Route that lets you delete a friend
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;