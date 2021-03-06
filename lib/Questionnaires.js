Questionnaires = new Meteor.Collection('questionnaires');

Questionnaires.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  }
});


QuestionnaireSchema = new SimpleSchema({
  "questionnaireName": {
    type: String,
    optional: true,
    defaultValue: "",
    label: "Questionnaire Name"
  },
  // "createdAt": {
  //   type: Date,
  //   optional: true,
  //   defaultValue: new Date(),
  //   label: "Created At"
  // },
  "starred": {
    type: Boolean,
    optional: true,
    defaultValue: false,
    label: "Starred"
  },
  "active": {
    type: Boolean,
    optional: true,
    defaultValue: true,
    label: "Active"
  },

  "ownerId": {
    type: String,
    optional: true,
    defaultValue: "",
    label: "Owner Id"
  },
  "owner": {
    type: String,
    optional: true,
    defaultValue: "",
    label: "Owner"
  },

  "collaborationName": {
    type: String,
    optional: true,
    defaultValue: "",
    label: "Collaboration Name"
  },
  "collaborationId": {
    type: String,
    optional: true,
    defaultValue: "",
    label: "Collaboration ID"
  },
  "slug": {
    type: String,
    optional: true,
    defaultValue: "",
    label: "Slug/Code"
  },

  "schema": {
    type: Object,
    optional: true,
    blackbox: true,
    label: "Schema"
  },
  "numBlocks": {
    type: Number,
    optional: true,
    label: "Number of Form Elements"
  },
  "n": {
    type: String,
    optional: true,
    label: "Nth Collection"
  },
  "incompleteCount": {
    type: Number,
    optional: true,
    label: "Incomplete Count",
    defaultValue: 0
  },
  "fieldOrder": {
    type: [String],
    optional: true,
    label: "Field Order"
  },
  "study": {
    type: String,
    optional: true,
    label: "Study"
  },
  "studyId": {
    type: String,
    optional: true,
    label: "Study ID"
  }
});
Questionnaires.attachSchema(QuestionnaireSchema);
