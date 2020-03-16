import React, { useEffect } from 'react';
import TokenContext from '../contexts/TokenContext';

function withLoginPageHOCF(Component) {
  return function({token, setToken, unsetToken, history, ...props}) {
    useEffect(() => {
      if (token !== null) {
        history.push('/');
      }
    }, [token, history]);

    if (token !== null) {
      return null;
    }

    return (
      <Component history={ history } setToken={ setToken } {...props} />
    );
  };
}

function withAuthorisedPageHOCF(Component) {
  return function({token, setToken, unsetToken, history, ...props}) {
    useEffect(() => {
      if (token === null) {
        history.push('/login');
      }
    }, [token, history]);

    if (token === null) {
      return null;
    }

    return (
      <Component history={ history } {...props} token={ token } unsetToken={unsetToken} />
    );
  };
}

function withTokenHOC(Wrapper) {
  return function(Component) {
    const NestedComponent = Wrapper(Component);
    return function(props) {
      return (
        <TokenContext.Consumer>
          {({token, setToken, unsetToken}) => {
            return (
              <NestedComponent {...props} token={token} setToken={setToken} unsetToken={unsetToken}/>
            );
          }}
        </TokenContext.Consumer>
      );
    }
  };
}

export const withLoginPageHOC = withTokenHOC(withLoginPageHOCF);
export const withAuthorisedPageHOC = withTokenHOC(withAuthorisedPageHOCF);


