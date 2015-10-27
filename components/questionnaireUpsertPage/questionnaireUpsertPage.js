Session.setDefault('questionnaireReadOnly', true);



Router.route('/build/questionnaire', {
  name: 'buildQuestionnaireRoute',
  template: 'questionnaireUpsertPage'
});

Router.route('/insert/questionnaire', {
  name: 'insertQuestionnaireRoute',
  template: 'questionnaireUpsertPage'
});

Router.route('/upsert/questionnaire/:id', {
  name: 'upsertQuestionnaireRoute',
  template: 'questionnaireUpsertPage',
  data: function (){
    return Questionnaires.findOne(this.params.id);
  },
  onAfterAction: function (){
    Session.set('questionnaireReadOnly', false);
  }
});
Router.route('/view/questionnaire/:id', {
  name: 'viewQuestionnaireRoute',
  template: 'questionnaireUpsertPage',
  data: function (){
    return Questionnaires.findOne(this.params.id);
  }
});
// Router.route('/questionnaire/:questionnaireId/new', {
//   name: 'recordUpsertForTemplate',
//   template: 'questionnaireUpsertPage',
//   data: function (){
//     return Questionnaires.findOne({_id: this.params.questionnaireId});
//   }
// });

//-------------------------------------------------------------


Template.questionnaireUpsertPage.rendered = function (){
  Template.appLayout.layout();
};


Template.questionnaireUpsertPage.helpers({
  isNewQuestionnaire: function (){
    if (this._id){
      return false;
    } else {
      return true;
    }
  },
  getLockIcon: function (){
    if (Session.get('questionnaireReadOnly')){
      return "fa-lock";
    } else {
      return "fa-unlock";
    }
  },
  isReadOnly: function (){
    if (Session.get('questionnaireReadOnly')){
      return "readonly";
    }
  },
  getQuestionnaireId: function () {
    if ( this._id ) {
      return this._id;
    } else {
      return "---";
    }
  }
});

Template.questionnaireUpsertPage.events({
  'click input[name="collaborationName"]': function (){
    Session.set('show_reactive_overlay', true);
    Session.set('showCollaborationPicklist', true);
  },
  'click input[name="collaborationId"]': function (){
    Session.set('show_reactive_overlay', true);
    Session.set('showCollaborationPicklist', true);
  },
  'click #removeQuestionnaireButton': function (){
    Questionnaires.remove(this._id, function (error, result){
      if (result){
        Router.go('/list/questionnaires');
      }
    });
  },
  "click #saveQuestionnaireButton": function (event, template){
    event.preventDefault();
    Template.questionnaireUpsertPage.saveQuestionnaire(this);
    Session.set('questionnaireReadOnly', true);
  },
  "click .barcode": function (){
    // TODO:  refactor to Session.toggle('questionnaireReadOnly')
    if (Session.equals('questionnaireReadOnly', true)){
      Session.set('questionnaireReadOnly', false);
    } else {
      Session.set('questionnaireReadOnly', true);
      console.log('Locking the questionnaire...');
      Template.questionnaireUpsertPage.saveQuestionnaire(this);
    }
  },
  "click #lockQuestionnaireButton": function (){
    console.log("click #lockQuestionnaireButton");

    if (Session.equals('questionnaireReadOnly', true)){
      Session.set('questionnaireReadOnly', false);
    } else {
      Session.set('questionnaireReadOnly', true);
    }
  },
  "click .listButton": function (event, template){
    Router.go('/list/questionnaires');
  },
  "click .imageGridButton": function (event, template){
    Router.go('/grid/questionnaires');
  },
  "click .tableButton": function (event, template){
    Router.go('/table/questionnaires');
  },
  'click #previewQuestionnaireButton':function (){
    Router.go('/customer/' + this._id);
  },
  'submit #upsertQuestionnaireForm': function () {
    console.log('creating new questionnaire...');
    //Template.questionnaireUpsertPage.saveQuestionnaire(this);
  }
});


Template.questionnaireUpsertPage.saveQuestionnaire = function (questionnaire){
  console.log('Template.questionnaireUpsertPage.saveQuestionnaire', questionnaire);

  var newQuestionnaire = {
    questionnaireName: $('input[name="questionnaireName"]').val(),
    institutionName: $('input[name="institutionName"]').val(),
    institutionId: $('input[name="institutionId"]').val(),
    collaborationName: $('input[name="collaborationName"]').val(),
    collaborationId: $('input[name="collaborationId"]').val(),
    slug: $('input[name="slug"]').val()
  };

  process.env.DEBUG && console.log ("newQuestionnaire", newQuestionnaire);

  if (questionnaire._id){
    Questionnaires.update({_id: questionnaire._id}, {$set: newQuestionnaire }, function (error, result){
      if (error) console.log(error);
      Router.go('/view/questionnaire/' + questionnaire._id);
    });
  } else {
    Questionnaires.insert(newQuestionnaire, function (error, result){
      if (error) console.log(error);
      Router.go('/list/questionnaires/');
      //Router.go('/view/questionnaire/' + result);
    });
  }
};
