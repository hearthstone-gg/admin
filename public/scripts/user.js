 myApp.config(['NgAdminConfigurationProvider', function(NgAdminConfigurationProvider) {
    var nga = NgAdminConfigurationProvider;


    user.creationView().fields([
        nga.field('bnet.name').label('BNET name'),
        nga.field('bnet.id').label('BNET id'),
    ]);

    user.listView()
        .title('Users').fields([
            user.creationView().fields(), // reuse fields from another view in another order
            nga.field('_id').label('id').editable(false),
            nga.field('updated', 'date').label('updated').format('MM/dd HH:mm').editable(false),
            nga.field('created', 'date').label('created').format('MM/dd HH:mm').editable(false),
            nga.field('elo', 'number').label('ELO Rating')
        ])
        .listActions(['show', 'edit', 'delete']);

    var gameField = nga.field('games', 'referenced_list') // Define a N-1 relationship with the comment entity
        .label('Games')
        .targetEntity(game) // Target the comment Entity
        .targetReferenceField('reporterId') // Each comment with post_id = post.id (the identifier) will be displayed
        .targetFields([ // Display comment field to display
            nga.field('_id').label('ID'),
            nga.field('status').label('Status'),
            nga.field('opponentName').label('Opponent'),
            nga.field('created', 'date').label('created').format('MM/dd HH:mm').editable(false),
        ])
        .perPage(5)
        .sortField('created');

    user.editionView().fields([
        user.listView().fields(), // reuse fields from another view in another order
        nga.field('bnet.token').label('BNET token'),
        nga.field('token').label('socket token'),
        gameField
    ]).title('Edit {{ entry.values["bnet.name"] }}');

    user.showView().fields([
        user.listView().fields(), // reuse fields from another view in another order
        nga.field('socket token').label('token').editable(false),
        nga.field('bnet.token').label('BNET token').editable(false),
        gameField
    ]);

    adminApp.addEntity(user);

    appMenu.addChild(nga.menu(user).icon('<span class="glyphicon glyphicon-user"></span>'));
}]);