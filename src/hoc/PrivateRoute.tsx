import { ROLE } from '../constants/roles';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PrivateRoute = ({
  WrappedComponent,
  roles,
  navigateToRouteIfNotAuthenticated
}: {
  WrappedComponent: JSX.Element;
  roles: Array<ROLE>;
  navigateToRouteIfNotAuthenticated: string;
}) => {
  const HOCComponent = (): JSX.Element => {
    const getUser = (): any => {
      let decodedToken = null;
      // token = localstorage.getitem --> then pass that token in jwt decode
      try {
        decodedToken = jwtDecode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsImlhdCI6MTY4MTAyMjYwNn0.UIva61Il9WWU4wB7csF7g8-LAt-3p6rc91maO5Aqs3o")
        // decodedToken = "rahul"
      } catch { }
      const currentUser = decodedToken as any;
      return currentUser;
    }

    const router = useRouter();
    const user = getUser();

    const isAuthenticated: boolean = (user && roles.includes(user?.role)) ? true : false;
    console.log('isAuthenticated::: ', isAuthenticated);
    useEffect(() => {
      if (!isAuthenticated) {
        router.push(navigateToRouteIfNotAuthenticated);
      }
    }, []);

    return isAuthenticated ? WrappedComponent : <></>;
  };

  return <HOCComponent />;
};

export default PrivateRoute;
