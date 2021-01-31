import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import path from 'path';
import { fileURLToPath } from 'url';
import config from './webpack.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const host = 'localhost';
const port = 3000;
const options = {
  contentBase: path.join(__dirname, 'dist'),
  hot: true,
  host,
};
WebpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new WebpackDevServer(compiler, options);

server.listen(port, host, () => {
  console.log(`dev server listening on port ${port}`);
});
