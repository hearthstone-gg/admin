 myApp.config(['NgAdminConfigurationProvider', function(NgAdminConfigurationProvider) {
    var nga = NgAdminConfigurationProvider;

    // entity factory function
    var globalUser = nga.entity('global-user').identifier(nga.field('_id')).label('Global Users');

    globalUser.creationView().fields([
        nga.field('name').label('Name'),
        nga.field('elo', 'number').label('ELO'),
    ]);

    globalUser.listView()
        .title('Users').fields([
            globalUser.creationView().fields(), // reuse fields from another view in another order
            nga.field('_id').label('id').editable(false),
            nga.field('updated', 'date').label('updated').format('MM/dd HH:mm').editable(false),
            nga.field('created', 'date').label('created').format('MM/dd HH:mm').editable(false),
            nga.field('elo', 'number').label('ELO Rating')
        ])
        .listActions(['show', 'edit', 'delete']);

    globalUser.editionView().fields([
        globalUser.listView().fields(), // reuse fields from another view in another order
    ]).title('Edit {{ entry.values["name"] }}');

    globalUser.showView().fields([
        globalUser.listView().fields(), // reuse fields from another view in another order
    ]);

    adminApp.addEntity(globalUser);

    appMenu.addChild(nga.menu(globalUser).icon('<span class="glyphicon glyphicon-globe"></span>'));
}]);