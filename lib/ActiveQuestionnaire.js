
// ActiveQuestionnaire = {
//   questionnaireKey: undefined,
//   config: {},
//   state: {
//     visible: false
//   }
// };

ActiveQuestionnaire = function (input) {
  if (typeof input === "object") {
    this.config = input;
  } else {
    this.questionnaireKey = input;
  }
};

ActiveQuestionnaire.prototype.questionnaireKey = undefined;
ActiveQuestionnaire.prototype.config = {};
ActiveQuestionnaire.prototype.state = {
  visible: false
};
ActiveQuestionnaire.prototype.security = function (){};


ActiveQuestionnaire.prototype.create = function (input) {
  this.questionnaireKey = input;
  return;
};
ActiveQuestionnaire.prototype.config = function (config) {
  this.config = config;
  return;
};
ActiveQuestionnaire.prototype.report = function () {
  return this;
};

ActiveQuestionnaire.prototype.onPublish = function (callback) {
  this.security = callback;
};
ActiveQuestionnaire.prototype.publish = function () {
  return this.security();
};
