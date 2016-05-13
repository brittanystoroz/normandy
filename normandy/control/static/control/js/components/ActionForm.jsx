import React from 'react'
import { reduxForm } from 'redux-form'
import { _ } from 'underscore'

class ActionForm extends React.Component {
  constructor(props) {
    super(props)
    console.log('"redux-form/ ActionForm constructor')
  }

  componentWillMount() {
    console.log('"redux-form/ ActionForm componentWillMount: ', this);
    // this.props.initializeForm(this.props.recipe['arguments']);
  }

  componentDidMount() {
    console.log('"redux-form/ ActionForm componentDidMount');
  }

  componentWillUpdate() {
    console.log('"redux-form/ ActionForm componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('"redux-form/ ActionForm componentDidUpdate');
  }

  componentWillReceiveProps(nextProps) {

    // if the selectedAction has changed then the fields have changed
    // if the nextProps.selectedAction === the original recipe action, reset the form so initial values are present
    // otherwise, initializeForm with no data



    // if (!_.isEqual(this.props.selectedAction, nextProps.selectedAction) &&
    //     !_.isEqual(this.props.fields, nextProps.fields)) {


    //   // this.props.resetForm();
    //   if (this.props.recipe && this.props.recipe.action_name === nextProps.selectedAction.name) {
    //     this.props.resetForm();
    //     // this.props.initializeForm(this.props.recipe['arguments']);

    //     // this.props.initializeForm({ form: 'action', data: this.props.recipe['arguments'], fields: nextProps.fields });
    //   } else {
    //     // this.props.initializeForm({});
    //     // this.props.resetForm();

    //     // this.props.destroyForm();
    //     this.props.destroyForm();
    //     this.props.initializeForm({});
    //   }
    // }
    // console.log('"redux-form/ ActionForm componentWillReceiveProps');
    // console.log('"redux-form/ ActionForm willReceiveProps [previously selected action]: ', this.props.selectedAction.name)
    // console.log('"redux-form/ ActionForm willReceiveProps [next selected action]: ', nextProps.selectedAction.name)
    // console.log('"redux-form/ ActionForm willReceiveProps [previous fields]: ', this.props.fields)
    // console.log('"redux-form/ ActionForm willReceiveProps [next fields]: ', nextProps.fields)
    // if (this.props.selectedAction.name !== nextProps.selectedAction.name) {
    //   console.log("Selected action changed...");
    //   // this.props.resetForm();
    //   // this.props.destroyForm();
    //   // initializing with all argument values, what if two actions have a property with the same name?
    //   // need to initialize with data only if selectetedAction === recipe.action_name

    //   let initialData = null;
    //   if (this.props.recipe && this.props.recipe.action_name === nextProps.selectedAction.name)  {
    //     this.props.resetForm();
    //   } else {
    //     this.props.destroyForm();
    //   }

    //   if (this.props.fields !== nextProps.fields) {
    //     this.props.initializeForm(null);
    //   }
    // }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldActionFormUpdate [this.props]: ', this.props);
    const currentProps = _.pick(this.props, 'initialValues', 'values', 'fields', 'selectedAction');
    const incomingProps = _.pick(nextProps, 'initialValues', 'values', 'fields', 'selectedAction');

    // only update if the values property has changed or state has changed
    console.log('shouldActionFormUpdate [true/false]: ', (!_.isEqual(currentProps, incomingProps) || !_.isEqual(this.state, nextState)));
    return (!_.isEqual(currentProps, incomingProps) || !_.isEqual(this.state, nextState));
    // return true;
  }

  render() {
    console.log('"redux-form/ Rendering ActionForm [this.props]: ', this.props);

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
    // overwriteOnInitialValuesChange: false,
  }
)(ActionForm)
