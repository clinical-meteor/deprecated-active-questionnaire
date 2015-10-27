exports.command = function() {
  this
    .verify.elementPresent("#questionnaireImageGridPage")
    .verify.elementPresent("#questionnaireSearchInput")
    .verify.elementPresent("#questionnaireImageGrid")
    .verify.elementPresent("#addNewQuestionnaire")
  return this;
};
