import React from 'react'
import { connect } from 'react-redux'
import ControlActions from '../actions/ControlActions.js'
import { syncHistoryWithStore } from 'react-router-redux'
import controlStore from '../stores/ControlStore.js'
import { browserHistory } from 'react-router';

function mapStateToProps(state, ownProps) {
  console.log('HEADERstate: ', state);
  console.log("OWN PROPS: ", ownProps);
  return {
    pageTitle: 'Recipes',
    subTitle: (state.selectedRecipe) ? state.selectedRecipe.name : null,
    ctaButton: null,
    urlPath: state.routing.locationBeforeTransitions.pathname
  };
}


class CtaBtn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="button"><i className={this.props.icon}></i> {this.props.buttonText}</div>
    )
  }
}

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      pageTitle: 'Recipes',
      subTitle: null,
      ctaButton: {text: 'Add New', icon: 'fa fa-plus', link: '#' },
      urlPath: null,
    }
  }

  componentDidMount() {
    console.log("HEADER MOUNTED: ", this.props);
    // console.log("WHAT: ", controlStore.getState());
    // console.log("HEY: ", controlStore);

    // controlStore.subscribe(LOCATION_CHANGE)
    // history.listen(location => {
    //   console.log('location: ', location);
    // })
  }

  willReceiveProps() {
    console.log("HEADERS GOTTA RECEIVE SOME PROPS...");
  }

  render() {
    console.log('rendering...');
    let ctaBtn;
    if (this.props.ctaButton) {
      ctaBtn = <CtaBtn buttonText={this.props.ctaButton.text} icon={this.props.ctaButton.icon} link={this.props.ctaButton.link} />
    }
    return (
      <div id="page-header">
        <h2><a href="#">{this.props.urlPath}</a> <span>{this.props.subTitle}</span></h2>
        {ctaBtn}
      </div>
    )
  }
}

export default connect(
  mapStateToProps
)(Header)
