import React from 'react';

const education = ({ degree, institution, year }) => (
    <div>
        <h2>{degree}</h2>
        <p>{institution}, {year}</p>
    </div>
);

export default education;
