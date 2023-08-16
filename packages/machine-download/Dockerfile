FROM golang:1.20-bookworm as builder
ARG IPGET_VERSION=0.9.2
RUN go install github.com/ipfs/ipget@v${IPGET_VERSION}

FROM debian:bookworm-20230814-slim
COPY --from=builder /go/bin/ipget /usr/local/bin/
