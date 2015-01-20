import React from 'react'

export default React.createClass({

  componentDidMount() {
    var mapOptions = {
      zoom: 9,
      center: new google.maps.LatLng(46.119944, 14.815333),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(this.getDOMNode(), mapOptions);

    this.setState( { map : map } );
  },

  render() {

    return (
      <div className="home-map"></div>
    )
  }
})
