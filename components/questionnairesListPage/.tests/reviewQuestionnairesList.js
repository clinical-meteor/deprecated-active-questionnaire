exports.command = function (questionnaire, next) {
  this
    .verify.elementPresent("#questionnairesListPage")
    .verify.elementPresent("#questionnairesListPage .recordHeader")
    .verify.elementPresent("#questionnaireSearchInput")
    .verify.elementPresent("#questionnairesList")
    .verify.elementPresent("#questionnairesList .questionnaireItem:nth-child(1)")
    .verify.elementPresent("#questionnairesList .questionnaireItem:nth-child(1) article")
    .verify.elementPresent("#questionnairesListPage .recordFooter");

  if (questionnaire) {
    this
      .verify.elementPresent("#questionnaireSearchInput")
      .clearValue("#questionnaireSearchInput").pause(300)
      .setValue("#questionnaireSearchInput", questionnaire.questionnaireSearch).pause(500)
      .verify.elementPresent("#questionnairesList .questionnaireItem:nth-child(1)")
      .verify.elementPresent("#questionnairesList .questionnaireItem:nth-child(1) article")
      .verify.elementPresent("#questionnairesList .questionnaireItem:nth-child(1) article h2")
      .verify.containsText("#questionnairesList .questionnaireItem:nth-child(1) article h2",
        questionnaire.questionnaireName);

    if (next) {
      this
        .verify.elementPresent(
          "#questionnairesList .questionnaireItem:nth-child(1) article .newLink")
        .click("#questionnairesList .questionnaireItem:nth-child(1) article .newLink").pause(500);
    }
  } else {
    this
      .verify.elementPresent("#questionnairesList #noResultsMessage")
      .verify.elementPresent("#questionnairesList .addFooItem")
      .verify.elementNotPresent("#questionnairesList .questionnaireItem:nth-child(2)")
      .verify.elementNotPresent("#questionnairesList .questionnaireItem:nth-child(2) article");
  }

  return this;
};
