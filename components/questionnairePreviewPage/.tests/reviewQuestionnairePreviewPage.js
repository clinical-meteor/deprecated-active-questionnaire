exports.command = function () {
  this
    .verify.elementPresent("#questionnairePreviewPage")
    .verify.elementPresent("#questionnairePreviewCard")
    .verify.elementPresent("#questionnaireTitleText")
    .verify.elementPresent("#notesText");
  return this;
};
