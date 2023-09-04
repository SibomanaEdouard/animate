import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';


// this is subcomponent
const BouncingBall = ({ radius, colors, positions }) => {
  const ballRef = useRef(null);

  useEffect(() => {
    const ball = ballRef.current;
    const animation = gsap.timeline({ repeat: -1, yoyo: true });

    animation.to(ball, {
      x: positions[1].x,
      y: positions[1].y,
      duration: 1,
    });

    animation.to(ball, {
      x: positions[0].x,
      y: positions[0].y,
      duration: 2,
    });

    animation.to(ball, {
      x: positions[3].x,
      y: positions[3].y,
      duration: 2,
    });

    animation.to(ball, {
      x: positions[2].x,
      y: positions[2].y,
      duration: 2,
    });

    return () => {
      animation.kill();
    };
  }, [positions]);

  return (
    <g transform={`translate(${positions[0].x}, ${positions[0].y})`}>
      <circle
        ref={ballRef}
        cx={0}
        cy={0}
        r={radius}
        fill='beige' // Use the first color from the array
        stroke={colors[0]} // Set the stroke color
        strokeWidth={12} // Set the stroke width as needed
      />
    </g>
  );
};


//this is the main component
const BouncingAndRotatingPuzzlePiece = ({
  width,
  height,
  strokeWidth,
  padding
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
      animation.kill();
    };
  }, [radius]);

  return (
   <svg
   xmlns="http://www.w3.org/2000/svg"
  width={width}
   height={height}
   padding={padding}
  viewBox={`-${width / 2 - padding} -${height / 2 - padding} ${width + 2 * padding} ${height + 2 * padding}`}
  className='container1'
 >  
      <defs>
        <linearGradient id="puzzleStrokeGradient" x1="0%" y1="0%">
          <stop offset="0%" style={{ stopColor: 'rgb(72, 131, 131)' }} />
          <stop offset="25%" style={{ stopColor: 'rgb(30, 76, 114)' }} />
          <stop offset="50%" style={{ stopColor: 'rgb(72, 131, 131)' }} />
          <stop offset="75%" style={{ stopColor: 'rgb(30, 76, 114)' }} />
        </linearGradient>
        <linearGradient id="ballGradient" x1="0%" y1="0%">
          <stop offset="25%" style={{ stopColor: 'beige' }} />
          <stop offset="50%" style={{ stopColor: 'beige' }} />
          <stop offset="75%" style={{ stopColor: 'beige' }} />
          <stop offset="100%" style={{ stopColor: 'beige' }} />
        </linearGradient>
      </defs>

      <g className="topLeftPiece">
        <path
          d={`
          M 0 -${radius} A ${radius} ${radius} 0 0 0 -${radius} 0 L 0 0 Z
          `}
          fill="transparent"
          stroke="rgb(72, 131, 131)"
          strokeWidth={strokeWidth}
        />
      </g>
      <g className="bottomRightPiece">
        <path
          d={`
          M 0 ${radius} A ${radius} ${radius} 0 0 0 ${radius} 0 L 0 0 Z
          `}
          fill="transparent"
       
          stroke="rgb(72, 131, 131)" // Set the stroke color here
          strokeWidth={strokeWidth}
        />
      </g>
      <g className="topRightPiece">
        <path
          d={`
          M 0 -${radius} A ${radius} ${radius} 0 0 1 ${radius} 0 L 0 0 Z
          `}
          fill="transparent"
          stroke="rgb(30, 76, 114)" 
          strokeWidth={strokeWidth}
        />
      </g>
      <g className="bottomLeftPiece">
        <path
          d={`
          M 0 ${radius} A ${radius} ${radius} 0 0 1 -${radius} 0 L 0 0 Z
          `}
          fill="transparent"
          stroke="rgb(30, 76, 114)" 
          strokeWidth={strokeWidth}
        />
      </g>

      <BouncingBall
        radius={radius / 8}
        positions={positions}
        colors={['grey', 'grey', 'grey']} // Define gradient colors for the ball
      />
    </svg>
  );
};

export default BouncingAndRotatingPuzzlePiece;
