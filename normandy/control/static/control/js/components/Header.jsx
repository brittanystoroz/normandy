import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router';

class CtaBtn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link className="button" to={`/control/recipe/new/`}><i className={"pre fa fa-" + this.props.icon}></i> {this.props.buttonText}</Link>
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
        <h2><Link to={`/control/`}>{this.props.pageTitle}</Link> <span>{this.props.subTitle}</span></h2>
        {ctaBtn}
      </div>
    )
  }
}

let mapStateToProps = function(state, ownProps) {
  return {
    pageTitle: ownProps.pageType.pageTitle || 'Recipes',
    subTitle: (state.selectedRecipe.recipe) ? state.selectedRecipe.recipe.name : null,
    ctaButton: ownProps.pageType.ctaButton || null,
  };
}

export default connect(
  mapStateToProps
)(withRouter(Header))
