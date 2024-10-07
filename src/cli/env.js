// при использовании на macOS нужно запускать с использованием команды sudo 
// sudo npm run cli:env
// также установить cross-env если не установленно на устройстве
const parseEnv = () => {
    const envVariables = process.env;
    const rssVariables = [];
    for (const [key, value] of Object.entries(envVariables)) {
        if (key.startsWith('RSS_')) {
            rssVariables.push(`${key}=${value}`);
        }
    }
    console.log(rssVariables.join('; '), '\n');
};

parseEnv();