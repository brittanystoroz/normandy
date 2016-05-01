import React from 'react'
import history from '../routes.js'

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

export class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      pageTitle: 'Recipes',
      subTitle: null,
      ctaButton: {text: 'Add New', icon: 'fa fa-plus', link: '#' },
    }
  }

  componentDidMount() {
    history.listen(location => {
      console.log('location: ', location);
    })
  }

  render() {
    let ctaBtn;
    if (this.state.ctaButton) {
      ctaBtn = <CtaBtn buttonText={this.state.ctaButton.text} icon={this.state.ctaButton.icon} link={this.state.ctaButton.link} />
    }
    return (
      <div id="page-header">
        <h2><a href="#">{this.state.pageTitle}</a> <span>{this.state.subTitle}</span></h2>
        {ctaBtn}
      </div>
    )
  }
}
