import React from 'react'
import { reduxForm } from 'redux-form'
import { _ } from 'underscore'

class ActionForm extends React.Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const currentProps = _.pick(this.props, 'initialValues', 'values', 'fields', 'selectedAction');
    const incomingProps = _.pick(nextProps, 'initialValues', 'values', 'fields', 'selectedAction');

    return (!_.isEqual(currentProps, incomingProps) || !_.isEqual(this.state, nextState));
  }

  render() {
    const { arguments_schema } = this.props;

    return (
      <div id="action-configuration">
        <i className="fa fa-caret-up fa-lg"></i>
        <div className="row">
          <p className="help fluid-4">{arguments_schema.description || arguments_schema.title }</p>
        </div>
      </div>
    )
  }
}

export default reduxForm({
    form: 'action',
  }, (state, props) => {
    let initialValues = {};
    if (props.recipe && props.recipe.action_name === props.name) {
      initialValues = props.recipe['arguments'];
    }

    return {
      initialValues
    }
})(ActionForm)