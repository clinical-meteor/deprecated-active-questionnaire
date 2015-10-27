exports.command = function (questionnaire) {

  // first we test that default elements are there
  this
    .verify.elementPresent("#questionnaireUpsertPage")
    .verify.elementPresent("#questionnaireUpsertPage .recordHeader")
    .verify.elementPresent("#questionnaireUpsertCard")

    .verify.elementPresent('input[name="questionnaireName"]')
    .verify.elementPresent('input[name="institutionName"]')
    .verify.elementPresent('input[name="institutionId"]')
    .verify.elementPresent('input[name="collaborationName"]')
    .verify.elementPresent('input[name="collaborationId"]')
    .verify.elementPresent('input[name="slug"]');

  // if the field was specified, lets check it's set in its corresponding input
  if (questionnaire) {
    if (questionnaire.questionnaireName) {
      this
        .verify.elementPresent('input[name="questionnaireName"]')
        .clearValue('input[name="questionnaireName"]')
        .setValue('input[name="questionnaireName"]', questionnaire.questionnaireName);
    }
    if (questionnaire.institutionName) {
      this
        .verify.elementPresent('input[name="institutionName"]')
        .clearValue('input[name="institutionName"]')
        .setValue('input[name="institutionName"]', questionnaire.institutionName);
    }
    if (questionnaire.institutionId) {
      this
        .verify.elementPresent('input[name="institutionId"]')
        .clearValue('input[name="institutionId"]')
        .setValue('input[name="institutionId"]', questionnaire.institutionId);
    }
    if (questionnaire.collaborationName) {
      this
        .verify.elementPresent('input[name="collaborationName"]')
        .clearValue('input[name="collaborationName"]')
        .setValue('input[name="collaborationName"]', questionnaire.collaborationName);
    }
    if (questionnaire.collaborationId) {
      this
        .verify.elementPresent('input[name="collaborationId"]')
        .clearValue('input[name="collaborationId"]')
        .setValue('input[name="collaborationId"]', questionnaire.collaborationId);
    }
    if (questionnaire.slug) {
      this
        .verify.elementPresent('input[name="slug"]')
        .clearValue('input[name="slug"]')
        .setValue('input[name="slug"]', questionnaire.slug);
    }
  }


  this
    .verify.elementPresent("#questionnaireUpsertPage .recordFooter")
    .verify.elementPresent("#saveQuestionnaireButton")
    .click("#saveQuestionnaireButton").pause(500);

  return this;
};
