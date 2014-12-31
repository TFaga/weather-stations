# Weather Stations

> View detailed information from weather stations located all around Slovenia.

## Building

This project is made with loopback.io:
http://loopback.io

First clone the repo:
```
git clone git@github.com:TFaga/weather-stations.git
```

Then install development dependencies:
```
npm install && bower install
```

Set up a database of your choice (PostgreSQL, MySQL, Oracle, MSSQL or MongoDb) and set up the apropriate connection parameters in the `server/datasources.json`. For instance to set up an in-memory db use the following:

```
"db": {
    "name": "db",
    "connector": "memory"
}
```
The required settings for a specific database can be found [here](http://docs.strongloop.com/display/LB/Database+connectors).

Run database migrations:
```
node server/scripts/migrate
```

Seed initial data to the database:
```
node server/scripts/seed
```

To start the application:
```
grunt serve
```

To run tests:
```
grunt test
```

To build the application:
```
grunt build
```

## Changelog

Recent changes can be viewed on Github on the [Releases Page](https://github.com/TFaga/weather-stations/releases)

## Contribute

See the [contributing docs](https://github.com/TFaga/weather-stations/blob/master/CONTRIBUTING.md)

When submitting an issue, please follow the [guidelines](https://github.com/TFaga/weather-stations/blob/master/CONTRIBUTING.md#bugs).

When submitting a bugfix, write a test that exposes the bug and fails before applying your fix. Submit the test alongside the fix.

When submitting a new feature, add tests that cover the feature.

## License

MIT