import React from 'react';
import { useGeoLocation } from 'useGeoLocation';
export var Demo = function (_a) {
    var _b = _a.watch, watch = _b === void 0 ? true : _b;
    var _c = useGeoLocation(), latitude = _c.latitude, longitude = _c.longitude, timestamp = _c.timestamp, loading = _c.loading, error = _c.error;
    var renderLoading = function () { return React.createElement("h1", { "data-testid": "loading" }, "Loading..."); };
    var renderGeoLocation = function () { return (React.createElement("ul", { "data-testid": "geo-location" },
        React.createElement("li", null,
            "Watching: ",
            watch ? 'Following user location' : 'Not following user location',
            " "),
        React.createElement("li", null,
            "Latitude: ",
            latitude),
        React.createElement("li", null,
            "Longitude: ",
            longitude),
        React.createElement("li", null,
            "Timestamp: ",
            timestamp))); };
    var renderError = function (_a) {
        var message = _a.message;
        return React.createElement("h1", { "data-testid": "error" }, message);
    };
    var renderContent = function () { return (loading ? renderLoading() : renderGeoLocation()); };
    return React.createElement("div", null, error ? renderError({ message: error.message }) : renderContent());
};
