//this is to import required dependencies
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Subcomponent: BouncingBall
const BouncingBall = ({ radius, colors, positions }) => {
  const ballRef = useRef(null);

  useEffect(() => {
    const ball = ballRef.current;
    const animation = gsap.timeline({ repeat: -1, yoyo: true });

    animation.to(ball, {
      x: positions[1].x,
      y: positions[1].y,
      duration: 2, // Adjust the duration as needed
    });

    animation.to(ball, {
      x: positions[0].x,
      y: positions[0].y,
      duration: 2, // Adjust the duration as needed
    });

    animation.to(ball, {
      x: positions[3].x,
      y: positions[3].y,
      duration: 2, // Adjust the duration as needed
    });

    animation.to(ball, {
      x: positions[2].x,
      y: positions[2].y,
      duration: 2, // Adjust the duration as needed
    });

    return () => {
      animation.kill(); // Clean up the animation on unmount
    };
  }, [positions]);

  return (
    <g transform={`translate(${positions[0].x}, ${positions[0].y})`}>
      <circle
        ref={ballRef}
        cx={0}
        cy={0}
        r={radius}
        fill={`url(#ballGradient)`}
      />
    </g>
  );
};

// This is the main component
const BouncingAndRotatingPuzzlePiece = ({
  width,
  height,
  borderColors,
  strokeWidth,
}) => {
  const radius = Math.min(width, height) / 2;
  
  const positions = [
    { x: 0, y: -radius / 4 }, // Position for the first coiled area
    { x: 0, y: radius / 4 }, // Position for the second coiled area
    { x: -radius / 4, y: 0 }, // Position for the third coiled area
    { x: radius / 4, y: 0 }, // Position for the fourth coiled area
  ];

  useEffect(() => {
    const animation = gsap.timeline({ repeat: -1 });

    const moveTopLeft = (element) => {
      return gsap.to(element, {
        duration: 2,
        x: -radius / 2,
        y: -radius / 2,
        ease: 'power1.inOut',
      });
    };

    const moveBottomRight = (element) => {
      return gsap.to(element, {
        duration: 2,
        x: radius / 2,
        y: radius / 2,
        ease: 'power1.inOut',
      });
    };

    const moveBack = (element) => {
      return gsap.to(element, {
        duration: 2,
        x: 0,
        y: 0,
        ease: 'power1.inOut',
      });
    };

    const sequence = gsap.timeline();
    sequence.add(moveTopLeft('.topLeftPiece'));
    sequence.add(moveBack('.topLeftPiece'));
    sequence.add(moveBottomRight('.bottomRightPiece'), '-=2');
    sequence.add(moveBack('.bottomRightPiece'));

    animation.add(sequence);

    return () => {
      animation.kill(); // Clean up the animation on unmount
    };
  }, [radius]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}
      className='container'
    >
      <defs>
        <linearGradient id="puzzleStrokeGradient" x1="0%" y1="0%">
          {borderColors.map((color, index) => (
            <stop
              key={index}
              offset={`${(index / borderColors.length) * 100}%`}
              style={{ stopColor: color, stopOpacity: 1 }}
            />
          ))}
        </linearGradient>
        <linearGradient id="ballGradient" x1="0%" y1="0%">
  {/* Define your gradient stops for the ball here using degrees */}
  <stop offset="25%" style={{ stopColor: 'rgb(223, 222, 222)'}} />
  <stop offset="50%" style={{ stopColor: 'rgb(223, 222, 222)'}} />
  <stop offset="75%" style={{ stopColor: 'rgb(223, 222, 222)'}} />
  <stop offset="100%" style={{ stopColor: 'rgb(223, 222, 222)' }} />
</linearGradient>

      </defs>

      {/* Circular Puzzle Piece Made of Four Circular Pieces */}
      <g className="topLeftPiece">
        
        {/* Add the top-left piece SVG path here */}
        <path
          d={`
          M 0 -${radius} A ${radius} ${radius} 0 0 0 -${radius} 0 L 0 0 Z
          `}
          fill="transparent"
          stroke={`url(#puzzleStrokeGradient)`}
          strokeWidth={strokeWidth}
        />
      </g>
      <g className="bottomRightPiece">
        
        
        {/* Add the bottom-right piece SVG path here */}
        <path
          d={`
          M 0 ${radius} A ${radius} ${radius} 0 0 0 ${radius} 0 L 0 0 Z
          `}
          fill="transparent"
          stroke={`url(#puzzleStrokeGradient)`}
          strokeWidth={strokeWidth}
        />
      </g>
      <g>


        {/* Add the top-right piece SVG path here */}
        <path
          d={`
          M 0 -${radius} A ${radius} ${radius} 0 0 1 ${radius} 0 L 0 0 Z
          `}
          fill="transparent"
          stroke={`url(#puzzleStrokeGradient)`}
          strokeWidth={strokeWidth}
        />
      </g>
      <g>


        {/* Add the bottom-left piece SVG path here */}
        <path
          d={`
          M 0 ${radius} A ${radius} ${radius} 0 0 1 -${radius} 0 L 0 0 Z
          `}
          fill="transparent"
          stroke={`url(#puzzleStrokeGradient)`}
          strokeWidth={strokeWidth}
        />
      </g>

      {/* Render the BouncingBall component within the puzzle */}
      <BouncingBall
        radius={radius / 4} // Adjust the radius as needed
        positions={positions} // Pass the positions of coiled areas
        colors={['grey', 'grey', 'grey']} // Define gradient colors for the ball
      />
    </svg>
  );
};

export default BouncingAndRotatingPuzzlePiece;
