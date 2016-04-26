/* globals React:false, ReactDOM:false */

import React from 'react'
import ReactDOM from 'react-dom'
import ControlActions from '../actions/ControlActions.js'
import ControlStore from '../stores/ControlStore.js'


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
  constructor(props) {
    super(props);
    this.state = {
        pageTitle: 'Recipes',
        subTitle: null,
        ctaButton: {text: 'Add New', icon: 'fa fa-plus', link: '#' },
    }

    this.router = props.routerContext;
  }

  componentDidMount() {
    this.router.listen((location) => {
      if (location.state) {
        this.state = location.state;
      }

      this.setState(this.state);
    });
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

export default class ControlApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getStateFromStores();
    this.onChange = this.onChange.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
  }

  componentDidMount() {
    ControlStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    ControlStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(this.getStateFromStores());
  }

  getStateFromStores() {
    return {
      'selectedRecipe': ControlStore.getSelectedRecipe(),
      'recipes': ControlStore.getRecipes(),
      'recipeAction': ControlStore.getCurrentAction()
    }
  }

  editRecipe(e, recipe) {
    ControlActions.editRecipe(recipe);
    this.context.router.push({
      pathname: 'recipe/' + recipe.id + '/',
      state: {
        'pageTitle': 'Recipes: ',
        'subTitle': recipe.name,
        'ctaButton': { 'text': 'History', 'link': '#', 'icon': 'fa fa-history pre' }
      },
    });
  }

  render() {
    return (
      <div>
        <Header routerContext={this.context.router} />
        {React.Children.map(this.props.children,
          (child) => React.cloneElement(child, { recipes: this.state.recipes, editRecipe: this.editRecipe }))}

      </div>
    )
  }
}

ControlApp.contextTypes = {
  router: React.PropTypes.object
}
