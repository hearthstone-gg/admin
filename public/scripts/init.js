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
}]);

// var user = prompt('User');
// var pass = prompt('Password');

/* DEV ONLY */
var user = 'admin';
var pass = 'pass';

myApp.config(function(RestangularProvider) {
    var login = user,
        password = pass,
        token = window.btoa(login + ':' + password);
    RestangularProvider.setDefaultHeaders({'Authorization': 'Basic ' + token});
});