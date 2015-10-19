Meteor.publish("questionnaires", function (questionnaireId) {
  if (questionnaireId) {
    return Questionnaires.findOne({
      _id: questionnaireId
    });
  } else {
    return Questionnaires.find();
  }
});
