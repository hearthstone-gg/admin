myApp.config(['NgAdminConfigurationProvider', 'RestangularProvider', function(NgAdminConfigurationProvider, RestangularProvider) {
    var nga = NgAdminConfigurationProvider;
    // create an admin application
    adminApp = nga.application('hs.gg Admin');
    adminApp.baseApiUrl('http://' + window.__hsggServices.api.domain+'/');
   
    appMenu = nga.menu();
    adminApp.menu(appMenu);

    appDashboard = nga.dashboard();

    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params, httpConfig) {
        if (operation == 'getList') {
            params.skip = (params._page - 1) * params._perPage;
            params.limit = params._perPage;

            delete params._page;
            delete params._perPage;
        }
        return { params: params };
    });

    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params, httpConfig) {
        if (operation == 'getList') {
            params.sort = (params._sortDir === 'ASC' ? '' : '-') + params._sortField;

            delete params._sortDir;
            delete params._sortField;
        }
        return { params: params };
    });

    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params, httpConfig) {
        if (operation == 'getList') {
            if (params._filters) {
                for (var filter in params._filters) {
                    params[filter] = params._filters[filter];
                }
                delete params._filters;
            }
        }
        return { params: params };
    });


    game = nga.entity('game').identifier(nga.field('_id')).label('Games');
    user = nga.entity('user').identifier(nga.field('_id')).label('Users');
}]);

// var u = prompt('User');
// var p = prompt('Password');

/* DEV ONLY */
var u = 'admin';
var p = 'pass';

myApp.config(function(RestangularProvider) {
    var login = u,
        password = p,
        token = window.btoa(login + ':' + password);
    RestangularProvider.setDefaultHeaders({'Authorization': 'Basic ' + token});
});