import { readFileSync } from 'node:fs';

const parseEnv = (env) => {
  const lines = env.split('\n');
  lines.forEach((line) => {
    const [key, ...value] = line.split('=');
    const joinedValue = value.join('=');
    const hasQuotes = joinedValue.startsWith('"') && joinedValue.endsWith('"');
    const valueToStore = hasQuotes ? joinedValue.slice(1, -1) : joinedValue;
    process.env[key] = valueToStore;
  });
};

export const config = ({ path = '.env' } = {}) => {
  try {
    const env = readFileSync(path, 'utf8');
    parseEnv(env);
  } catch (error) {
    console.error(error);
  }
};

const dotenv = {
  config,
};

export default dotenv;
