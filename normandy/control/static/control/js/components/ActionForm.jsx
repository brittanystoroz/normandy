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
      // this.props.resetForm();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldActionFormUpdate [this.props]: ', this.props);
    const currentProps = _.pick(this.props, 'values', 'fields', 'selectedAction');
    const incomingProps = _.pick(nextProps, 'values', 'fields', 'selectedAction');

    // only update if the values property has changed or state has changed
    console.log('shouldActionFormUpdate [true/false]: ', (!_.isEqual(currentProps, incomingProps) || !_.isEqual(this.state, nextState)));
    // return (!_.isEqual(currentProps, incomingProps) || !_.isEqual(this.state, nextState));
    return true;
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
              Object.keys(fields).map(fieldName => {
                console.log("ActionForm Mapping Fields [fieldName]: ", fieldName);
                console.log("ActionForm Mapping Fields [fieldValue]: ", fields[fieldName]);
                if (actionFields[fieldName].type === "string") {
                  return (
                    <div key={fieldName} className="row">
                      <label>{fieldName}</label>
                       <input type="text" field={fields[fieldName]} {...fields[fieldName]} />
                    </div>
                  )
                }

                if (actionFields[fieldName].type === "array") {
                  return (
                    <div key={fieldName} className="row">
                    <button type="button" onClick={() => {
                      fields[fieldName].addField()    // pushes empty child field onto the end of the array
                    }}><i/> Add {fieldName}</button>

                    {!fields[fieldName].length && <div>No {fieldName}</div>}
                    {fields[fieldName].length ?
                    fields[fieldName].map((childField, index) => {
                      console.log("Child Field: ", childField);
                      return (<div key={index}>
                      <p>#{index + 1}</p>
                      <label>Title</label>
                        <input type="text" field={childField.title} {...childField.title} />
                      </div>
                      )
                    }) : '' }

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
      initialValues: (props.recipe ? props.recipe['arguments'] : null)
    }
  }
)(ActionForm)
