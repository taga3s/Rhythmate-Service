const calcLevelByExp = (exp: number) => {
  let level = 1;
  const ToNextLevel = 100;

  let remainingExp = exp;

  while (remainingExp >= ToNextLevel * level) {
    remainingExp -= ToNextLevel * level;
    level++;
  }

  return level;
};

const getUpdatedLevelAndExp = (currentExp: number, expIncrement: number) => {
  const updatedExp = currentExp + expIncrement;
  const updatedLevel = calcLevelByExp(updatedExp);
  return { updatedLevel, updatedExp };
};

export { getUpdatedLevelAndExp };
