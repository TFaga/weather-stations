import React from 'react'

export default React.createClass({

  componentDidMount() {
    let map = new google.maps.Map(this.getDOMNode(), {
      zoom: 9,
      center: new google.maps.LatLng(46.119944, 14.815333),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // this.setState({ map: map });

    // // Load and render stations
    // this.renderMarkers([{}]);
  },

  renderMarkers(stations) {
    // stations.forEach(station => {
    //   let marker = new MarkerWithLabel({
    //     position: new google.maps.LatLng(46.119944, 14.815333),
    //     map: this.state.map,
    //     labelContent: "$425K",
    //     labelAnchor: new google.maps.Point(22, 0),
    //     labelClass: "labels",
    //     labelStyle: {opacity: 0.75}
    //   });
    // });
  },

  render() {

    return (
      <div className="home-map"></div>
    )
  }
})
