import React from 'react'
import { reduxForm } from 'redux-form'
import { _ } from 'underscore'

class ActionForm extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    console.log('ActionForm willReceiveProps [previously selected action]: ', this.props.selectedAction)
    console.log('ActionForm willReceiveProps [next selected action]: ', nextProps.selectedAction)
    if (this.props.selectedAction.name !== nextProps.selectedAction.name) {
      console.log("Selected action changed...");
      this.props.resetForm();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldActionFormUpdate [this.props]: ', this.props);
    const currentProps = _.pick(this.props, 'values');
    const incomingProps = _.pick(nextProps, 'values');

    // only update if the values property has changed or state has changed
    return (!_.isEqual(currentProps, incomingProps) || !_.isEqual(this.state, nextState));
  }

  render() {
    console.log('Rendering ActionForm [this.props]: ', this.props);

    const { fields, selectedAction, recipe } = this.props;
    const  actionFields = selectedAction.arguments_schema.properties;

    console.log('ActionForm Arguments Schema: ', selectedAction.arguments_schema);
    console.log('ActionForm Fields: ', fields);
    console.log('ActionForm ActionFields: ', actionFields);

    return (
      <div id="action-configuration">
        <i className="fa fa-caret-up fa-lg">&nbsp;</i>
        <div className="row">
          <p className="help">{selectedAction.arguments_schema.description || selectedAction.arguments_schema.title }</p>
          <div className="fluid-3">
            {
              Object.keys(fields['arguments']).map(fieldName => {
                console.log("ActionForm Mapping Fields [fieldName]: ", fieldName);
                console.log("ActionForm Mapping Fields [fieldValue]: ", fields['arguments'][fieldName]);
                if (actionFields[fieldName].type === "string") {
                  return (
                    <div key={fieldName} className="row">
                      <label>{fieldName}</label>
                       <input type="text" field={fields['arguments'][fieldName]} {...fields['arguments'][fieldName]} />
                    </div>
                  )
                }
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default reduxForm({
    form: 'action',
  }, (state, props) => {
    console.log("Composing ActionForm [props]: ", props);
    console.log("Composing ActionForm [initialValues]: ", (props.recipe ? props.recipe['arguments'] : null));

    return {
      initialValues: (props.recipe ? { arguments: props.recipe['arguments'] } : null),
      fields: props.fields
    }
  }
)(ActionForm)
