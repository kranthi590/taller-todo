'use client';
import RemoteA from 'remoteA/App';

import { ErrorBoundary } from 'react-error-boundary';

function fallbackRender({ error }) {
  return (<div role="alert">
    <p>Something went wrong:</p>
    <pre style={{ color: 'red' }}>{error.message}</pre>
  </div>);
}

const TodoRemoteApp = () => (<ErrorBoundary
  fallbackRender={fallbackRender}
>
  <RemoteA />
</ErrorBoundary>);

export default TodoRemoteApp;