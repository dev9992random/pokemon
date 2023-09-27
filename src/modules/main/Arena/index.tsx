import React, { useEffect, useState } from 'react';
import CustomAlert from '../../../components/CustomAlert';
import PokemonCard from '../../../components/PokemonCard';
import { fetchPokemon } from '../../../api/pokemons';
import Statistic from '../../../components/Statistic';
import * as S from './styles';
import { ActivityIndicator } from 'react-native';

interface PlayerInterface {
  name: string;
  health: number;
  url: string;
};

interface AlertDataInterface {
  visible: boolean;
  title: string;
  win: boolean | null | undefined;
};

interface StatisticInterface {
  loses: number;
  wins: number;
  draws: number;
};

// animation duration, change to 0 to save time
const fightDuration = 1000 + 400 + 400 + 400 + 1000; // 0;

const rollTheDice = (min = 1, max = 6) => {
  let number = Math.floor(Math.random() * (max - min + 1) + min);
  if (number == 6) number += rollTheDice();
  return number;
};

const Arena: React.FC = () => {
  const [user, setUser] = useState<PlayerInterface>({
    name: '',
    health: 100,
    url: ''
  });
  const [enemy, setEnemy] = useState<PlayerInterface>({
    name: '',
    health: 100,
    url: ''
  });

  const [alertData, setAlertData] = useState<AlertDataInterface>({
    visible: false,
    title: '',
    win: null
  });

  const [statistic, setStatistic] = useState<StatisticInterface>({
    loses: 0,
    wins: 0,
    draws: 0
  });

  const [fight, setFight] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPokemons = async (fetchUser: boolean = true) => {
    setLoading(true);
    fetchUser && await fetchUserPokemon();
    await fetchEnemyPokemon();
    setLoading(false);
  };

  const fetchUserPokemon = async () => {
    const result = await fetchPokemon();
    if (result.success) {
      setUser({
        health: 100,
        name: result.name.charAt(0).toUpperCase() + result.name.slice(1),
        url: result.url,
      });
    };
  };

  const fetchEnemyPokemon = async () => {
    const result = await fetchPokemon();
    if (result.success) {
      setEnemy({
        health: 100,
        name: result.name.charAt(0).toUpperCase() + result.name.slice(1),
        url: result.url,
      });
    };
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const checkOnAlert = () => {
    if (user.health < 1 && enemy.health < 1) setAlertData({ visible: true, title: 'Draw!', win: null })
    else if (enemy.health < 1) setAlertData({ visible: true, title: 'You Won!', win: true })
    else if (user.health < 1) setAlertData({ visible: true, title: 'Game Over!', win: false })
  };

  useEffect(() => {
    !fight && checkOnAlert();
  }, [fight]);

  const toFight = () => {
    setFight(true);

    const userDamage = rollTheDice();
    const enemyDamage = rollTheDice();

    setTimeout(() => {
      setUser(prev => ({...prev, health: prev.health - enemyDamage}));
      setEnemy(prev => ({...prev, health: prev.health - userDamage}));
      setFight(false);
    }, fightDuration);
  };

  const getHealthColor = (health: number) => {
    if (health > 75) return 'green'
    else if (health > 25) return '#9B870C'
    return 'red';
  };

  const keepThePokemon = () => {
    setUser(prev => ({...prev, health: 100}));
    const newStatistic = {...statistic};
    switch(alertData.win) {
      case true:
        newStatistic.wins++;
        break;
      case false:
        newStatistic.loses++;
        break;
      default:
        newStatistic.draws++;
        break;
    };
    setStatistic(newStatistic);
    setTimeout(() => {
      fetchPokemons(false);
      setAlertData({
        visible: false,
        title: '',
        win: undefined
      });
    }, 0);
  };

  const changeThePokemon = () => {
    fetchPokemons();
    setStatistic({
      loses: 0,
      wins: 0,
      draws: 0
    });
    setAlertData({
      visible: false,
      title: '',
      win: undefined
    });
  };

  const renderStatistic = () => {
    if (statistic.loses || statistic.wins || statistic.draws) return (
      <Statistic 
        loses={statistic.loses}
        wins={statistic.wins}
        draws={statistic.draws}
      />  
    );
  };

  const attackDisabled = user.health < 1 || enemy.health < 1 || fight;

  return (
    <S.Wrapper>
      <S.Title>Pokemon Battle: Revolution</S.Title>

      <S.ImageBackground 
        source={require('../../../assets/images/battleArena.jpg.webp')}
      >
        <PokemonCard 
          url={user.url}
          health={user.health}
          name={user.name}
          rotate
          isUser={true}
          isFighting={fight}
          position={'left'}
        />
        <PokemonCard 
          url={enemy.url}
          health={enemy.health}
          name={enemy.name}
          isUser={false}
          isFighting={fight}
          position={'right'}
        />
        { loading && (
          <>
            <S.LoaderBackground />
            <S.LoaderWrapper>
              <ActivityIndicator color={"white"} size="large" />
            </S.LoaderWrapper>
          </>
        ) }
      </S.ImageBackground>

      <S.StatusBarWrapper>
        <S.HealthBarWrapper>
          <S.HealthBarTitle>User health:</S.HealthBarTitle>
          <S.ProgressBar progress={user.health / 100} width={100} height={14} color={getHealthColor(user.health)} />
        </S.HealthBarWrapper>
        <S.HealthBarWrapper>
          <S.HealthBarTitle>Enemy health:</S.HealthBarTitle>
          <S.ProgressBar progress={enemy.health / 100} width={100} height={14} color={getHealthColor(enemy.health)} />
        </S.HealthBarWrapper>
      </S.StatusBarWrapper>

      <S.ArrackButtonWrapper>
        <S.AttackButton onPress={toFight} disabled={attackDisabled}>
          <S.Attack>Attack</S.Attack>
        </S.AttackButton>
      </S.ArrackButtonWrapper>

      {renderStatistic()}

      <CustomAlert 
        title={alertData.title}
        description={'Would you like to continue playing using the same pokemon?'}
        yesTitle={'Keep Pokemon'}
        noTitle={'Change Pokemon'}
        yesOnPress={keepThePokemon}
        noOnPress={changeThePokemon}
        visible={alertData.visible}
      />
    </S.Wrapper>
  );
};

export default Arena;