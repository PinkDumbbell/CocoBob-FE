import useRedirect from './hooks/useRedirect';

export default function GoogleRedirectHandler() {
  return useRedirect(null, 'google');
}
