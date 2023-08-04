import {useLocation, Link} from "react-router-dom";

export const Breadcrumbs = () => {
    const location = useLocation();
    const currentLocation = (location.pathname.split('/').slice(2))
    console.log(currentLocation)
    return (
        <div>
            {

                currentLocation.map((locat, index) => <Link key={index} to={`/syncpro/${locat}`}>{locat}</Link>)
            }

        </div>
    )
}


//export const Breadcrumbs = () => {
//  const location = useLocation()
//  const [currentPath, setCurrentPath] = useState('');
//
//  useEffect(() => {
//    setCurrentPath(location.pathname.toUpperCase().split('/').slice(2));
//  }, [location.pathname, setCurrentPath])
//
//  return (
//    <p className="text-start mx-5 sm:mx-0 sm:mt-0 font-medium"><span className="text-gray-400">SYNCPRO</span> / {currentPath}</p>
//  );
//}