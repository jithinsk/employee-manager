function validator(schema) {
  return (req, _, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: true,
      convert: false,
      stripUnknown: true,
    });
    if (!error) return next();
    return next(error);
  };
}

module.exports = {
  validator,
};
