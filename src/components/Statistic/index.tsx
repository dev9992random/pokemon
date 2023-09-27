import React from 'react';
import * as S from './styles';

interface StatisticProps {
  loses: number;
  wins: number;
  draws: number;
};

const Statistic: React.FC<StatisticProps> = ({
  loses,
  wins,
  draws
}) => {
  return (
    <S.Wrapper>
      <S.StatisticItem>Loses: {loses}</S.StatisticItem>
      <S.StatisticItem>Wins: {wins}</S.StatisticItem>  
      <S.StatisticItem>Draws: {draws}</S.StatisticItem>  
    </S.Wrapper>
  );
};

export default Statistic;