exports.command = function() {
  this
    .verify.elementPresent("#questionnairesTablePage")
    .verify.elementPresent("#questionnaireSearchInput")
    .verify.elementPresent("#questionnairesTable")
  return this;
};
