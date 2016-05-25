import React from 'react'
import { Link } from 'react-router';
import { push } from 'react-router-redux'
import moment from 'moment'
import composeRecipeContainer from './RecipeContainer.jsx'
import apiFetch from '../utils/apiFetch.js';

class RecipeHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      revisionLog: []
    }
    this.getHistory = this.getHistory.bind(this);
  }

  getHistory(recipeId) {
    apiFetch(`/api/v1/recipe/${recipeId}/history/`)
      .then(response => {
        this.setState({
          revisionLog: response.reverse()
        })
      });
  }

  componentDidMount() {
    const { recipeId } = this.props;
    this.getHistory(recipeId);
  }

  render() {
    const { revisionLog } = this.state;
    const { recipeId, recipe, dispatch } = this.props;
    return (
      <div className="fluid-8">
        <h3>Viewing revision log for: <b>{recipe ? recipe.name : ''}</b></h3>
        <ul>
            {
              this.state.revisionLog.map((revision, index) => {
                return (
                  <li key={revision.date_created} onClick={(e) => {
                    dispatch(push({
                      pathname: `/control/recipe/${recipeId}/`,
                      query: {
                        revisionId: `${revision.id}`
                      },
                      state: {
                        selectedRevision: revision.recipe
                      }
                    }))
                  }}><p className="revision-number">#{revision.recipe.revision_id} </p>
                    <p><span className="label">Created On:</span>{ moment(revision.date_created).format('MMM Do, YYYY - h:mmA') }</p>

                    { index === 0 &&
                      <div className="approval-status">
                        <div className="status pending">Pending Approval</div>
                      </div>
                    }
                    { index === 0 &&
                      <div className="approval-request-conversation">
                        <i className="fa fa-caret-up fa-lg"></i>
                        <div className="row">
                          <div className="fluid-6">
                            <ul className="comment-thread">
                              <li>
                                <p className="comment-meta label"><b>Bob Loblaw</b> commented { moment().startOf('day').fromNow() }</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel lectus metus. Fusce sit amet laoreet sapien, quis commodo massa. Integer ut mauris iaculis, vestibulum nunc eget, interdum mi. Suspendisse elit lorem, sodales in ante id, rutrum semper justo. Cras ut elit at lacus varius porttitor.</p>
                              </li>
                              <li>
                                <p className="comment-meta label"><b>Bob Loblaw</b> commented { moment().startOf('day').fromNow() }</p>
                                <p>Pellentesque condimentum nisi ac tortor egestas condimentum. Donec facilisis ornare vestibulum. Nam sed suscipit lectus. Suspendisse mollis quis sem nec bibendum. Aenean fermentum tellus vel justo mattis facilisis. Pellentesque non arcu sapien. Nulla egestas mi quis orci gravida consequat. Proin bibendum cursus sem, ac porta neque lacinia id. Pellentesque laoreet, justo in accumsan lobortis, mi mauris condimentum massa</p>
                              </li>
                            </ul>

                            <div className="comment-buttons">
                              <textarea>Add Comment...</textarea>
                              <button type="submit" className="button green">Comment & Approve Recipe</button>
                              <button type="submit" className="button">Comment</button>
                            </div>
                          </div>

                          <div className="approval-meta fluid-2 float-right">
                            <p><span className="label">Request Opened:</span> { moment(revision.date_created).format('MMM Do, YYYY') } by <b>Bob Loblaw</b></p>
                            <p><span className="label">Approval Status:</span> Approved by <b>Bob Loblaw</b></p>
                            <Link className="button" to={`/control/recipe/${recipeId}/preview/`}>Preview Changes</Link>
                            <button type="submit" className="button" disabled="disabled">Enable Recipe</button>
                          </div>
                        </div>
                      </div>
                    }
                  </li>)
              })
            }
        </ul>
      </div>
    )
  }
}

export default composeRecipeContainer(RecipeHistory);
