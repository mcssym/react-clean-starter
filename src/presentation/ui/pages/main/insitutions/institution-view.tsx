
import { Typography } from '@material-tailwind/react';
import React from 'react';

export const InstitutionView: React.FC = (): JSX.Element => {
    return (
        <div className='flex flex-row items-center justify-center mx-6 my-6 bg-white min-h-[50%]' >
            <Typography variant="h1" >Institutions</Typography>
        </div>
    );
}
