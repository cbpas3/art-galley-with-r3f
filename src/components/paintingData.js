const wallWidth = 10; // Assuming the wall width is 10 units
const paintingWidth = 0.8;
const paintingHeight = 0.6;
const paintingsPerWall = 4;
const wallOffset = 4.48; // Distance from center to wall

// Calculate spacing and starting position
const spacing =
  (wallWidth - paintingWidth * paintingsPerWall) / (paintingsPerWall + 1.5);
const startX = -wallWidth / 2 + spacing + paintingWidth / 2;

export const paintingData = [
  // BACK WALL
  {
    imgSrc: `memories/0.jpg`,
    width: 0.8,
    height: 0.6,
    position: {
      x: startX + (spacing + paintingWidth) * 3,
      y: 1.2,
      z: 4.48,
    },
    rotationY: Math.PI,
    info: {
      title: `With SME Execomm`,
      description: `You were always the one I could trust the most.`,
      year: `~2019`,
    },
  },
  {
    imgSrc: `memories/1.jpg`,
    width: 0.8,
    height: 0.6,
    position: {
      x: startX + (spacing + paintingWidth) * 2,
      y: 1.2,
      z: 4.48,
    },
    rotationY: Math.PI,
    info: {
      title: `Late night talks`,
      description: `Taken without my consent :P`,
      year: `~2020`,
    },
  },
  {
    imgSrc: `memories/2.jpg`,
    width: 0.8,
    height: 0.6,
    position: {
      x: startX + (spacing + paintingWidth) * 1,
      y: 1.2,
      z: 4.48,
    },
    rotationY: Math.PI,
    info: {
      title: `At Builtmore`,
      description: `I think this was the first time or one of the first times I went to builtmore.`,
      year: `~ Dec 2020`,
    },
  },
  {
    imgSrc: `memories/3.jpg`,
    width: 0.8,
    height: 0.6,
    position: {
      x: startX + (spacing + paintingWidth) * 0,
      y: 1.2,
      z: 4.48,
    },
    rotationY: Math.PI,
    info: {
      title: `First Valentine's Day`,
      description: `Flowers and Panda with a sablay.`,
      year: `Feb 13 2021`,
    },
  },
  // Back Wall
  {
    imgSrc: `memories/4.jpg`,
    width: 0.8,
    height: 0.6,
    position: {
      x: -4.48,
      y: 1.2,
      z: startX + (spacing + paintingWidth) * 3,
    },
    rotationY: Math.PI / 2,
    info: {
      title: `Our first road trip`,
      description: `We went to Tagaytay for a massage and food?`,
      year: `Nov 27 2021`,
    },
  },
  {
    imgSrc: `memories/5.jpg`,
    width: 0.8,
    height: 0.6,
    position: {
      x: -4.48,
      y: 1.2,
      z: startX + (spacing + paintingWidth) * 2,
    },
    rotationY: Math.PI / 2,
    info: {
      title: `Our first anniversary`,
      description: `We went to a fancy restaurant in Makati`,
      year: `Dec 1 2021`,
    },
  },
  {
    imgSrc: `memories/6.jpg`,
    width: 0.8,
    height: 0.6,
    position: {
      x: -4.48,
      y: 1.2,
      z: startX + (spacing + paintingWidth) * 1,
    },
    rotationY: Math.PI / 2,
    info: {
      title: `Our first and only hike`,
      description: `We spent 9k on equipment that we never used again lol.`,
      year: `June 18 2022`,
    },
  },
  {
    imgSrc: `memories/7.jpg`,
    width: 0.8,
    height: 0.6,
    position: {
      x: -4.48,
      y: 1.2,
      z: startX + (spacing + paintingWidth) * 0,
    },
    rotationY: Math.PI / 2,
    info: {
      title: `Our second anniversary`,
      description: `Expensive restaurant in Mandaluyong. I liked the steak.`,
      year: `Dec 10 2022`,
    },
  },
  // Left Wall
  {
    imgSrc: `memories/8.jpg`,
    width: 0.8,
    height: 0.6,
    position: {
      x: startX + (spacing + paintingWidth) * 0,
      y: 1.2,
      z: -4.48,
    }, // Moved much closer
    rotationY: 0,
    info: {
      title: `Our first trip abroad`,
      description: `7 days in Japan.`,
      year: `May 14 2023`,
    },
  },
  {
    imgSrc: `memories/9.jpg`,
    width: 0.8,
    height: 0.6,
    position: {
      x: startX + (spacing + paintingWidth) * 1,
      y: 1.2,
      z: -4.48,
    }, // Moved much closer
    rotationY: 0,
    info: {
      title: `Our second trip abroad`,
      description: `It meant a lot to me that it was with my family.`,
      year: `July 1 2023`,
    },
  },
  {
    imgSrc: `memories/10.jpg`,
    width: 0.8,
    height: 0.6,
    position: {
      x: startX + (spacing + paintingWidth) * 2,
      y: 1.2,
      z: -4.48,
    }, // Moved much closer
    rotationY: 0,
    info: {
      title: `Our first big purchase together`,
      description: `After months of trying to pick out a car.`,
      year: `Sept 11 2023`,
    },
  },
  {
    imgSrc: `memories/11.jpg`,
    width: 0.8,
    height: 0.6,
    position: {
      x: startX + (spacing + paintingWidth) * 3,
      y: 1.2,
      z: -4.48,
    }, // Moved much closer
    rotationY: 0,
    info: {
      title: `1 Month in Japan`,
      description: `1 big trip before you had to go to the office.`,
      year: `Nov 23 2023`,
    },
  },
  {
    imgSrc: `memories/12.jpg`,
    width: 0.8,
    height: 0.6,
    position: {
      x: 4.48,
      y: 1.2,
      z: startX + (spacing + paintingWidth) * 0,
    },
    rotationY: -Math.PI / 2,
    info: {
      title: `Third anniversary`,
      description: `At Odaiba with Rainbow Bridge in the background.`,
      year: `Dec 1 2023`,
    },
  },
  {
    imgSrc: `memories/13.jpg`,
    width: 0.8,
    height: 0.6,
    position: {
      x: 4.48,
      y: 1.2,
      z: startX + (spacing + paintingWidth) * 1,
    },
    rotationY: -Math.PI / 2,
    info: {
      title: `First trip abroad with your family`,
      description: `In Taiwan.`,
      year: `Aug 6 2024`,
    },
  },
  {
    imgSrc: `memories/14.jpg`,
    width: 0.8,
    height: 0.6,
    position: {
      x: 4.48,
      y: 1.2,
      z: startX + (spacing + paintingWidth) * 2,
    },
    rotationY: -Math.PI / 2,
    info: {
      title: `Fourth anniversary`,
      description: `In London at a Japanese-Peruvian fusion restaurant.`,
      year: `Dec 1 2024`,
    },
  },
  {
    imgSrc: `memories/15.jpg`,
    width: 0.8,
    height: 0.6,
    position: {
      x: 4.48,
      y: 1.2,
      z: startX + (spacing + paintingWidth) * 3,
    },
    rotationY: -Math.PI / 2,
    info: {
      title: `?`,
      description: `?`,
      year: `?`,
    },
  },
];
