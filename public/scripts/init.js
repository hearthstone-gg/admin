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
}]);