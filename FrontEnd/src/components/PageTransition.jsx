import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * PageTransition — wraps page content and plays a fade+slide-up
 * animation every time the route changes.
 */
const PageTransition = ({ children }) => {
    const location = useLocation();
    const [displayChildren, setDisplayChildren] = useState(children);
    const [transitionStage, setTransitionStage] = useState('page-enter');

    useEffect(() => {
        // 1. Fade out current page
        setTransitionStage('page-exit');

        const timeout = setTimeout(() => {
            // 2. Swap content and fade back in
            setDisplayChildren(children);
            setTransitionStage('page-enter');
        }, 220); // must match CSS transition duration

        return () => clearTimeout(timeout);
    }, [location.pathname]);

    // Keep content in sync when children update without route change
    useEffect(() => {
        if (transitionStage === 'page-enter') {
            setDisplayChildren(children);
        }
    }, [children]);

    return (
        <div className={`page-transition ${transitionStage}`}>
            {displayChildren}
        </div>
    );
};

export default PageTransition;
