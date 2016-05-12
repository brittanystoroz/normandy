import React from 'react'
import { reduxForm } from 'redux-form'

class ActionForm extends React.Component {
  constructor(props) {
    super(props)
    this.createActionFieldName = this.createActionFieldName.bind(this)
  }

  createActionFieldName(fieldName) {
    return `arguments-${fieldName}`
  }

  render() {
    const { selectedAction, initialValues, recipe } = this.props;
    const actionFields = selectedAction.arguments_schema.properties;
    const fieldNames = Object.keys(actionFields);

    console.log('recipe: ', recipe);
    console.log('initialValues: ', initialValues);
    console.log('fieldNames: ', fieldNames);
    return (
      <div id="action-configuration">
        <i className="fa fa-caret-up fa-lg">&nbsp;</i>
        <div className="row">
          <p className="help">{selectedAction.arguments_schema.description || selectedAction.arguments_schema.title }</p>
          <div className="fluid-3">
            {
              Object.keys(actionFields).map(fieldName => {
                console.log('fieldName: ', fieldName);
                if (actionFields[fieldName].type === "string") {
                  return (
                    <div key={fieldName} className="row">
                      <label>{fieldName}</label>
                      <input type="text" data-model="action" name={this.createActionFieldName(fieldName)} onChange={this.props.handleInputChange} defaultValue={initialValues[fieldName]} />
                    </div>
                  )
                }

                if (actionFields[fieldName].type === "array") {
                  return (
                    <div key={fieldName}>
                    <h4>{fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}</h4>
                    <ul>
                      {initialValues[fieldName].map(field => {
                        console.log('initialValues array: ', initialValues[fieldName]);
                        return (<li key={field.title}>{field.title}</li>)
                      })}
                    </ul>
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

export default ActionForm
