/* globals React:false, ReactDOM:false */


var React = require('react');
var ReactDOM = require('react-dom');

import { getReleaseChannels, matchChannelsToTerm, sortChannels, styles } from './utils.js'
import Autocomplete from 'react-autocomplete'


class App extends React.Component {
  constructor(props, container) {
    super();
    this._initialValue = props.recipeProp;
    this.render();
  }

  render () {
    return (
      <div>
        <Autocomplete
          initialValue={this._initialValue}
          items={getReleaseChannels()}
          getItemValue={(item) => item.name}
          shouldItemRender={matchChannelsToTerm}
          sortItems={sortChannels}
          renderItem={(item, isHighlighted) => (
            <div
              style={isHighlighted ? styles.highlightedItem : styles.item}
              key={item.abbr}
            >{item.name}</div>
          )}
        />
      </div>
    )
  }
}

ReactDOM.render(<App recipeProp="Release Channels" />, document.getElementById('pick-release-channel'));
ReactDOM.render(<App recipeProp="Locales" />, document.getElementById('pick-locale'));
ReactDOM.render(<App recipeProp="Countries" />, document.getElementById('pick-country'));
