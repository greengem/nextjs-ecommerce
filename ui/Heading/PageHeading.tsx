import React from 'react';

interface PageHeadingProps {
    title: string;
    classes?: string;
}

const PageHeading: React.FC<PageHeadingProps> = ({ title, classes = '' }) => {
    return (
        <h1 className={`text-6xl tracking-tight pb-3 mb-5 ${classes}`}>{title}</h1>
    );
}

export default PageHeading;
