import React from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
import './address-form-autocomplete.styles.scss';
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyDWZb5SC-zI5szeLF9Y3S5734qjLHqbutQ");
Geocode.enableDebug();
class AddressFormAutocomplete extends React.Component{
constructor( props ){
  super( props );
  this.state = {
   address: '',
   city: '',
   area: '',
   state: '',
   zipcode:'',
   streetAddress:'',
   mapPosition: {
    lat: this.props.center.lat,
    lng: this.props.center.lng
   },
//    markerPosition: {
//     lat: this.props.center.lat,
//     lng: this.props.center.lng
// }
  }
 }
 
/**
  * Get the current address from the default map position and set those values in the state
  */
 componentDidMount() {
  Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
   response => {
    const address = response.results[0].formatted_address,
     addressArray =  response.results[0].address_components,
     city = this.getCity( addressArray ),
     area = this.getArea( addressArray ),
     state = this.getState( addressArray ),
     zipcode = this.getZipcode( addressArray );

    console.log( 'city', city, area, state , zipcode );
  
    this.setState( {
     address: ( address ) ? address : '',
     area: ( area ) ? area : '',
     city: ( city ) ? city : '',
     zipcode: ( zipcode) ? zipcode : '',
     state: ( state ) ? state : '',
     streetAddress: address ,
    } )
   },
   error => {
    console.error(error);
   }
  );
 };
/**
  * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
  *
  * @param nextProps
  * @param nextState
  * @return {boolean}
  */
 shouldComponentUpdate( nextProps, nextState ){
  if (
  //  this.state.markerPosition.lat !== this.props.center.lat ||
   this.state.address !== nextState.address ||
   this.state.city !== nextState.city ||
   this.state.area !== nextState.area ||
   this.state.zipcode !== nextState.zipcode ||
   this.state.streetAddress !== nextState.streetAddress ||
   this.state.state !== nextState.state
  ) {
   return true
  } else if ( this.props.center.lat === nextProps.center.lat ){
   return false
  }
 }
 /**
  * Get the zipcode and set the zipcode input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
 getZipcode = ( addressArray ) => {
  let zipcode = '';
  for( let i = 0; i < addressArray.length; i++ ) {
   if ( addressArray[ i ].types[0] && 'postal_code' === addressArray[ i ].types[0] ) {
    zipcode = addressArray[ i ].long_name;
    return zipcode;
   }
  }
 };
/**
  * Get the city and set the city input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
 getArea = ( addressArray ) => {
  let city = '';
  for( let i = 0; i < addressArray.length; i++ ) {
   if ( addressArray[ i ].types[0] && 'administrative_area_level_2' === addressArray[ i ].types[0] ) {
    city = addressArray[ i ].long_name;
    return city;
   }
  }
 };
/**
  * Get the area and set the area input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
 getCity = ( addressArray ) => {
  let area = '';
  for( let i = 0; i < addressArray.length; i++ ) {
   if ( addressArray[ i ].types[0]  ) {
    for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
     if ( 'sublocality_level_1' === addressArray[ i ].types[j] || 'locality' === addressArray[ i ].types[j] ) {
      area = addressArray[ i ].long_name;
      return area;
     }
    }
   }
  }
 };
/**
  * Get the address and set the address input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
 getState = ( addressArray ) => {
  let state = '';
  for( let i = 0; i < addressArray.length; i++ ) {
   for( let i = 0; i < addressArray.length; i++ ) {
    if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
     state = addressArray[ i ].long_name;
     return state;
    }
   }
  }
 };
/**
  * And function for city,state and address input
  * @param event
  */
 onChange = ( event ) => {
  this.setState({ 
    [event.target.name]: event.target.value
   });

  this.props.onSelectAddress(this.state);
 };
/**
  * This Event triggers when the marker window is closed
  *
  * @param event
  */
 onInfoWindowClose = ( event ) => {
};
/**
  * When the user types an address in the search box
  * @param place
  */
 onPlaceSelected = ( place ) => {
  const address = place.formatted_address,
   addressArray =  place.address_components,
   city = this.getCity( addressArray ),
   area = this.getArea( addressArray ),
   state = this.getState( addressArray ),
   zipcode = this.getZipcode ( addressArray ),
   latValue = place.geometry.location.lat(),
   lngValue = place.geometry.location.lng();
// Set these values in the state.
  this.setState({
   address:  address ,
   area:  area ,
   city:  city ,
   state:  state ,
   zipcode:  zipcode ,
  //  markerPosition: {
  //   lat: latValue,
  //   lng: lngValue
  //  },
   mapPosition: {
    lat: latValue,
    lng: lngValue
   },
  })
  this.props.onSelectAddress(this.state);
 };
/**
  * When the marker is dragged you get the lat and long using the functions available from event object.
  * Use geocode to get the address, city, area and state from the lat and lng positions.
  * And then set those values in the state.
  *
  * @param event
  */
//  onMarkerDragEnd = ( event ) => {
//   console.log( 'event', event );
//   let newLat = event.latLng.lat(),
//    newLng = event.latLng.lng(),
//    addressArray = [];
// Geocode.fromLatLng( newLat , newLng ).then(
//    response => {
//     const address = response.results[0].formatted_address,
//      addressArray =  response.results[0].address_components,
//      city = this.getCity( addressArray ),
//      area = this.getArea( addressArray ),
//      state = this.getState( addressArray );
// this.setState( {
//      address: ( address ) ? address : '',
//      area: ( area ) ? area : '',
//      city: ( city ) ? city : '',
//      state: ( state ) ? state : ''
//     } )
//    },
//    error => {
//     console.error(error);
//    }
//   );
//  };

render(){
const AsyncMap = withScriptjs(
   withGoogleMap(
    props => (
      <div className='group'>
      <Autocomplete
      className="form-input"

       onPlaceSelected={ this.onPlaceSelected }
       types={['(regions)']}
      />
      </div>
)
   )
  );
let map;
  if( this.props.center.lat !== undefined ) {
   map = <div>
     <div>
     <AsyncMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDWZb5SC-zI5szeLF9Y3S5734qjLHqbutQ&libraries=places"
      loadingElement={
       <div style={{ height: `0%` }} />
      }
      containerElement={
       <div style={{ height: this.props.height }} />
      }
      mapElement={
       <div style={{ height: `0%` }} />
      }
     />
      <div className="group">
       <label htmlFor="">Street Address</label>
       <input type="text" name="streetAddress" className="form-input" onChange={ this.onChange } onBlur={ this.onChange } value={ this.state.streetAddress }/>
      </div>
      <div className="group">
       <label htmlFor="">Zip Code</label>
       <input type="text" name="zipcode" className="form-input" onChange={ this.onChange } onBlur={ this.onChange } value={ this.state.zipcode }/>
      </div>
      <div className="group">
       <label htmlFor="">City</label>
       <input type="text" name="city" className="form-input" onChange={ this.onChange } onBlur={ this.onChange } value={ this.state.city }/>
      </div>
      <div className="group">
       <label htmlFor="">Area</label>
       <input type="text" name="area" className="form-input" onChange={ this.onChange } onBlur={ this.onChange } value={ this.state.area }/>
      </div>
      <div className="group">
       <label htmlFor="">State</label>
       <input type="text" name="state" className="form-input" onChange={ this.onChange } onBlur={ this.onChange } value={ this.state.state }/>
      </div>
     </div>

    </div>
} else {
   map = <div style={{height: this.props.height}} />
  }
  return( map )
 }
}
export default AddressFormAutocomplete
