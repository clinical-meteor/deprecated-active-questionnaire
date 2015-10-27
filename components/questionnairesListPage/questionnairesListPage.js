Session.setDefault('questionnaireSearchFilter', '');
Session.setDefault('tableLimit', 20);
Session.setDefault('paginationCount', 1);
Session.setDefault('selectedPagination', 0);
Session.setDefault('skipCount', 0);



//------------------------------------------------------------------------------
// ROUTING

Router.map(function () {
  this.route('questionnairesListPage', {
    path: '/list/questionnaires/',
    template: 'questionnairesListPage'
  });
});
Router.route('/questionnaire/:questionnaireId/new', {
  name: 'recordUpsertForTemplate',
  template: 'recordUpsertPage',
  data: function (){
    return Questionnaires.findOne({_id: this.params.questionnaireId});
  }
});

//------------------------------------------------------------------------------
// TEMPLATE INPUTS

Template.questionnairesListPage.events({
  "click .listButton": function (event, template){
    Router.go('/list/questionnaires');
  },
  "click .imageGridButton": function (event, template){
    Router.go('/grid/questionnaires');
  },
  "click .tableButton": function (event, template){
    Router.go('/table/questionnaires');
  },
  'change #questionnaireSearchInput': function (){
    Session.set('questionnaireSearchFilter', $('#questionnaireSearchInput').val());
  },
  'click .newLink': function (event, template) {
    event.preventDefault();

    process.env.DEBUG && console.log("click .questionnaireItem");
    Router.go('/questionnaire/' + this._id + "/new");
  },
  'click .addQuestionnaireItem': function () {
    process.env.DEBUG && console.log("click .addQuestionnaireItem");
    Router.go('/insert/questionnaire');
  },
  'click .questionnaireName': function () {
    process.env.DEBUG && console.log("click .questionnaireItem");
    Router.go('/view/questionnaire/' + this._id);
  },
  // use keyup to implement dynamic filtering
  // keyup is preferred to keypress because of end-of-line issues
  'keyup #questionnaireSearchInput': function () {
    Session.set('questionnaireSearchFilter', $('#questionnaireSearchInput').val());
  }
});


//------------------------------------------------------------------------------
// TEMPLATE OUTPUTS


var OFFSCREEN_CLASS = 'off-screen';
var EVENTS = 'webkitTransitionEnd oTransitionEnd transitionEnd msTransitionEnd transitionend';

Template.questionnairesListPage.rendered = function () {
  console.log("trying to update layout...");

  Template.appLayout.delayedLayout(20);
};


Template.questionnairesListPage.helpers({
  getQuestionnaireSearchFilter: function (){
    return Session.get('questionnaireSearchFilter');
  },
  hasNoContent: function () {
    if (Questionnaires.find().count() === 0) {
      return true;
    } else {
      return false;
    }
  },
  questionnairesList: function () {
    // this triggers a refresh of data elsewhere in the table
    // step C:  receive some data and set our reactive data variable with a new value
    Session.set('receivedData', new Date());

    Template.appLayout.delayedLayout(20);

    // this is a performant local (client-side) search on the data
    // current in our CustomerAccounts cursor, and will reactively
    // update the table

    return Questionnaires.find({
      $or: [
        {
          institutionId: {
            $regex: Session.get('questionnaireSearchFilter'),
            $options: 'i'
          }
        },
        {
          participantId: {
            $regex: Session.get('questionnaireSearchFilter'),
            $options: 'i'
          }
        },
        {
          _id: {
            $regex: Session.get('questionnaireSearchFilter'),
            $options: 'i'
          }
        },
        {
          questionnaireName: {
            $regex: Session.get('questionnaireSearchFilter'),
            $options: 'i'
          }
        }
    ]
    });
  }
});
