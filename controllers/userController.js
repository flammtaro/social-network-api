const { User, Thought } = require('../models');

const userCount = async () => 
    User.aggregate()
    .count('number of users')
    .then((numberOfUsers) => numberOfUsers);

const userThoughts = async(userId) =>
    User.aggregate([
        {
            $unwind: '$thoughts',
        },
        {
            $match:{_id:ObjectId(userId)}
        }
    ])

module.exports = {
    //Controller for getting all users
    getUsers(req, res) {
        User.find()
        .then(async (users) => {
            const userObj = {
                users,
                userCount: await userCount()
            };
            return res.json(userObj);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        })
    },

    //Controller for getting a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__V')
            .then(async (user) =>
                !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
              })
    },

    //Controller for creating a user
    createUser(req, res) {
        User.create(req.body)
        .then((userData) => res.json(userData))
        .catch((err) => res.status(500).json(err));
    },

    //Controller for deleting a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : Thought.deleteMany({ _id: { $in: user.thoughts } })
          )
          .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
          .catch((err) => res.status(500).json(err));
      },

    //Controller for updating a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user with this ID!'})
                    : res.json(user)
            )
    },

    //Controller for adding a friend
    addFriend(req, res) {
        console.log('You are adding a friend');
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'No user found with that ID :(' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },

    //Controller for removing a friend
    removeFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'No user found with that ID :(' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
}