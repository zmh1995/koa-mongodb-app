/**
 * Format http error json as below:
 * ```
 * {
 *   message: `error message`,
 *   status: Http Status,
 * }
 * ```
 */

module.exports = (error) => ({
  status: error.status,
  error: error.message,
});
