import React from 'react';

export type IconProps = {
    name: string;
    className?: string;
};

const Icon: React.FC<IconProps> = ({ name, className = '' }) => {
    return <i className={`lnr ${name} ${className}`} />;
};

export default Icon;
