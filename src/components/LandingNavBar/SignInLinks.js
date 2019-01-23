import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from "react-redux"
// import { signOut } from "../../store/actions/authActions"

const SignedInLinks = (props) => {
  const { signOut, initials } = props
  return (
    <div>
      <ul className="right">
        <li><NavLink to='/create'>New Project</NavLink></li>
        <li><a onClick={() => {}}>Log Out</a></li>
        <li><NavLink to='/' className="btn btn-floating pink lighten-1">{initials}</NavLink></li>
      </ul>
    </div>
  )
}

const mSTP = state => ({
  initials: state.firebase.profile.initials
})

const mDTP = dispatch => {
  return {
    //signOut: () => dispatch(signOut())
  }
}

export default connect(mSTP, mDTP)(SignedInLinks)
