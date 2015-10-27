Router.route("/grid/questionnaires", {
  template: "questionnaireImageGridPage",
  name: "questionnaireImageGridPage"
});


Template.questionnaireImageGridPage.rendered = function () {
  Template.appLayout.delayedLayout(10);
};

Template.questionnaireImageGridPage.helpers({
  lists: function () {
    return Questionnaires.find({
      title: {
        $regex: Session.get('questionnaireSearchFilter'),
        $options: 'i'
      }
    });
  }
});

Template.questionnaireImageGridPage.events({
  "click .listButton": function (event, template){
    Router.go('/list/questionnaires');
  },
  "click .imageGridButton": function (event, template){
    Router.go('/grid/questionnaires');
  },
  "click .tableButton": function (event, template){
    Router.go('/table/questionnaires');
  },

  'keyup #questionnaireSearchInput': function () {
    Session.set('questionnaireSearchFilter', $('#questionnaireSearchInput').val());
  },
  "click .questionnaireImage": function (event, template) {
    Router.go('/upsert/questionnaire/' + this._id);
  },
  "click .addNewQuestionnaire": function (event, template) {
    Router.go('/insert/questionnaire');
  }
});
