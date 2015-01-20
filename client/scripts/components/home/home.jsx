import React from 'react'

export default React.createClass({

  componentDidMount() {
    // Create the map
    let map = new google.maps.Map(this.getDOMNode(), {
      zoom: 9,
      center: new google.maps.LatLng(46.119944, 14.815333),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    this.setState({ map: map });

    this.renderMarkers([{}]);
  },

  renderMarkers(stations) {
    stations.forEach(station => {
      let marker1 = new MarkerWithLabel({
        position: new google.maps.LatLng(46.119944, 14.815333),
        map: this.state.map,
        labelContent: "$425K",
        labelAnchor: new google.maps.Point(22, 0),
        labelClass: "labels",
        labelStyle: {opacity: 0.75}
      });
    });
  },

  render() {

    return (
      <div className="home-map"></div>
    )
  }
})
