import React from "react";
import styled from "react-emotion";
import Avatar from "./avatar";
import { breakpoints, colors, themes } from "../theme";

const orderSnakes = snakes => {
  // Sort by name
  const aliveSnakes = snakes
    .filter(s => !s.isDead)
    .sort((a, b) => {
      const aLower = a.name.toLowerCase();
      const bLower = b.name.toLowerCase();
      if (aLower < bLower) {
        return -1;
      }
      if (aLower > bLower) {
        return 1;
      }
      return 0;
    });

  // Sort by turn died, descending
  const deadSnakes = snakes
    .filter(s => s.isDead)
    .sort((a, b) => a.death.turn - b.death.turn)
    .reverse();

  return aliveSnakes.concat(deadSnakes);
};

const Wrapper = styled("div")`
  display: none;
  padding-right: 2rem;
  color: ${({ theme }) =>
    theme === themes.dark ? colors.lightText : colors.darkText};
  font-weight: 700;
  font-size: 2.2rem;

  @media (min-width: ${breakpoints.md}) {
    display: ${({ hide }) => (hide ? "none" : "block")};
  }
`;

const AvatarWrapper = styled("div")`
  transition: background-color 0.2s, box-shadow 0.2s;
  box-shadow: ${props =>
    props.highlighted ? `0 0 0 1px ${colors.lightText}` : null};

  &:hover {
    background-color: ${props =>
      props.theme === themes.dark ? colors.purple : colors.light};
    cursor: pointer;
  }
`;

class Scoreboard extends React.Component {
  state = {
    highlightedSnake: null
  };

  toggleHighlight = snake => {
    const getSnakeToHighlight = (state, snake) => {
      return state.highlightedSnake !== snake._id ? snake._id : null;
    };

    this.props.highlightSnake(getSnakeToHighlight(this.state, snake));

    this.setState(state => ({
      highlightedSnake: getSnakeToHighlight(state, snake)
    }));
  };

  render() {
    const { highlightedSnake } = this.state;
    return (
      <Wrapper theme={this.props.theme}>
        {this.props.snakes
          ? orderSnakes(this.props.snakes).map((snake, i) => (
              <AvatarWrapper
                key={"avatarwrapper" + i}
                onClick={() => this.toggleHighlight(snake)}
                highlighted={highlightedSnake === snake._id}
                theme={this.props.theme}
              >
                <Avatar
                  snake={snake}
                  key={"avatar" + i}
                  theme={this.props.theme}
                />
              </AvatarWrapper>
            ))
          : undefined}
      </Wrapper>
    );
  }
}

export default Scoreboard;
