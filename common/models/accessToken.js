module.exports = function(AccessToken) {

  AccessToken.validatesLengthOf('ttl', {max: 2419200, message: {max: 'is too big'}});
  AccessToken.validatesNumericalityOf('ttl', {int: true});

  AccessToken.findForRequest = function(req, options, cb) {
    if (cb === undefined && typeof options === 'function') {
      cb = options;
      options = {};
    }

    var id = tokenIdForRequest(req, options);

    if (id) {
      this.findOne(
        { where: { id: id } }, function(err, token) {

          if (err) {
            cb(err);
          } else if (token) {
            token.validate(function(err, isValid) {
              if (err) {
                cb(err);
              } else if (isValid) {
                cb(null, token);
              } else {
                var e = new Error('Invalid Access Token');
                e.status = e.statusCode = 401;
                cb(e);
              }
            });
          } else {
            cb();
          }
      });
    } else {
      process.nextTick(function() {
        cb();
      });
    }
  };

  function tokenIdForRequest(req, options) {
    var params = options.params || [];
    var headers = options.headers || [];
    var cookies = options.cookies || [];
    var i = 0;
    var length;
    var id;

    params = params.concat(['access_token']);
    headers = headers.concat(['X-Access-Token', 'authorization']);
    cookies = cookies.concat(['access_token', 'authorization']);

    for (length = params.length; i < length; i++) {
      id = req.param(params[i]);

      if (typeof id === 'string') {
        return id;
      }
    }

    for (i = 0, length = headers.length; i < length; i++) {
      id = req.header(headers[i]);

      if (typeof id === 'string') {
        // Add support for oAuth 2.0 bearer token
        // http://tools.ietf.org/html/rfc6750
        if (id.indexOf('Bearer ') === 0) {
          id = id.substring(7);
          // Decode from base64
          var buf = new Buffer(id, 'base64');
          id = buf.toString('utf8');
        }
        return id;
      }
    }

    if (req.signedCookies) {
      for (i = 0, length = cookies.length; i < length; i++) {
        id = req.signedCookies[cookies[i]];

        if (typeof id === 'string') {
          return id;
        }
      }
    }
    return null;
  };
};
