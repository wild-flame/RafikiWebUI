// import SignedInLinks from './SignedInLinks'
// import SignedOutLinks from './SignedOutLinks'

/* For landing page, if signed in, display SignedInLink
 if not signed in, display SignedOutLinks
const Navbar = (props) => {
  const { auth } = props
  const links = auth.uid
    ? <SignedInLinks />
    : <SignedOutLinks /> 
  return (
    <nav>
      <div className="container">
        <Link to='/' className="brand-logo">Title or Logo</Link>
        {links}
      </div>
    </nav>
  )
}
