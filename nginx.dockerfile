FROM nginx:stable-alpine

# Set up nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d

# Build the frontend
WORKDIR /app
COPY frontend/package*.json ./
RUN apk add --no-cache nodejs npm && npm install
COPY frontend .
COPY frontend.env ./.env
RUN npm run build

# Copy frontend build
RUN cp -r dist/* /usr/share/nginx/html
