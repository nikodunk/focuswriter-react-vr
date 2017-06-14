import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  VrButton,
  Sphere,
  AmbientLight
} from 'react-vr';


class Page extends React.Component {
  render() {
    return (
    <View >
        { !this.props.space ?
          <Text
                style={{
                  color: 'white',
                  paddingLeft: 0.2,
                  paddingRight: 0.2,
                  fontWeight: '400',
                }}>
            {this.props.content}
          </Text>
          :
          <Text
                style={{
                  color: 'black',
                  paddingLeft: 0.2,
                  paddingRight: 0.2,
                  fontWeight: '400',
                }}>
                {this.props.content}
          </Text>
        }
    </View>
  )}
}


export default class Main extends React.Component {
  constructor() {
    super();
    this.spaceSkymap = [
      './static_assets/space_right.png',
      './static_assets/space_left.png',
      './static_assets/space_up.png',
      './static_assets/space_down.png',
      './static_assets/space_back.png',
      './static_assets/space_front.png'
    ];
    this.saharaSkymap = [
      './static_assets/sahara_right.jpeg',
      './static_assets/sahara_left.jpeg',
      './static_assets/sahara_up.jpeg',
      './static_assets/sahara_down.jpeg',
      './static_assets/sahara_back.jpeg',
      './static_assets/sahara_front.jpeg'
    ];
    this.state = {
      spacedOut: true,
      newDoc: true,
      content: 'It is a period of civil wars in the galaxy.  A brave alliance of underground freedom fighters has challenged the tyranny and oppression of the awesome GALACTIC EMPIRE. Striking from a fortress hidden among the billion stars of the galaxy, rebel spaceships have won their first victory in a battle with the powerful Imperial Starfleet.  The EMPIRE fears that another defeat could bring a thousand more solar systems into the rebellion, and Imperial control over the galaxy would be lost forever. To crush the rebellion once and for all, the EMPIRE is constructing a sinister new battle station.  Powerful enough to destroy an entire planet, its completion spells certain doom for the champions of freedom. \r \r Welcome to Focuswriter! – The completely distraction-free writing app. \r Type to continue...\r \r\r'
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e){
    var event = e.nativeEvent.inputEvent
    if (this.state.newDoc && event.type === "KeyboardInputEvent") { this.setState({content: '', newDoc: false}) }
    if(event.type === "KeyboardInputEvent" && event.eventType === "keyup"){
      // console.log(e.nativeEvent)
      if( event.key === "Backspace"){
        this.setState({content: this.state.content.substring(0, this.state.content.length - 1)})
      }
      else if (event.key === "Enter"){
        this.setState({content: this.state.content.concat("\r")})
      }
      else if (event.key ==="Meta" || event.key ==="Control" || event.key ==="Alt" || event.key === "Shift"){
        return
      }
      else if (event.key ==="Tab"){
        this.setState({content: this.state.content.concat("\t")})
      }
      else if (event.shiftKey){
        this.setState({content: this.state.content.concat(event.key.toUpperCase())})
      }
      else{
        this.setState({content: this.state.content.concat(event.key)})
      }
    }
  }

  worldSet(){
    this.setState({spacedOut: !this.state.spacedOut})
  }

  render() {
    return (
      <View onInput={this.handleInput} >
         { this.state.spacedOut ? <Pano source={ {uri: this.saharaSkymap} } /> : <Pano source={ {uri: this.spaceSkymap} }/> }
        <View style={{transform: [{translate: [-1, .2, -2]}, {rotateY : 0}], flexDirection: 'row', width: 2, alignItems: 'stretch'}}>
            <Page space={this.state.spacedOut} content={this.state.content.substring(0, 512)}/>
        </View>
        <View style={{transform: [{translate: [1, 2, -1]}, {rotateY : -60}], flexDirection: 'row', width: 2, alignItems: 'stretch'}}>
          <Page space={this.state.spacedOut} content={this.state.content.substring(512, 1024)} />
        </View>
        <View style={{transform: [{translate: [1, 3.8, 1]}, {rotateY : -120}], flexDirection: 'row', width: 2, alignItems: 'stretch'}}>
          <Page space={this.state.spacedOut} content={this.state.content.substring(1024, 1536)} />
        </View>
        <View style={{transform: [{translate: [-1, 5.8, 1.5]}, {rotateY : -180}], flexDirection: 'row', width: 2, alignItems: 'stretch'}}>
          <Page space={this.state.spacedOut} content={this.state.content.substring(1526, 2048)} />
        </View>
        <AmbientLight intensity={.5} />
        <VrButton onClick={()=>this.worldSet()}>
          <Sphere lit={true} style={{transform: [{translate: [0, 10, -6]}]}} radius={0.5} widthSegments={20} heightSegments={12} />
        </VrButton>
      </View>
    );
  }
};

AppRegistry.registerComponent('Main', () => Main);
