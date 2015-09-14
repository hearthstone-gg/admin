myApp.config(['NgAdminConfigurationProvider', function(NgAdminConfigurationProvider) {
    var nga = NgAdminConfigurationProvider;

    var reporterId = nga.field('reporterId', 'reference').label('Player ID')
        .targetEntity(user) // Select a target Entity
        .targetField(nga.field('_id'));

    game.creationView().fields([
        reporterId,

        nga.field('status', 'choice').label('Status').choices([{
            value: 'WIN',
            label: 'Win'
        }, {
            value: 'LOSS',
            label: 'Loss'
        }, {
            value: 'TIE',
            label: 'Tie'
        }, ]),
        nga.field('name').label('reporter'),
        nga.field('opponentName').label('opponent'),
        nga.field('playerClass').label('class'),
        nga.field('opponentClass').label('opponent class')
    ]);

    game.listView()
        .title('Games').fields([
            game.creationView().fields(), // reuse fields from another view in another order
            nga.field('_id').label('id').editable(false),
            nga.field('updated', 'date').label('updated').format('MM/dd HH:mm').editable(false),
            nga.field('created', 'date').label('created').format('MM/dd HH:mm').editable(false),
            nga.field('processed', 'boolean').label('processed')
        ])
        .listActions(['show', 'edit', 'delete'])
        .perPage(25);

    game.editionView().fields([
        game.listView().fields(), // reuse fields from another view in another order
    ]).title('Edit {{ entry.values["_id"] }}');

    game.showView().fields([
        game.listView().fields(), // reuse fields from another view in another order
    ]);

    adminApp.addEntity(game);

    appMenu.addChild(nga.menu(game).icon('<span class="glyphicon glyphicon-tower"></span>'));
}]);