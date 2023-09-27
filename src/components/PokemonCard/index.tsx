import React from 'react';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import * as S from './styles';
import { arenaSize } from '../../modules/main/Arena/styles';

type position = 'left' | 'right';

interface PokemonCardProps {
  url: string;
  health: number;
  isUser: boolean;
  name: string;
  rotate?: boolean;
  position: position;
  isFighting: boolean;
};

const PokemonCard: React.FC<PokemonCardProps> = ({
  url,
  health,
  isUser,
  name,
  rotate = false,
  position,
  isFighting
}) => {

  const navigationLength = (arenaSize - 100 - 60) / 2;
  const attackNavigationLength = navigationLength + 10;
  const defenseNavigationLength = navigationLength - 10;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: isFighting
            ? withRepeat(
                withSequence(
                  withSpring(position === 'right' ? -navigationLength : navigationLength, {
                    stiffness: 400,
                    duration: 1000,
                  }),
                  withSpring(position === 'right' ? -attackNavigationLength : defenseNavigationLength, {
                    stiffness: 500,
                    duration: 400,
                  }),
                  withSpring(position === 'right' ? -navigationLength : navigationLength, {
                    stiffness: 500,
                    duration: 400,
                  }),
                  withSpring(position === 'right' ? -defenseNavigationLength : attackNavigationLength, {
                    stiffness: 500,
                    duration: 400,
                  }),
                  withSpring(position === 'right' ? -navigationLength : navigationLength, {
                    stiffness: 500,
                    duration: 400,
                  }),
                  withSpring(0, {
                     stiffness: 400,
                     duration: 1000
                  })
                ),
                1
              )
            : 0,
        },
      ],
    };
  });

  const pokemonHealth = health > 0 ? health : 0;
  const playerIdentifier = isUser ? 'User' : 'Opponent';

  return (
    <S.Wrapper>
      {
        !isFighting && <S.Identifier isUser={isUser}>{playerIdentifier}</S.Identifier>
      }
      
      <Animated.View style={animatedStyle}>
        <S.Image 
          source={{ uri: url }}
          rotate={rotate}
        />
      </Animated.View>

      {
        !isFighting && <S.HealthBar>{name} ({pokemonHealth})</S.HealthBar>
      }
    </S.Wrapper>
  );
};

export default PokemonCard;