 myApp.config(['NgAdminConfigurationProvider', function(NgAdminConfigurationProvider) {
    var nga = NgAdminConfigurationProvider;

    // entity factory function
    var user = nga.entity('user').identifier(nga.field('_id')).label('Users');

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

    user.editionView().fields([
        user.listView().fields(), // reuse fields from another view in another order
        nga.field('bnet.token').label('BNET token'),
        nga.field('token').label('socket token'),
    ]).title('Edit {{ entry.values["bnet.name"] }}');

    user.showView().fields([
        user.listView().fields(), // reuse fields from another view in another order
        nga.field('socket token').label('token').editable(false),
        nga.field('bnet.token').label('BNET token').editable(false)
    ]);

    adminApp.addEntity(user);

    appMenu.addChild(nga.menu(user).icon('<span class="glyphicon glyphicon-user"></span>'));
}]);