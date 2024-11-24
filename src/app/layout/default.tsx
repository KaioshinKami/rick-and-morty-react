import React, {ReactNode} from 'react';
import {Link} from "react-router-dom";


interface LayoutProps {
    children: ReactNode
}

const DefaultLayout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div>
            <div className={'flex gap-[20px] text-2xl text-center justify-center items-center'}>
                <Link to={'/'}>Episodes</Link>
                <Link to={'/characters'}>Characters</Link>
                <Link to={'/locations'}>Locations</Link>
            </div>
            {children}
        </div>
    );
};

export default DefaultLayout;