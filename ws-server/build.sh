swc src -d dist/dist --source-maps --copy-files
# cp ./ecosystem.config.js ./dist
cp ./.env.production.local ./dist
cp ./package.json ./dist