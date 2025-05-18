FROM golang:1.24
WORKDIR /app

COPY . ./

EXPOSE 8080

CMD go run ./main.go