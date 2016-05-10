import React from 'react'
import { reduxForm } from 'redux-form'

class ActionForm extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { selectedAction, fields } = this.props;
    const fieldNames = Object.keys(fields);
    return (
      <div id="action-configuration">
        <i className="fa fa-caret-up fa-lg">&nbsp;</i>
        <div className="row">
          <p className="help">{selectedAction.arguments_schema.description || selectedAction.arguments_schema.title }</p>
          <div className="fluid-3">
            {
              fieldNames.map(key => {
                let field = fields[key];
                if (selectedAction.arguments_schema.properties[key].type === "string") {
                  return (
                    <div key={fields[key].name} className="row">
                      <label>{field.name}</label>
                      <input type="text" field={fields[key]} defaultValue={fields[key].initialValue} />
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
    form: 'recipe',
  }, (state, props) => { // mapStateToProps
    return {
      initialValues: (props.recipe.arguments || null),
      fields: Object.keys(props.selectedAction.arguments_schema.properties)
    }
  }
)(ActionForm)
