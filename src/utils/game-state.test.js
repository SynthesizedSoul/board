import { formatFrame } from "./game-state";

it("should place snakes on valid board", () => {
  const apiFrame = {
    Turn: 1,
    Food: [{ X: 5, Y: 2 }, { X: 1, Y: 8 }],
    Snakes: [
      {
        ID: "snake1",
        Name: "snake 1",
        URL: "http://snake1",
        Health: 80,
        Color: "red",
        Body: [{ X: 0, Y: 0 }, { X: 0, Y: 1 }, { X: 0, Y: 2 }]
      },
      {
        ID: "snake2",
        Name: "snake 2",
        URL: "http://snake2",
        Health: 70,
        Color: "green",
        Body: [{ X: 5, Y: 3 }, { X: 6, Y: 3 }, { X: 6, Y: 4 }, { X: 7, Y: 4 }]
      }
    ]
  };

  const frame = formatFrame(apiFrame);

  expect(frame.turn).toBe(1);
  expect(frame.snakes).toHaveLength(2);
  expect(frame.food).toHaveLength(2);

  expect(frame.food[0]).toEqual({ x: 5, y: 2 });
  expect(frame.food[1]).toEqual({ x: 1, y: 8 });

  expect(frame.snakes[0]).toEqual({
    _id: "snake1",
    name: "snake 1",
    health: 80,
    color: "red",
    body: [
      { x: 0, y: 0, direction: "up", type: "head", shouldRender: true },
      { x: 0, y: 1, direction: "up", type: "body", shouldRender: true },
      { x: 0, y: 2, direction: "up", type: "tail", shouldRender: true }
    ],
    isDead: false,
    head: undefined,
    tail: undefined,
    headSvg: undefined,
    tailSvg: undefined
  });

  expect(frame.snakes[1]).toEqual({
    _id: "snake2",
    name: "snake 2",
    health: 70,
    color: "green",
    body: [
      { x: 5, y: 3, direction: "left", type: "head", shouldRender: true },
      { x: 6, y: 3, direction: "left", type: "body", shouldRender: true },
      { x: 6, y: 4, direction: "up", type: "body", shouldRender: true },
      { x: 7, y: 4, direction: "left", type: "tail", shouldRender: true }
    ],
    isDead: false,
    head: undefined,
    tail: undefined,
    headSvg: undefined,
    tailSvg: undefined
  });
});

it("should recognize dead snakes", () => {
  const apiFrame = {
    Turn: 1,
    Food: [{ X: 5, Y: 2 }, { X: 1, Y: 8 }],
    Snakes: [
      {
        ID: "snake1",
        Name: "snake 1",
        URL: "http://snake1",
        Health: 80,
        Color: "red",
        Death: { Cause: "asdf", Turn: 3 },
        Body: [{ X: 1, Y: 1 }, { X: 0, Y: 1 }, { X: 0, Y: 0 }]
      }
    ]
  };

  const frame = formatFrame(apiFrame);

  expect(frame.turn).toBe(1);
  expect(frame.snakes).toHaveLength(1);
  expect(frame.food).toHaveLength(2);

  expect(frame.food[0]).toEqual({ x: 5, y: 2 });
  expect(frame.food[1]).toEqual({ x: 1, y: 8 });

  expect(frame.snakes[0]).toEqual({
    _id: "snake1",
    name: "snake 1",
    health: 80,
    color: "red",
    body: [
      { x: 1, y: 1, direction: "right", type: "head", shouldRender: true },
      { x: 0, y: 1, direction: "right", type: "body", shouldRender: true },
      { x: 0, y: 0, direction: "down", type: "tail", shouldRender: true }
    ],
    isDead: true,
    death: { cause: "asdf", turn: 3 },
    head: undefined,
    tail: undefined,
    headSvg: undefined,
    tailSvg: undefined
  });
});

it("should set undefined numbers to zero", () => {
  const apiFrame = {
    Food: [{}],
    Snakes: [
      {
        ID: "snake1",
        Name: "snake 1",
        URL: "http://snake1",
        Health: 80,
        Color: "red",
        Death: { Cause: "asdf" },
        Body: [{}]
      }
    ]
  };

  const frame = formatFrame(apiFrame);

  expect(frame.turn).toBe(0);
  expect(frame.snakes).toHaveLength(1);
  expect(frame.food).toHaveLength(1);

  expect(frame.food[0]).toEqual({ x: 0, y: 0 });

  expect(frame.snakes[0]).toEqual({
    _id: "snake1",
    name: "snake 1",
    health: 80,
    color: "red",
    body: [{ x: 0, y: 0, direction: "up", type: "head", shouldRender: true }],
    isDead: true,
    death: { cause: "asdf", turn: 0 },
    head: undefined,
    tail: undefined,
    headSvg: undefined,
    tailSvg: undefined
  });
});
