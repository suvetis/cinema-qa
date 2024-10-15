import React from 'react';

const Header = async () => {
  const response = await fetch('https://cinema.xdatagroup.dev/api/v1/cinema/halls');

  const halls = await response.json();

  // Render the hall names
  return (
    <div>
      <nav>
        <ul className="flex w-full justify-between border-2 border-orange-200">
          {halls.map((hall) => (
            <li key={hall.id}>{hall.name}</li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
