const { JWT_SECRET = process.env.JWT_SECRET || "supersecrettoken" } =
  process.env;

module.exports = { JWT_SECRET };
