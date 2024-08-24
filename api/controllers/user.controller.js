/**
 * @function testController
 * @description A simple test controller
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Promise} A promise that resolves with the response object
 */
export const test = (req, res) => {
  res.json({ message: 'test' });
};
