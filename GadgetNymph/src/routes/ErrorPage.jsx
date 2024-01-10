import { Link, useRouteError } from "react-router-dom"

const ErrorPage = () => {
  const error = useRouteError();
  return(
    <div id="error-page">
      <h1 style={{color: 'orangered'}}>Thi$ route does n0t exi$t!</h1>
      <i>{error.status} {error.statusText}</i>
      <i>{error.message}</i>
      <Link to='/' style={{color: 'aqua'}}>
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
};

export default ErrorPage;
