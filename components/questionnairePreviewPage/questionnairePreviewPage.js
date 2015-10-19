
Router.map(function(){
  this.route('questionnairePreviewPage', {
    path: '/questionnaire/:id',
    template: 'questionnairePreviewPage',
    data: function () {
      return Questionnaires.findOne({_id: this.params.id});
    },
    onAfterAction: function(){
      Template.appLayout.layout();
    }
  });
});


Template.questionnairePreviewPage.rendered = function(){
  Template.appLayout.layout();
};



Template.questionnairePreviewPage.events({
  "click .listButton": function(event, template){
    Router.go('/list/questionnaires');
  },
  "click .imageGridButton": function(event, template){
    Router.go('/grid/questionnaires');
  },
  "click .tableButton": function(event, template){
    Router.go('/table/questionnaires');
  },
  "click .indexButton": function(event, template){
    Router.go('/list/questionnaires');
  },
  "click .questionnaireId": function(){
    Router.go('/upsert/questionnaire/' + this._id);
  }
});
