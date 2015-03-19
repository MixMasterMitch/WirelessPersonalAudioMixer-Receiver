app.factory('backendFactory', function() {
    var backendFactory = require('wireless-personal-audio-mixer-backend');

    backendFactory.initialize();

    return backendFactory;
});
