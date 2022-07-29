import { sitemapBuilder as buildSitemap } from 'react-router-sitemap';
import routes from './routes';
import path from 'path';
import fs from 'fs';

const hostname = 'http://localhost:3000';

const dest = path.resolve('./public', 'sitemap.xml');

const sitemap = buildSitemap(hostname, routes);

fs.writeFileSync(dest, sitemap.toString());