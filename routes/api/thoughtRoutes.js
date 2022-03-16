const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController');

// Route that manages getting thoughts and posting them
router.route('/').get(getThoughts).post(createThought);

// Route that manages updating thoughts or deleting them
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// Route that lets you add reactions to a thought
router.route('/:thoughtId/reactions').post(addReaction);

// Route that lets you delete reactions from a thought
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;