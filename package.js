Package.describe({
  name: 'clinical:active-questionnaire',
  version: '1.0.7',
  summary: 'ActiveQuestionnaire component for the ClinicalFramework; provides CRUD pattern using Autoform.',
  git: 'http://github.com/clinical-meteor/active-questionnaire',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  api.use('meteor-platform');
  api.use('iron:router@1.0.7');
  api.use('grove:less@0.1.1');
  api.use('photonic:glass-ui@0.2.4');

  api.use('photonic:active-record-core@0.0.2');
  api.use('photonic:active-record-header@0.0.4');
  api.use('photonic:active-record-footer@0.0.4');

  api.imply('aldeed:simple-schema@1.3.3');
  api.imply('aldeed:collection2@2.3.3');

  api.addFiles([
    'components/questionnairesListPage/questionnairesListPage.html',
    'components/questionnairesListPage/questionnairesListPage.js',
    'components/questionnairesListPage/questionnairesListPage.less',

    'components/questionnaireImageGridPage/questionnaireImageGridPage.html',
    'components/questionnaireImageGridPage/questionnaireImageGridPage.js',
    'components/questionnaireImageGridPage/questionnaireImageGridPage.less',

    'components/questionnairesTablePage/questionnairesTablePage.html',
    'components/questionnairesTablePage/questionnairesTablePage.js',
    'components/questionnairesTablePage/questionnairesTablePage.less',

    'components/questionnaireUpsertPage/questionnaireUpsertPage.html',
    'components/questionnaireUpsertPage/questionnaireUpsertPage.js',
    'components/questionnaireUpsertPage/questionnaireUpsertPage.less',
  ], ['client']);

  api.addFiles([
    'lib/ActiveQuestionnaire.js',
    'lib/Questionnaires.js'

  ], ['client', 'server']);

  api.addFiles(['server/publications.js'], 'server');

  api.export("ActiveQuestionnaire");
  api.export("Questionnaires");
});

Package.onTest(function (api) {
  api.use('tinytest');
  api.use('meteor-platform');
  api.use('session');

  api.use('clinical:active-questionnaire');
  api.use('clinical:verification');

  api.addFiles('tests/active-questionnaire.js');
});
