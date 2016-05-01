import React from 'react'
import { connect } from 'react-redux'
import ControlActions from '../actions/ControlActions.js'
import { syncHistoryWithStore } from 'react-router-redux'
import controlStore from '../stores/ControlStore.js'
import { browserHistory, withRouter, Link } from 'react-router';

function mapStateToProps(state, ownProps) {
  return {
    pageTitle: ownProps.pageType.pageTitle || 'Recipes',
    subTitle: (state.selectedRecipe) ? state.selectedRecipe.name : null,
    ctaButton: ownProps.pageType.ctaButton || null,
  };
}


class CtaBtn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link className="button" to={`/control/recipe/new`}><i className={"pre fa fa-" + this.props.icon}></i> {this.props.buttonText}</Link>
    )
  }
}

class Header extends React.Component {
  constructor() {
    super();
  }

  render() {
    let ctaBtn;
    if (this.props.ctaButton) {
      ctaBtn = <CtaBtn buttonText={this.props.ctaButton.text} icon={this.props.ctaButton.icon} link={this.props.ctaButton.link} />
    }
    return (
      <div id="page-header">
        <h2><a href="#">{this.props.pageTitle}</a> <span>{this.props.subTitle}</span></h2>
        {ctaBtn}
      </div>
    )
  }
}

export default connect(
  mapStateToProps
)(withRouter(Header))
