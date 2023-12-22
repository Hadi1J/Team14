import React from 'react';

const MainContent = ({ children }) => {
    return (
        <div style={{ backgroundColor: '#eff2f7', minHeight: '100vh' }}>
            {children}
        </div>
    );
};

export default MainContent;
