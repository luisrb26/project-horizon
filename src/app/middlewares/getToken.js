module.exports = (req) => {
  // Retira o "cabeçalho" do token Bearer
  return req.headers.authorization.split(' ')[1];
};
