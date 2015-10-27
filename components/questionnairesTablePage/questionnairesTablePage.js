Session.setDefault('questionnaireSearchFilter', '');
Session.setDefault('tableLimit', 20);
Session.setDefault('paginationCount', 1);
Session.setDefault('selectedPagination', 0);
Session.setDefault('skipCount', 0);



//------------------------------------------------------------------------------
// ROUTING

Router.map(function(){
  this.route('questionnairesTablePage', {
    path: '/table/questionnaires',
    template: 'questionnairesTablePage'
  });
});


//------------------------------------------------------------------------------
// TEMPLATE INPUTS

Template.questionnairesTablePage.events({
  "click .listButton": function (event, template){
    Router.go('/list/questionnaires');
  },
  "click .imageGridButton": function (event, template){
    Router.go('/grid/questionnaires');
  },
  "click .tableButton": function (event, template){
    Router.go('/table/questionnaires');
  },
  'click .starA': function(event, template){
    event.stopPropagation();
    Questionnaires.update({_id: this._id}, {$set: {stars: 1}});
  },
  'click .starB': function(event, template){
    event.stopPropagation();
    Questionnaires.update({_id: this._id}, {$set: {stars: 2}});
  },
  'click .starC': function(event, template){
    event.stopPropagation();
    Questionnaires.update({_id: this._id}, {$set: {stars: 3}});
  },
  'click .starD': function(event, template){
    event.stopPropagation();
    Questionnaires.update({_id: this._id}, {$set: {stars: 4}});
  },
  'click .starE': function(event, template){
    event.stopPropagation();
    Questionnaires.update({_id: this._id}, {$set: {stars: 5}});
  },
  'click .checkbox': function(event, template){
    event.stopPropagation();
    if(this.checked){
      Questionnaires.update({_id: this._id}, {$set: {checked: false}});
    }else{
      Questionnaires.update({_id: this._id}, {$set: {checked: true}});
    }
  },
  'click .flag': function(event, template){
    event.stopPropagation();
    if(this.flagged){
      Questionnaires.update({_id: this._id}, {$set: {flagged: false}});
    }else{
      Questionnaires.update({_id: this._id}, {$set: {flagged: true}});
    }
  },
  'click .addUserIcon': function(){
    Router.go('/insert/questionnaire');
  },
  'click .delete': function(){
    Questionnaires.remove(this._id);
  },
  'click tr': function(){
    Router.go('/view/questionnaire/' + this._id);
  },
  // use keyup to implement dynamic filtering
  // keyup is preferred to keypress because of end-of-line issues
  'keyup #questionnaireSearchInput': function() {
    Session.set('questionnaireSearchFilter', $('#questionnaireSearchInput').val());
  }
});


//------------------------------------------------------------------------------
// TEMPLATE OUTPUTS

Template.questionnairesTablePage.helpers({
  isGrayedOut: function(){
    if(this.checked){
      return "gray";
    }else{
      return "";
    }
  },
  starA: function(){
    if(this.stars >= 1){
      return "fa-star";
    }else{
      return "fa-star-o"
    }
  },
  starB: function(){
    if(this.stars >= 2){
      return "fa-star";
    }else{
      return "fa-star-o"
    }
  },
  starC: function(){
    if(this.stars >= 3){
      return "fa-star";
    }else{
      return "fa-star-o"
    }
  },
  starD: function(){
    if(this.stars >= 4){
      return "fa-star";
    }else{
      return "fa-star-o"
    }
  },
  starE: function(){
    if(this.stars == 5){
      return "fa-star";
    }else{
      return "fa-star-o"
    }
  },
  checkedIcon: function(){
    if(this.checked){
      return "fa-check";
    }else{
      return "fa-square-o";
    }
  },
  flaggedIcon: function(){
    if(this.flagged){
      return "fa-flag";
    }else{
      return "fa-flag-o";
    }
  },
  questionnairesList: function() {
    // this triggers a refresh of data elsewhere in the table
    // step C:  receive some data and set our reactive data variable with a new value
    Session.set('receivedData', new Date());

    Template.appLayout.delayedLayout(100);

    // this is a performant local (client-side) search on the data
    // current in our CustomerAccounts cursor, and will reactively
    // update the table
    return Questionnaires.find({
      title: {
        $regex: Session.get('questionnaireSearchFilter'),
        $options: 'i'
    }});
  }
});


Template.questionnairesTablePage.rendered = function(){
  Template.appLayout.layout();

  // step A:  initialize the table sorting functionality
  $(this.find('#questionnairesTable')).tablesorter();

  // the Tracker API watches Collection and Session objects
  // so what we're doing here is registering a Tracker to watch the
  // Session.get('receivedData') variable.  When it changes, everything
  // in the autorun() clause will get rerun

  // step B:  register a tracker to add the tablesorting functionality back
  // after we update data
  Tracker.autorun(function() {

    // step D: register that the recevedData variable has been changed
    // and rerun the Tracker clause
    // step E: actually log the new value in receivedData
    console.log(Session.get('receivedData'))
    setTimeout(function() {
      // step F:  update the tablesorting library 200ms after receiving data
      // and Blaze has had a change to rerender the table
      $("#questionnairesTable").trigger("update");
    }, 200);
  });

};
